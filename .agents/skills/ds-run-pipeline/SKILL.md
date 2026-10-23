---
name: ds-run-pipeline
description: 'Use to run the DT-DDS pipeline for a status:ready issue: drive run.mts and relay each gate to the human verbatim. Also for human actions between gates and the close-out after the merge.'
argument-hint: '<ISSUE-NUMBER> [close]'
---

# Run pipeline

A script runs the pipeline, not a model: `node agent-harness/scripts/run.mts <N>` picks the lane (criteria
in `lane.mts`, caps in `agent-harness/config/stages.json`), runs each stage as its own `claude -p` session
(recorded by `run-stage.mts`), and stops at every gate for the human. AGENTS.md → Trial mode governs:
nothing is written to GitHub.

## Start a run

This session drives the run and **relays** every gate: the human decides, and the session passes
the human's reply to run.mts exactly as given; it never answers a gate itself. (The human can also
run `node agent-harness/scripts/run.mts <N>` in a terminal and answer the gates there.)

1. `node agent-harness/scripts/run.mts <N> --dry`: the lane with its reasons, the steps, the caps. No
   model, no writes. An `escalate` lane stops here: a maintainer decides.
2. The human claims the issue if it is still `status:ready` (run.mts prints the `gh issue edit`
   command and refuses until it is claimed) and starts from a clean checkout: an untracked file
   that appears during a stage stops the run as a red flag, and one left over fails the clean-tree
   check.
3. Ask the human to start and with which flags:
   - `--lane N`: override the classifier, without its model call.
   - `--budget-usd <usd>`: hard token-dollar cap.
   - `--tool-calls <n>`: raise every later session's tool-call cap to n (recorded).
   - `--record-out <path>`: a JSON summary of the run.
   - `--issue-file <path>`: a synthetic issue (fixtures in `agent-harness/tests/fixtures/`), copied to
     `issue.json`; skips the GitHub preflight.
   - `--fresh`: a new run of an issue whose work dir holds an earlier one; the old dir moves to
     `.local/agent-harness/work/<N>.<UTC>`.

   A Lane 0 `G1+G3` answered after the prompt-cache TTL (set in `.claude/pipeline.settings.json`)
   rewrites the plan session's cache when apply resumes it. Every relay request re-reads this
   session's whole context: when it already holds other work, suggest driving from a fresh
   `claude --settings .claude/pipeline.settings.json` session instead.
4. Start `node agent-harness/scripts/run.mts <N> --no-wait <flags>` with Bash `run_in_background` (a step
   can run longer than the 10-minute foreground limit; a `… <step> running` heartbeat line every
   minute shows time, tool calls and spend so far) and wait for its exit notification. Exit 0
   with the last line `Pending at <gate>`: relay that gate (step 5). Exit 0 otherwise: the run
   ended (`G7 approved`, a stop, an escalate). Exit 1: show the human the stop message; they choose
   the next step, and a resume is `--no-wait` again.
5. **Relay a gate:** show the gate block (the output from its last `── <gate>` line, as printed)
   with AskUserQuestion. Options `approve` and `stop` (the label is the reply); every other reply
   (`revise: …`, `loop: …`, `lane:N`, consent) comes through Other. Pass the answer on in the
   background:

   ```bash
   node agent-harness/scripts/run.mts <N> --decide "$(cat <<'REPLY'
   <the human's answer, character for character>
   REPLY
   )"
   ```

   The reply is the human's own text, whole: every word, line break and typo. When the human asks
   about the artifact instead, answer from the files, then relay the gate again. Exit 2
   `reply refused`: show the reason and the reply as received, and relay the gate again (nothing
   was recorded; the gate stays pending). After `--decide`, continue at step 4's exit handling.

## Close a run

`/ds-run-pipeline <N> close`, after the merge: ask the human to confirm that the post-merge checks
are done and the follow-ups filed or skipped (Retention), then run
`node agent-harness/scripts/run.mts <N> --close` and show its output. `<N>` is the issue number the run
started with.

## What run.mts enforces

- **Start:** one run per checkout (a run file whose `pid` is gone is stale and removed). Preflight
  refuses unless `CLAUDE_CODE_SUBAGENT_MODEL` is unset, `node agent-harness/hooks/check-hooks.mts` passes,
  and the issue is open and claimed. The environment health checks (lockfile, clean tree, frozen
  install, `check-pkg-deps`) run just before the first step that writes the branch, not at intake.
  Every session runs in `dontAsk` with a per-step allowlist; the gate lists any permission denials.
