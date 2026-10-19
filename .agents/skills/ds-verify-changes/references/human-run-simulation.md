# Human-run simulation

Use this when an acceptance criterion names behaviour that only shows when a command runs that a
guard blocks for agents: the release tooling, anything that tags, pushes or publishes, a hook
bypass. A CI step or hook that no guard blocks is agent-run in a throwaway clone instead (SKILL.md
step 6), with the same safety helpers. Unit tests prove the code; the simulation proves the chain
around it (exit codes through `yarn` and `bash -e`, the real hooks, the literal step). The agent
writes and statically checks the script; **the human runs it**.

## Rules

- **The agent never runs the script**, in whole or in part, and never runs its guarded commands
  "just to check". Guarded strings (release commands, remote writes) live only in the script file,
  never in a Bash command.
- Everything happens in a **throwaway clone** outside the real repo. The only write to the real
  checkout is the log under `.local/agent-harness/work/<N>/`.
- **Remote writes are replaced by `echo "WOULD RUN: …"`**, and the clone's push URL is a string that
  cannot resolve. The step body is otherwise **literal**: the same commands CI runs, under `bash -e`.
- The script exits non-zero if the real repo changed during the run.

## Structure

| Part | What it does |
|---|---|
| Header | What it simulates and which AC it evidences; `HUMAN-RUN ONLY`; usage from the repo root and from the Claude prompt (`! bash …`); env knobs `SIM_ROOT`, `KEEP_SIM`; exit codes; macOS `/bin/bash` 3.2 compatible (no associative arrays, `mapfile` or `${x,,}`) |
| Constants | `STEP_BODY`: the literal step, remote writes as echoes. The SHAs or branches under test. |
| Safety helpers | `sim_path_is_safe`, `assert_in_clone` (before every destructive command), `real_snapshot` (HEAD, tag count, `core.hooksPath`, status) |
| Preflight | Clears `HUSKY`, `GIT_DIR`, `GIT_WORK_TREE`, `GIT_INDEX_FILE`, author and committer variables; sets `GIT_TERMINAL_PROMPT=0`, `GIT_EDITOR=true`, `CI=true`; checks tools; **dies if `STEP_BODY` contains an executable remote write**; resolves SHAs; takes the real snapshot |
| Clone | `git clone --no-hardlinks`; push URL disabled; the real `origin/main` fetched in; origin's fetch URL pointed at the clone itself (deterministic fetches that never touch the real checkout); clone-local identity; commit and tag signing off |
| Install | Exactly as CI (`yarn --frozen-lockfile`), then **assert `core.hooksPath` is set**, so the real hooks run |
| Scenarios | One per expectation, each on a temp branch at an exact SHA: (1) the bug reproduced on `main`, (2) the fix with the failure injected, (3) the fix on the happy path. Scenarios that can create tags run last. Reset with `git clean -fd` **without `-x`** (keeps `node_modules` and `.husky/_`). |
| Classification | Per scenario `PASS`, `FAIL` (each unmet expectation listed) or `INVALID` (setup failed, a precondition not met, or the step failed before the code under test ran). INVALID is an environment finding, never a code verdict. |
| Summary | One row per scenario; `real repo unchanged: yes`; `OVERALL: PASS` only on the exit-0 path |
| Log | `main "$@" 2>&1 \| tee "$LOG"; exit "${PIPESTATUS[0]}"`, with `$LOG` under `.local/agent-harness/work/<N>/` |

## Skeleton (the safety parts; fill in the case-specific parts)

