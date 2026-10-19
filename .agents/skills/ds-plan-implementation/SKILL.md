---
name: ds-plan-implementation
description: 'Use as DT-DDS pipeline stage 3 (plan): turn the context bundle into a file-by-file TDD plan covering code, tests, spec README and stories, for human approval at G3.'
argument-hint: '<ISSUE-NUMBER>'
---

# Plan implementation

Produce a concrete, file-by-file plan. Run in isolation. Keep changes minimal and surgical: only
what the issue requires. The plan is reviewed by a human at **G3** before any code is written.

## Procedure

1. Read `.local/agent-harness/work/<N>/context-bundle.md`, and `intake-decisions.md` and `run-log.md` there when
   they exist: the G1 decisions bind and win over the bundle's open questions, and the run log holds
   each gate's `revise:` instruction. Then the architecture constraints, which go in the plan's
   `## Constraints (architecture check)` section either way:
   - `architecture-notes.md` present (Lane 2): its **Binding constraints** are non-negotiable.
   - Absent (Lane 1 has no architecture stage): run `ds-check-architecture` here (read
     `.agents/skills/ds-check-architecture/SKILL.md`): its Fast path when the bundle's Route is
     `bug`, its Procedure and Fail-loud rule otherwise.
   - Verdict `BLOCKED-DECISION-GAP` → put the gap at the top of the plan and STOP.
2. Explore the touched areas and verify every path/symbol THIS session (the bundle's layout claims
   are unverified input). Mark paths the plan creates as NEW.
3. Fold in a playbook when the issue matches one (skip silently if the playbook is not installed):
   - new component → `new-component` (generator + #108 workarounds + spec README from the RFC);
   - token JSON import → `token-import`;
   - legacy README → template → `spec-migrate`;
   - design assets in `.local/agent-harness/work/<N>/assets/` → `ds-implement-from-design`.
4. Write the plan. Each task carries a **verifiable success criterion** (the exact command/check).
   Required DT-DDS task types, when applicable:
   - **Tests first** (AGENTS.md → Testing strategy): name the test file and cases; one case per
     `ACn` and per spec keyboard row touched.
   - **Code** at the correct layer; component tokens → semantic fallback; exported public types.
   - **Spec README** sections to update (API table, Behavior, Accessibility, States & Variants),
     per AGENTS.md → Definition of Done rule 2 (API table matches TS; legacy README migration).
   - **Stories**: one CSF3 `StoryObj` per new/changed States & Variants row
     (`packages/react-packages/AGENTS.md` → Stories: theme access, where story inputs live).
   - **Dependencies**: any new `@dt-dds/*` import declared with the exact workspace version.
   - **Commits**: the planned commit sequence, each atomic and green, with its Conventional Commit
     subject (AGENTS.md → Branch & commit policy); bodies describe evidence in repo terms, never by
     check IDs or work-dir files (`ds-commit-message`). State the **release impact**: which packages
     the subjects + paths will release, and flag any subject that would be breaking (needs
     maintainer approval; never planned by default).
   - **Verify**: the exact verify-gate commands for this change (AGENTS.md → Stack & commands), plus
     the story render check (`test-storybook <Name>.stories`) when stories change, plus the human
     Storybook checklist (states to look at). Each item of an AC definition agreed at G1 gets its
     own check: automated wherever the agent can run it (a test, the build output, the story render
     check), and a checklist item only where it needs human judgement (visual).
   - **Checklist items** each name an observable and a **baseline**: the same check on an existing
     component on `main` ("as Accordion's Specs tab shows today"); if no component shows it today,
     say so and why it should appear. Expectations come from what the story defines (`args`,
     `argTypes`) and what Storybook builds, not from what Storybook usually does. Name stories by
     title and export, never by a hand-written URL (verify takes URLs from the build).
5. **Self-review before finishing:** (a) every `ACn` maps to a task — list gaps; (b) no plan
   failures (below); (c) names/signatures consistent across tasks; (d) every path verified or marked
   NEW; (e) no task touches AGENTS.md → Off-limits paths. Fix inline.

**Plan failures (never emit):** `TBD`/`TODO`/"later"; "handle edge cases" or "add validation" with
no concrete change; "write tests" without file + cases; a path that doesn't exist; a symbol defined
in no task; a commit that would leave tests red.

## Output artifact: `.local/agent-harness/work/<N>/implementation-plan.md`

Sections: Scope · Constraints (architecture check) (the binding decisions by id, from
`architecture-notes.md` or from the check this session ran, and which path it took) · Tasks
(checkboxes, exact paths, success criterion each) · Test plan (AC mapping) ·
Spec & stories · Commit plan + release impact · Verify commands · Human Storybook checklist · Risks
· `## Deviations` (empty; filled by ds-implement-plan). No placeholders. This is gate **G3**.