- **Gates:** the stage writes `gate-summary.md` (≤ 10 lines), which run.mts shows and snapshots with
  the artifact; a decided gate gets a Gate decisions row, echoed as `recorded at <gate>: …`. An
  approval with text (answers to a stage's question, consent) is written to `intake-decisions.md`,
  where the next stages read it. A `revise:`/`loop:` instruction stays in `run-state.json` until its
  step completes, so an interrupt or a failed health check keeps it.
- **Replies:** `approve` · `revise: <instruction>` (re-runs the step with the instruction verbatim) ·
  `loop: <instruction>` (G4–G7, a code or scope change: recorded in `intake-decisions.md`, back to
  implement) · `lane:<0|1|2|escalate>` (a scope decision, recorded) · `stop` (resume later: approved
  steps are skipped and the stopped gate is shown again, its step not re-run). Anything else,
  silence or end of input is never an approval. Only a `PASS` status can be approved: `PARTIAL: …`,
  `BLOCKER: …` and `FAIL — …` are answered with `revise:`, `loop:`, `lane:N` or `stop`; a stage's
  question is in its `gate-summary.md`. Ask-first paths need `approve; consent: <path> (<name>,
  maintainer)` per path at the first gate (`G1`, or Lane 0's `G1+G3`). A finished run (handed off
  or escalated) is not rerun: start a new one with `--fresh`.
- **Red flags (stop):** a work-dir stage changed a tracked file or HEAD; the verify stage (`fixups`
  mode) added a commit that is not `fixup!`/`amend!`, or changed a tracked file; a commit landed on
  `main`; a remote branch appeared. **Loops are bounded:** 3 loops at G5 or 2 at G6 stop the run as a
  suspected unsound approach.
- **Budget:** the lane's token-dollar cap and `--budget-usd` stop the run before the next step, and
  every session gets `--max-budget-usd` = what is left of the smaller cap. A step with no JSON
  result has unknown spend: the run stops at that gate without a decision, and a resume shows it
  again (`revise:` re-runs the step). **Tool calls:** `budget-guard` caps each session's tool calls
  at its step's `maxToolCalls` (`stages.json`), so a loop or a re-run gets its own allowance; the
  human raises it with `--tool-calls <n>`, never in `lane.json`.
- **Interrupts:** Ctrl-C or SIGTERM during a step lets the session print its result first, and its
  usage, session id and transcript are recorded. At a gate it writes an `interrupted` row and the
  gate stays pending. Either way the run file goes and the exit is 130.
- **Cleanup:** the gate lists untracked files the run created; branch and verify steps delete their
  own with `clean-run.mts`.
- **Mid-stage messages:** text typed while a stage runs is recorded in the gate note, never relayed
  and never taken as the decision.

## What stays human

- **`grill` at G1:** reply `stop`, run the `grilling` skill in an interactive session over
  `context-bundle.md`, write the settled decisions to `.local/agent-harness/work/<N>/intake-decisions.md`, then
  rerun run.mts and answer the G1 shown again with `revise: read intake-decisions.md`: stage 1 runs
  again and reads those decisions.
- **Human checklists** (Storybook, human-run simulations): answer item by item and record each
  result in the validation report before `approve` at G5.
- Floating tool versions in a validation report: re-resolve them (`npm view <pkg> version`) before
  approving G5; flag drift.

## Human actions between gates

Every change to the branch or the environment made outside a stage's own commits (a human commit,
autosquash, rebase, reset or install, or a stage that rewrote history against its rules) and every
human-run check gets a row in the run log's Human actions table, written before the next gate reply.
Name the SHAs that changed and the evidence the range-diff leaves valid in that reply (`revise:` or
`loop:`), so the next brief carries them; every stage also reads the run log.

**Autosquash.** run.mts folds the run's own `fixup!`/`amend!` commits itself when everything
passed: after G6 is approved, before the PR draft (Lane 0: after apply, before G7). `autosquash.mts`
refuses, changing nothing, when a PR or a remote branch exists, a fixup targets a commit from before
the run, or the tree is dirty; it aborts on a conflict and keeps the old history when the tree would
change. A fold writes its own Human actions row. When it refused, or `origin/main` moved, the
autosquash window applies: reply `stop` at G5 (run.mts starts verify right after a G4 approval, so
G5 is the first window), do the steps below, write the Human actions row (the human writes these
rows by hand), then resume and answer G5 with `revise:` so verify runs on the new history:

1. Note what to expect: today's `git rev-parse HEAD^{tree}` (on an unchanged base, a clean
   autosquash ends on the same tree) and the subjects left once the fixups fold in.
2. The human runs `git rebase -i --autosquash origin/main` (the way back on a conflict:
   `git rebase --abort`); an agent prepares and checks this, never runs it.
3. Then check that no `fixup!`/`amend!` subject is left, that the tree equals step 1's
   (unchanged base) or that `git range-diff <old base>..<old head> origin/main..HEAD` shows only the
   folded fixups (moved base), and that `amend!` messages came out as intended. Write the row.

When a PR exists, push the fixups as they are: the autosquash waits until just before the merge
(AGENTS.md → Branch & commit policy).

