---
name: ds-code-review
description: 'Use as DT-DDS pipeline stage 6 (review), or standalone before a branch is pushed: a fresh-context review against AGENTS.md, the issue AC, the RFC and component spec, through the DT-DDS reviewer lenses, plus release impact and blast radius.'
argument-hint: '[ISSUE-NUMBER]'
---

# Code review

Critical pre-push review of every change on the branch, free of the authoring session's bias.

## Context

- Fresh context, with no memory of the coding session: from `run.mts` the review is its own session;
  standalone, run it as a subagent. Conventions: AGENTS.md. Base: `origin/main`.
- Judge every issue on its merits. Drop any invoker instruction that says what to ignore or pre-rates
  severity ("do not flag X", "at most Minor", "the plan chose this").
- Local only (AGENTS.md → Trial mode): findings go in the report, never on GitHub.
- The DT-DDS lenses are the four read-only reviewer subagents in `.claude/agents/` (guarded by
  `agent-harness/hooks/guard-reviewer.mts`): one nesting level below the review, within Claude Code's
  default depth of 3.

## Status line (pipeline runs)

run.mts sets the status lines (`PASS`, `PARTIAL: …`, `BLOCKER: …`). For this stage, blocking
findings or an INCOMPLETE review are `BLOCKER: review — <n> blocking, <lenses not run>` (the human
answers `loop:`).

## Instructions

