---
name: ds-implement-plan
description: 'Use as DT-DDS pipeline stage 4 (implement): execute the approved implementation plan with TDD, in atomic, green commits on the local feature branch.'
argument-hint: '<ISSUE-NUMBER>'
---

# Implement plan

Execute `.local/agent-harness/work/<N>/implementation-plan.md` (approved at G3). Also read `intake-decisions.md`
and `run-log.md` there when they exist: the G1 decisions bind, and the run log holds each gate's
`revise:` instruction (a G6 loop-back names the findings to fix).

## Procedure

1. **Branch.** Work on `{type}/<N>/{kebab-slug}` cut from an up-to-date `origin/main`
   (`git fetch origin main`); `{type}` = the Conventional Commit type of the primary change. If the
   branch already exists (local or remote), it is earlier progress: check it out and resume from its
   tip as-is — never delete, recreate (`checkout -B`), reset, rebase, squash, or start a parallel
   branch. If `main` moved, note the drift in your report; rebasing is the human's call.
2. **Environment.** In a pipeline run, run.mts's health checks ran it just before this step (lockfile
   markers, clean tree, `yarn --frozen-lockfile`, `check-pkg-deps`; the result is in your brief):
   cite them instead of re-running them. Standalone: `yarn --frozen-lockfile` if the lockfile
   differs from what is installed.
3. Work the plan task by task with **TDD** (below) and AGENTS.md → Coding conventions. Leave every
   AGENTS.md → Off-limits path untouched.
4. **Commit** at green, atomic points only (AGENTS.md → Branch & commit policy): a failing-test step
   is never committed on its own. Write each commit with the `ds-commit-message` skill and commit
   exactly as it prescribes: `git commit -F <msgfile>` with no trailer, never `-s` or an agent
   `Signed-off-by` (the husky hook adds the human's sign-off last). Stage by explicit path,
   never `git add -A`/`git add .` and never a path under `.local/` (work dirs, local records). The
   husky hooks (commitlint, DCO, `check-pkg-deps`) always run, so never `--no-verify`; a hook failure
   is a failing gate: fix the cause.
5. **Re-dispatch loops.** On a failing validation report apply **Systematic debugging**; on
   `ds-code-review` findings apply **Receiving code review**. Fixes to already-committed work are
   `fixup!` commits, or `amend!` commits when the message must change (`ds-commit-message`). Never
   rebase, reset or squash, even when asked mid-stage (the brief's rule): in a pipeline run,
   run.mts folds this run's fixups before the PR draft (`autosquash.mts`). Standalone with no PR for
   the branch (`gh pr list --head <branch> --state all --json number` prints `[]`), end the report
   with `pre-PR autosquash pending: <n> fixups → <m> commits, expected tree <hash>`
   (`git rev-parse HEAD^{tree}`) for the human.
6. **Clean up.** Delete every file you created for yourself (a probe test, a scratch script) with
   `node agent-harness/scripts/git/clean-run.mts <path>`; it deletes only what this run created. The gate lists
   any left; the next step's clean-tree check stops on them.
7. Leave the push, the PR and every other GitHub write to the human (AGENTS.md → Trial mode).

## Disciplines (mandatory)

### Test-driven development (agent runs only — AGENTS.md → Testing strategy)

**Iron law: no production code without a failing test first.** Wrote code first? Delete it and start
from the test. "Too simple to test" / "test after" is rationalization.

- Write the failing test for the specific behaviour (tools, location and titles: AGENTS.md →
  Testing strategy); run it through turbo (`yarn turbo run test --filter=@dt-dds/react-<pkg>`) and
  confirm it fails for the right reason.
- A story's test is its render: `yarn workspace @dt-dds/docs test-storybook <Name>.stories` (AGENTS.md
  → Stack & commands) goes green before you commit a new or changed story.
- Minimal code to pass; re-run; green. Refactor only while green.
- Coverage thresholds are a floor: never lower one (AGENTS.md → Testing strategy).
- Snapshots: a red snapshot is a failing test to fix, not to update. An intended snapshot change goes
  through `test:update:snapshot` and is named in the commit body.
- **"Cannot be tested" is a claim, not an exemption** — name the concrete obstacle. Typical DT-DDS
  cases: generated themes (`build:theme` output), Storybook-only changes, docs/README-only changes,
  visual appearance. Record each claim for the validation report's **Untested behaviors**.

### Systematic debugging (any gate or test fails)

**No fix without root cause.** First read the Attempt log in `validation-report.md` and skip every
hypothesis it records as failed. Reproduce deterministically, read the actual error, fix the cause
(no swallowed errors, no loosened assertions, no skipped tests). After 3 failed fixes (per the
Attempt log) or when each fix surfaces a new problem → STOP and report the suspected unsound pattern.

### Plan ↔ reality

When the repo contradicts the plan (a file, symbol, prop, path, value absent or different):
- **The issue/RFC also names it** (it appears in the context bundle's requirements or AC): the
  premise is broken — STOP and report plan text beside repo reality.
- **Only the plan names it:** repair against what exists and record it under `## Deviations`
  (`plan said · repo has · did`) in the same step.

### Receiving code review

Verify each finding against the code before acting; no performative agreement ("Fixed: <what>" or
evidence-backed pushback). A finding that contradicts the plan → Plan ↔ reality. Re-run gates after.

### Verify your own claims

No "it passes" without having run it this turn and seen 0 failures (see `ds-verify-changes`).

## Output

Local commits on the feature branch (the human sign-off as the only trailer, hooks passed); plan
checkboxes ticked; Deviations recorded. Report the commit list (`git log --oneline origin/main..HEAD`)
for gate G4.