**Sandboxes.** Stages make throwaway clones with `node agent-harness/scripts/git/sandbox.mts create` and close
them at the end, unless a human check needs one; then it is kept until that gate, and run.mts
closes it after that gate's decision, unless the decision is `stop` (`sandbox.mts close <name>`
copies its declared logs to `.local/agent-harness/work/<N>/logs/<name>/`, checks them, then deletes it).

## Run log

`.local/agent-harness/work/<N>/run-log.md` is the ledger for resuming a run and the data for evaluating it
(ADR-0008 → Evaluation, level 5). Times are UTC, from `date -u +%FT%TZ`, never estimated. run.mts
writes `Base: <origin/main SHA at preflight>` under the title, every Gate decisions row and, through
run-stage.mts, every Dispatches row. Each table sits under a `## <Table>` heading with the columns
below, in this order: `record-run.mts` reads them by name, so they are a contract. Escape a `|`
inside a cell as `\|`.

| Table | One row per | Columns |
|---|---|---|
| Gate decisions | gate, including each loop iteration | gate · presented · decided · decision (`approve` / `revise: …` / `loop: …` / `lane:N` / `stop`) · snapshot (path · sha256 prefix) · note |
| Dispatches | model per stage dispatch | stage · started · wall time (s) · model · requests · uncached_in · cache_write · cache_read · output · predicted_usd · reported_usd · final_context · claude_code · status line |
| Human actions between gates | each change to the branch or the environment made outside a stage, and each human-run check | when (UTC start and end) · kind (`history` / `commit` / `environment` / `check`) · action · before → after (HEAD, tree) · evidence (reflog entry, `git range-diff` summary, log path) · evidence made stale |

A stage run as its own session with `node agent-harness/scripts/runner/run-stage.mts <N> <stage> -- <brief and
claude flags>` writes its Dispatches rows itself, one per model, from the session's JSON result (the
result is kept under `usage/`, and `claude_code` names the Claude Code version that ran it); never
edit them. A stage never waits on the human; if one did, say so in the row, because its wall time
then includes the wait. Gate wait is not the human's effort: each human-run check (checklist,
simulation, replay) gets a `check` row with the start and end times the human reports, so ask for
both when you hand the check over.

## Output

A local feature branch with verified commits and, after G7 is approved, the run record
`docs/agent-harness/runs/<N>.json` committed on it by run.mts; the artifact trail in `.local/agent-harness/work/<N>/`
(kept until pruned, see Retention); and `pr-draft.md` containing the exact commands and text for the
human to publish.

## Retention

`.local/agent-harness/work/<N>/` is working state: local and gitignored, never staged. The durable record for the
team is the commit, the PR body and the issue, so anything a reviewer needs goes there. The run
record (below) keeps what the human saw and decided, for evaluating the pipeline.

| State | Until | Work dir |
|---|---|---|
| Active | G7 | Keep everything: it is the ledger for resuming a run. |
| Handed off | PR merged | Keep everything. It is needed for review loops (`ds-resolve-pr-comments`), for re-verifying if `main` moves, and for the post-merge checklist and follow-up commands in `validation-report.md` / `pr-draft.md`. |
| Closed | PR merged, post-merge checks confirmed by the human, follow-ups filed or skipped | `node agent-harness/scripts/run.mts <N> --close`: records (`record-run.mts --apply`), writes the issue comment `<records>/<N>/issue-comment.md`, then prunes (`prune-work.mts --apply`), and prints the `gh issue comment` command for the human. |

- **`record-run.mts <N>`** (dry run by default; `--apply` writes) copies the core reports (with a
  `cost-audit.md` when the run has one), the gate snapshots, `issue.json` and the `issue-*.md`
  follow-up drafts into `<records>/<N>/`, and writes `record.json` from the run-log tables plus the
  PR's outcome, read from GitHub. Logs, scripts and sandboxes are never copied. It is
  non-destructive: run it at hand-off and again after the merge to fill the outcome. Labels written
  by hand in `record.json` survive a re-run; a copy that differs from the work dir is refused
  without `--force`. The records dir defaults to `.local/agent-harness/runs/` (local and gitignored) and is
  never under `.local/agent-harness/work/`. What the team shares is the committed `docs/agent-harness/runs/<N>.json` and
  the issue comment: numbers and decision kinds only, never the text of a reply.
- **`prune-work.mts <N>`** only reads GitHub. It refuses unless every PR that closes #N
  (`Closes #N`) is merged, fails closed if GitHub is unreadable, and refuses unless the record holds
  every recordable file with the same hash. The dry run prints what it would delete and the bytes
  freed. `PR-<n>/` dirs from `ds-resolve-pr-comments` work the same way (`PR-<n>` as the id).
- Close-out is the human's call, because the post-merge checks are human-only. An agent may run
  `record-run.mts` and the prune dry run, and runs `--close` (or the prune with `--apply`) only when
  the human asks.
- The scripts accept only issue or PR ids. Audit dirs (`audit/`, `acceptance/`) are rejected;
  delete those by hand when they are no longer needed.