```bash
#!/usr/bin/env bash
# <What this simulates: the literal step and the AC it evidences.>
# HUMAN-RUN ONLY. From the repo root:  bash .local/agent-harness/work/<N>/simulate-<slug>.sh
#   or from the Claude Code prompt:    ! bash .local/agent-harness/work/<N>/simulate-<slug>.sh
# Env: SIM_ROOT (parent of the throwaway clone), KEEP_SIM=1 (keep the clone and outputs)
# Exit: 0 all scenarios PASS and the real repo unchanged; 1 otherwise; 2 setup abort.
set -uo pipefail

N=<N>
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd -P) || exit 2
REAL_REPO=$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel) || exit 2
REAL_REPO=$(cd "$REAL_REPO" && pwd -P) || exit 2
LOG="$REAL_REPO/.local/agent-harness/work/$N/simulation.log"
SIM_ROOT="${SIM_ROOT:-${TMPDIR:-/tmp}}"
KEEP_SIM="${KEEP_SIM:-0}"
PUSH_DISABLED="DISABLED-sim-$N"
SIM=""
ALL_PASS=1

# The literal step; every remote write replaced by an echo.
STEP_BODY='<the step body, verbatim>
echo "WOULD RUN: <each remote write>"'

say() { printf '%s\n' "$*"; }
die() { printf '\nABORT: %s\n' "$*"; exit 2; }
lower() { printf '%s' "$1" | tr '[:upper:]' '[:lower:]'; }

real_snapshot() {
  printf 'HEAD=%s tags=%s hooksPath=%s status=[%s]' \
    "$(git -C "$REAL_REPO" rev-parse HEAD 2>/dev/null)" \
    "$(git -C "$REAL_REPO" for-each-ref refs/tags | wc -l | tr -d ' ')" \
    "$(git -C "$REAL_REPO" config --local --get core.hooksPath 2>/dev/null)" \
    "$(git -C "$REAL_REPO" --no-optional-locks status --porcelain 2>/dev/null | tr '\n' ';')"
}

# $SIM may be deleted only if it ends in /sim-$N and neither is, contains nor is inside the real repo.
sim_path_is_safe() {
  local s r
  [ -n "$SIM" ] || return 1
  case "$SIM" in */sim-"$N") ;; *) return 1 ;; esac
  if [ -e "$SIM" ] && [ "$SIM" -ef "$REAL_REPO" ]; then return 1; fi
  s=$(lower "$SIM"); r=$(lower "$REAL_REPO")
  case "$s/" in "$r/"*) return 1 ;; esac
  case "$r/" in "$s/"*) return 1 ;; esac
  return 0
}

# Call before every reset, clean, file removal, fixture and step run.
assert_in_clone() {
  local top
  top=$(git rev-parse --show-toplevel 2>/dev/null) || die "not inside a git work tree"
  [ "$top" -ef "$SIM" ] || die "toplevel '$top' is not the clone '$SIM'"
  if [ "$top" -ef "$REAL_REPO" ]; then die "toplevel is the REAL repo"; fi
  [ "$(git config --get remote.origin.pushurl)" = "$PUSH_DISABLED" ] || die "push URL is not $PUSH_DISABLED"
}

preflight() {
  unset HUSKY GIT_DIR GIT_WORK_TREE GIT_INDEX_FILE GIT_OBJECT_DIRECTORY GIT_COMMON_DIR \
    GIT_AUTHOR_NAME GIT_AUTHOR_EMAIL GIT_COMMITTER_NAME GIT_COMMITTER_EMAIL BASH_ENV ENV
  export GIT_TERMINAL_PROMPT=0 GIT_EDITOR=true CI=true
  if printf '%s\n' "$STEP_BODY" | grep -Eq '^[[:space:]]*(git[[:space:]]+(push|tag)|npm[[:space:]]+publish|gh[[:space:]])'; then
    die "STEP_BODY contains an executable remote write"
  fi
  mkdir -p "$SIM_ROOT" || die "cannot create $SIM_ROOT"
  SIM="$(cd "$SIM_ROOT" && pwd -P)/sim-$N"
  sim_path_is_safe || die "unsafe clone path '$SIM'"
  REAL_BEFORE=$(real_snapshot)
}

make_clone() {
  if [ -e "$SIM" ]; then sim_path_is_safe && rm -rf "$SIM" || die "cannot remove $SIM"; fi
  git clone --quiet --no-hardlinks "$REAL_REPO" "$SIM" || die "git clone failed"
  cd "$SIM" || die "cannot cd to $SIM"
  git remote set-url --push origin "$PUSH_DISABLED" || die "cannot disable pushing"
  assert_in_clone
  # <fetch the real origin/main in, point origin's fetch URL at "$SIM", set the clone-local identity,
  #  commit.gpgsign=false and tag.gpgsign=false, then assert_in_clone again>
}

install_deps() {
  assert_in_clone
  yarn --frozen-lockfile || die "install failed"
  [ -n "$(git config --local --get core.hooksPath)" ] || die "core.hooksPath not set: the hooks would not run"
}

# run_scenario <id> <sha> <fixture>: temp branch at <sha>, build as CI, fixture, precondition
# (unmet -> INVALID), then:  bash -e -c "$STEP_BODY"  capturing exit code and output; each
# expectation printed as [met] / [NOT MET]; append a summary row; any FAIL/INVALID sets ALL_PASS=0.

main() {
  trap '[ "$KEEP_SIM" = 1 ] || { sim_path_is_safe && rm -rf "$SIM"; }' EXIT
  preflight
  make_clone
  install_deps
  # run_scenario ...   (the scenarios that can create tags last)
  if [ "$(real_snapshot)" != "$REAL_BEFORE" ]; then say "WARNING: the real repo changed"; ALL_PASS=0; fi
  [ "$ALL_PASS" -eq 1 ] && { say "OVERALL: PASS"; exit 0; }
  say "OVERALL: NOT PASS"; exit 1
}

mkdir -p "$(dirname "$LOG")" || exit 2
main "$@" 2>&1 | tee "$LOG"
exit "${PIPESTATUS[0]}"
```

## Static checks (the agent runs these, never the script)

| Check | Command | Expected |
|---|---|---|
| Syntax | `/bin/bash -n <script>` | exit 0 |
| Lint | `shellcheck <script>` | clean, or `N/A: not installed` |
| No executable remote write | a `grep -nE` for lines that *start* with the write command; build the pattern with a bracket (`pu[s]h`), so the Bash command itself holds no guarded string | no match outside `STEP_BODY` echoes and counters |
| Bash 3.2 | `grep -nE 'declare -A\|mapfile\|readarray\|\$\{[a-z_]+(,,\|\^\^)\}\|coproc'` | no match |
| JSON edits | no `sed -i` on JSON; edit JSON with `node` so a round trip is byte-identical | — |

## Reporting in `validation-report.md`

- Before the run: a **Human-run simulation** section with the command, the expected result per
  scenario, the fidelity notes (what matches CI, and each deliberate difference), the safety
  properties and the static checks. The behaviour's status is `HUMAN-RUN-PENDING`.
- After the human runs it: read the log (never re-run the script), quote the summary with line
  numbers, and set the status to `PASS (human-run <ISO time from the log>)`, or
  `FAIL (human-run …)` / `INVALID (human-run …)` with the rows. Then check read-only that the real
  repo is unchanged (HEAD, tag count, temp branches, status) and record it.
- A `FAIL` on a fix scenario goes back to `ds-implement-plan`. An `INVALID` goes back to the script.
