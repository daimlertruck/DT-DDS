---
name: ds-pr-describe-draft
description: 'Use as DT-DDS pipeline stage 7 (PR draft), or standalone on a verified, reviewed branch: prepare the PR title, body and the commands the human runs to push and open it.'
argument-hint: '<ISSUE-NUMBER>'
---

# PR describe (prepare the PR)

Prepare a pull request for a human to publish: write the text and the commands, and the human runs
them (gate G7). **Trial mode: this skill never pushes and never calls `gh pr create`.**

## Gate before preparing

`.local/agent-harness/work/<N>/validation-report.md` reads `PASS` and `code-review-report.md` has no ❌ blocking
findings. Otherwise STOP. List unconfirmed human checks in the output.

## Ready or draft

- **Ready** (the default): nothing is pending before review. No AC-linked behaviour in
  `validation-report.md` is `HUMAN-RUN-PENDING`, and `code-review-report.md` lists no open human
  decision. Checks that can only happen after merge (`BLOCKED-BY-ENV`, for example the first CI run
  on `main`) do not hold a PR in draft; they go in the body's **After merge** list.
- **Draft**, with `[WIP]` in the title: something is still pending before review. Name it at the top
  of `pr-draft.md`.

`pr-draft.md` carries the commands for both, the recommended one first.

## Instructions

1. Read `git log origin/main..HEAD --format='%h %s'` and `git diff origin/main...HEAD`. Read the
   context bundle (issue, RFC, AC), and `intake-decisions.md` and `run-log.md` when they exist:
   settled decisions and gate notes the PR body should reflect.
2. **Title:** `{type}: {description}` (AGENTS.md → Branch & commit policy), with the `[WIP] ` prefix
   only for a draft (the human removes it when marking ready). Most significant type (feat > fix >
   others); ≤ 70 chars.
3. **Body:** fill every section of `.github/pull_request_template.md`, keeping its headings:
   - **Description** — 2–5 sentences/bullets: what changed and why; design decisions, trade-offs;
     link the RFC (`docs/rfcs/NNNN-*.md`) and spec README when relevant.
   - **Issue** — `Closes #<N>` (a closing keyword, so GitHub links the issue).
   - **Screenshots** — leave for the human (visual changes).
   - **Type of change** — tick the boxes matching the commits.
   - **Check requirements** — leave for the human/reviewers to tick.
   - **Live Preview** — leave empty; the Storybook deploy workflow appends the preview URL.
   Append a short **Release impact** note (packages released per commit subjects; must contain no
   un-approved breaking subject), **How to verify** (verify-gate commands + Storybook stories/states)
   and, when there are any, **After merge** (the post-merge checks).
4. Write `.local/agent-harness/work/<N>/pr-draft.md` containing the mode and why, the title, the full body, and
   the commands for the human, in order. In a pipeline run, run.mts already tried the autosquash:
   the `Autosquash` line of your brief says `done` (the fixups are folded: write "Autosquashed by
   run.mts: <its line>") or why it refused. **Fixups first:** if
   `fixup!`/`amend!` commits remain (`git log --format=%s origin/main..HEAD | grep -E
   '^(fixup|amend)! '`) and no PR exists for the branch (`gh pr list --head <branch> --state all
   --json number` prints `[]`), the commands start with the autosquash and its tree check: the tree
   after it must equal today's `git rev-parse HEAD^{tree}` (on an unchanged base), and
   `git rebase --abort` is the way back if it stops on a conflict. No fixups → write "No fixups:
   nothing to autosquash." When a PR exists, fixups are pushed as they are.
   ```bash
   git rebase -i --autosquash origin/main     # only when fixups remain and no PR exists
   git rev-parse HEAD^{tree}                  # must print today's tree (written here)
   git log --oneline origin/main..HEAD        # review the commits once more
   git push -u origin HEAD
   # Ready (default):
   gh pr create --base main --title "<title>" --body-file .local/agent-harness/work/<N>/pr-body.md
   gh issue edit <N> --remove-label "status:in progress" --add-label "status:in review"
   # Draft (a pre-merge check is pending), instead:
   gh pr create --draft --base main --title "[WIP] <title>" --body-file .local/agent-harness/work/<N>/pr-body.md
   # ...and once the pending check is done:
   gh pr edit <pr> --title "<title>" && gh pr ready <pr>
   gh issue edit <N> --remove-label "status:in progress" --add-label "status:in review"
   ```
   Also write the body alone to `.local/agent-harness/work/<N>/pr-body.md`.

## Output

`pr-draft.md` + `pr-body.md` in `.local/agent-harness/work/<N>/`, and a short summary for gate G7 that names the
recommended mode. Nothing is pushed or created by the agent.

### Example body

For branch `feat/218/drawer-position`:

```markdown
## Description

Adds a `position` prop (`'left' | 'right'`, default `'right'`) to Drawer so it can anchor to either
edge, as approved in RFC-0002. The slide animation mirrors per side; existing usages are unchanged.

## Issue

Closes #218

## Screenshots

<!-- Please provide screenshots, if any visual changes are present -->

## Type of change

- [x] Feature

## Check requirements

- [ ] The code follows the project's coding standards and guidelines
- [ ] Documentation is updated accordingly
- [ ] All existing tests are passing
- [ ] I have added new tests to cover the changes

## Live Preview

<!-- Url will be added by the pipeline, after deploy is completed -->
```