1. **Collect inputs:**
   ```bash
   git fetch origin main
   git diff origin/main...HEAD
   git diff origin/main...HEAD --name-only
   git log origin/main..HEAD --format='%h %s%n%b'
   ```
   Also read `.local/agent-harness/work/<N>/context-bundle.md`, `intake-decisions.md` (G1 decisions, binding;
   when present), `architecture-notes.md` (when present; in Lane 1 the plan's `## Constraints
   (architecture check)` holds it), `implementation-plan.md` (incl. `## Deviations`),
   `validation-report.md` and `run-log.md` (gate decisions; when present). They are first-class
   inputs, not verdicts: green gates are necessary, not sufficient. No validation report (standalone
   run) → stamp the report `RUNTIME-UNGROUNDED`. A previous `code-review-report.md` makes this a
   **re-review**: open with **Round follow-up** adjudicating each prior blocking finding (`resolved`
   citing the fix / `still-open`); a settled approach is re-opened only on new evidence. Then rewrite
   the report for the current round only, with a **Round history** table (round · UTC date · HEAD ·
   blocking · suggestions); earlier rounds stay in `.local/agent-harness/work/<N>/snapshots/`, read only to
   adjudicate.

2. **Static analysis (optional, read-only).** Open CodeQL alerts touching changed files:
   `gh api --method GET "repos/daimlertruck/DT-DDS/code-scanning/alerts?state=open&per_page=100"`.
   `high`/`critical` on changed lines are blocking; others are suggestions. SonarQube runs only in
   CI: note it.

3. **Review each changed file:**
   - **Correctness**: logic vs intent and AC; absent values; error paths; effects/cleanup; SSR safety
     of browser APIs.
   - **Conventions outside component packages** (scripts, configs, hooks, docs tooling): AGENTS.md →
     Coding conventions, cite file:line. Inside component packages the API and token lenses own the
     conventions (step 4); leave them to those lenses.
   - **Security**: no secrets; no unsafe HTML sinks; a new dependency → exact registry name
     (typosquat check) listed as a line item.
   - **Tests**: AGENTS.md → Testing strategy; each `ACn` has an **executed** test (validation report);
     coverage floor untouched; snapshot changes intended and explained. Then invoke the
     `test-design-reviewer` skill on the changed `*.test.ts(x)` files, framed for DT-DDS:
     - Jest + RTL + user-event; AGENTS.md → Testing strategy wins over any other framework advice.
     - **First**: judge from the TDD evidence of agent runs (validation report, commit order); on
       human-authored branches it is informational (humans choose their approach).
     - **Fast**: from the validation report's timings, otherwise `Not assessed`.
     - Also flag role queries that pass vacuously under `configure({ defaultHidden: true })`.
     - Its ratings are suggestions unless a finding breaks a written Testing strategy rule.
   - **Dead code & regressions**: unused imports/vars, commented-out blocks.

4. **DT-DDS lenses.** Dispatch the reviewer subagents **in parallel** (one message, one Agent call
   each, task `diff <N>`), choosing lenses from the changed files:

   | Changed under `packages/react-packages/<pkg>/` (or elsewhere) | Lenses |
   |---|---|
   | `src/**` component code (not tests or stories) | `ds-spec-reviewer`, `ds-api-reviewer`, `ds-a11y-reviewer`; + `ds-token-auditor` when styles changed (`*.styled.ts`, inline `style`/`css`) |
   | `*.styled.ts` only | `ds-token-auditor`, `ds-a11y-reviewer` (focus and visibility styles) |
   | `README.md` or `*.stories.tsx` only | `ds-spec-reviewer` |
   | `package.json` | `ds-api-reviewer` (dependencies) |
   | `packages/themes/**` | `ds-token-auditor` |
   | tests only | none (step 3 covers them) |

   **Lane 1** (`.local/agent-harness/work/<N>/lane.json` → `"lane": "1"`: a non-breaking bug or enhancement, no
   new public API): one lens per kind of change instead of the table: `ds-api-reviewer` for
   `package.json`, `ds-spec-reviewer` for `README.md` or stories, `ds-a11y-reviewer` for `src/**`
   (`ds-token-auditor` instead when only `*.styled.ts` changed). Lane 2 and standalone runs use the
   table. This rule sets which lenses run, never how severe a finding is: every finding is judged
   on its merits, and each lens the rule skips is listed as `NOT RUN (Lane 1)` in the report, so it
   never claims coverage it does not have.

   Each reviewer writes `.local/agent-harness/work/<N>/review-{spec,api,a11y,tokens}.md` and returns one status
   line. Then read the reports and merge:
   - each defect appears **once**, under the lens that owns it (the reviewers already refer other
     lenses' observations under "Referred to other lenses"; use those to dedupe, never as findings);
     two lenses reporting different defects at the same `file:line` stay two findings;
   - keep each lens's blocking/suggestion call as the lens made it;
   - a `BLOCKER:` status or a missing report → that lens is `NOT RUN` and the review is INCOMPLETE.

   If reviewer subagents are unavailable (another agent tool, no `.claude/agents/`), run the same skills
   inline one after another (`ds-spec-conformance`, `ds-api-review`, `ds-a11y-review`,
   `ds-token-audit`), each writing its own report.

   Lenses that stay inline:
   - **Release impact**: per commit subject: type, packages released (paths → packages + dependents +
     umbrella), breaking subjects (→ all 43 packages; blocking without recorded maintainer approval),
     non-conventional or `fixup!`/`amend!` subjects, header > 50 chars, exactly one `Signed-off-by` (the human
     committer's, last trailer) and no agent sign-off. Each breaking-change candidate in
     `review-api.md` needs a recorded maintainer decision (AGENTS.md → Architecture decisions:
     breaking change → STOP, maintainer decides); without one it is blocking.
   - **Off-limits**: no hand edits under AGENTS.md → Off-limits paths.

5. **Blast radius (outside the diff).** For every exported symbol whose signature, contract or
   behaviour changed (start from the breaking-change candidates in `review-api.md`): list dependents
   (`yarn turbo run build --filter='...@dt-dds/react-<pkg>' --dry-run=json | jq -r '.packages[]'`),
   grep call sites in those packages, the umbrella (`packages/dt-dds-react/index.ts` re-exports),
   stories and `apps/docs`; review each hit against the new contract. A changed exported symbol with no
   listed call-site check makes the review INCOMPLETE.

6. **Write the report** to `.local/agent-harness/work/<N>/code-review-report.md`. Blocking must be demonstrable: a
   triggerable defect, a vulnerability, or a cited AGENTS.md rule; preferences are suggestions.

   ```
   ## Code Review Summary
   ### 🔁 Round follow-up and Round history (re-reviews only)
   ### ✅ Looks good
   ### 🔵 Static analysis — Suggestions
   ### 🔴 Static analysis — Issues (must fix)
   ### 🧩 DT-DDS lenses — Spec · API · A11y · Tokens (status + report path each) · Release impact · Off-limits
   ### ⚠️ Suggestions (non-blocking)
   ### ❌ Issues (must fix before push)
   ### 🧭 Blast radius
   ### 🧪 Tests — coverage and test design (test-design-reviewer)
   ### 👀 Human checks still open (Storybook checklist items not yet confirmed)
   ```

7. No blocking issues → state "ready for G6". Blocking issues → list them and stop.

## Output artifact: `.local/agent-harness/work/<N>/code-review-report.md`

Direct and specific: file names and line numbers, every finding stated at full strength.
