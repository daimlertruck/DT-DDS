---
name: ds-check-architecture
description: 'Use as DT-DDS pipeline stage 2 (architecture check): extract the binding constraints a plan must honour from ADRs, the component RFC chain and its spec README.'
argument-hint: '<ISSUE-NUMBER>'
---

# Check architecture (solution design)

Turn the context bundle plus DT-DDS's decision records into the binding constraints planning must
honor. Run in isolation: only the artifact crosses to the next stage.

## Input

`.local/agent-harness/work/<N>/context-bundle.md` from `ds-gather-context`. Absent, or it reports a blocker → STOP.
Also read `intake-decisions.md` and `run-log.md` there when they exist: the G1 decisions bind and
win over the bundle's open questions, and the run log holds each gate's `revise:` instruction.

## Sources (AGENTS.md → Architecture decisions)

1. **ADRs** (`docs/adrs/NNNN-*.md`): only the "Decision outcome" section binds; "Next steps" and
   the statements AGENTS.md lists as stale do not.
2. **RFC chain** for the affected component: every `docs/rfcs/*-<component>*.md`, oldest first;
   later RFCs amend earlier ones. The RFC linked by the issue binds API, behaviour, a11y and AC.
3. **Component spec** `packages/react-packages/<pkg>/README.md` (the living spec). Where the spec
   and the shipped code disagree, record it (known drift exists, e.g. RFC-0001 `defaultOpen` vs
   `defaultIsOpen`); never choose silently.
4. **Established conventions** in AGENTS.md (Architecture decisions, Project overview, Coding
   conventions): they count as decided.

## Fast path

When the bundle's Route is `bug`, it lists no public API change and no RFC, and AGENTS.md routing
needs no ADR: list the `docs/adrs/` titles only, and read an ADR's Decision outcome only when its
title names the changed area. Write at most ~40 lines: applicable decisions by id, AC → evidence,
and gaps. Cite AGENTS.md, the issue and `intake-decisions.md` by section, so each fact has one home.

## Procedure

1. Select only the decisions that bear on this issue's requirements.
2. Distill each into a one-line binding constraint, quoting its id (`ADR-0007`, `RFC-0002`,
   `README#Accessibility`, `AGENTS.md#Coding conventions`).
3. Add the DT-DDS structural constraints that apply (AGENTS.md → Definition of Done): public types
   exported from `src/index.ts`; every `@dt-dds/*` import declared; component tokens → semantic
   fallback; the spec README update the change requires; stories per States & Variants row.
4. Detect decisions the issue forces that no source covers.
5. For each `ACn`, note how it can be evidenced: a test, an agent-run check (in a throwaway clone
   when it writes outside build output), or a human-run check with its reason (a guard blocks it,
   it needs a remote effect or credentials, or it needs human judgement). Agent-run is the default.

## Fail-loud rule

- A new tool, dependency, architecture or cross-cutting pattern the issue forces with no covering ADR
  → `BLOCKED-DECISION-GAP` (an ADR is a maintainer decision).
- A new public API (prop, variant, sub-component) with no covering RFC → `BLOCKED-DECISION-GAP`
  (RFC required, separate PR).
- A breaking change to existing public API → `BLOCKED-DECISION-GAP` (maintainer decides route).

Record the gap as found: never invent a decision, pick a direction, or defer it to keep moving.

## Output artifact: `.local/agent-harness/work/<N>/architecture-notes.md`

Sections: Applicable decisions (id · constraint · source path) · Binding constraints for the plan ·
Known spec/code drift · Gaps / unmade decisions · Verdict (`CONSTRAINTS-EXTRACTED` /
`BLOCKED-DECISION-GAP`). Quote ids and constraints exactly; never weaken a decision.
