---
name: ds-express
description: 'Use only when run.mts starts a Lane 0 (Express) DT-DDS run: plan, the combined G1+G3 gate, then apply.'
argument-hint: '<ISSUE-NUMBER> plan|apply'
---

# Express (Lane 0)

One session for a small change the issue already states (`lane.json` says why it is Lane 0). Two
parts, one human gate between them; `run.mts` resumes this session for part 2, so your part 1 context
carries over. AGENTS.md → Trial mode governs: local only, commits on the feature branch, nothing
pushed. Lane 0 has no verify or review stage: this session produces their evidence itself (Part 2,
step 3).

Inputs in `.local/agent-harness/work/<N>/`: `issue.json`, `lane.json`, and `intake-decisions.md` / `run-log.md`
when they exist (decisions there bind). Facts the issue states with a file:line, a command or a SHA
are inputs, not claims to re-prove (AGENTS.md → Work intake & routing).

## Part 1 — plan (stop at the gate)

1. **Intake** (the G1 half of the gate). Check only what routing depends on: the Lane 0 criteria in
   `lane.json` still hold, no RFC is needed, no ADR or spec binds the change (one line each: what
   you checked), no public API changes, and the named paths exist. Anything that fails →
   `BLOCKER: lane — <criterion>` (the human answers `lane:1` at the gate).
2. **Plan** (the G3 half). Write `express-plan.md`, ≤ 20 lines:
   - branch `{type}/<N>/{slug}` (AGENTS.md → Branch & commit policy), created from a freshly
     fetched `origin/main`;
   - the acceptance criteria `AC1…n`, numbered from the issue's Expected Behavior, each with the
     test that covers it (AGENTS.md → Testing strategy), or `untested: <reason>`
     (a claim, listed again under **Untested behaviors** in the validation report);
   - the exact diff, file by file (≤ ~20 changed lines), and the commit subject(s), per
     `ds-commit-message`; each test goes in the same commit as the change it covers;
   - the evidence plan: the Part 2 checks that apply, and the issue's own reproduction if it can
     run safely in a sandbox (`node agent-harness/scripts/git/sandbox.mts`), red before and green after.
3. Write `gate-summary.md` (≤ 10 lines: the diff in one line per file, the ACs and their tests, open
   questions, "approve to implement"). Leave every tracked file unchanged. Report `PASS` and the path
   of `express-plan.md`.

## Part 2 — apply (resumed after approval)

`run.mts` ran the environment health checks just before this part; their result is in your brief.

1. `git fetch origin main`, then create the branch from `origin/main`. Test first where there is
   behaviour: the failing test or reproduction, then the change. Apply exactly the planned
   diff; a needed deviation goes in `express-plan.md` under `## Deviations` with its reason.
2. Commit per `ds-commit-message`: no trailer (never `-s`, never `--no-verify`; the husky hook
   appends the human's sign-off). Tests in the same commit as the change they cover.
3. **Verify**, with the evidence the verify and review stages would have produced: follow
   `.agents/skills/ds-verify-changes/SKILL.md` → Procedure 2 and 4 (up to date, the verify gate,
   including `node agent-harness/scripts/git/check-commits.mts`: the human sign-off present and last on every
   commit, commit bodies free of harness words). Its Procedure 1 (environment) is covered by the
   health checks and step 1's fetch: cite them in the report instead of re-running them. Run each
   command with its output to `.local/agent-harness/work/<N>/logs/<step>.log` and read only the tail. Run the
   reproduction red/green if the plan has one. Write `validation-report.md` (≤ 30 lines): per
   command its exit code and log path; per AC its test and result; **Untested behaviors**;
   the reproduction result; anything `HUMAN-RUN-PENDING`. A failure you cannot fix within the plan →
   `BLOCKER: verify — <command>`.
4. **PR draft.** Follow `.agents/skills/ds-pr-describe-draft/SKILL.md` → Instructions 2–4 (title,
   body from `.github/pull_request_template.md` with `Closes #<N>`, the human's commands). With no
   review stage, the gate before preparing is `validation-report.md` reading PASS. A fixup you made
   is folded by run.mts after this part when its checks allow (the G7 gate shows the result): name
   commits by subject, not by SHA. Delete files you created for yourself with
   `node agent-harness/scripts/git/clean-run.mts <path>` (only what this run created).
5. Write `gate-summary.md` (≤ 10 lines: commits, verify results, ready or draft, the commands the
   human runs). Report `PASS` and the path of `pr-draft.md`.

At a `run budget` denial or the turn limit: stop, write `gate-summary.md` with what is left, and
report `PARTIAL: <what is left>` (run.mts does not let a partial step be approved). Name a denied
tool call in `gate-summary.md` instead of working around it.
