---
name: ds-implement-from-design
description: 'Use when a DT-DDS issue carries design artifacts (Figma frames or images in .local/agent-harness/work/<N>/assets/): map every value to theme tokens and hand visual fidelity review to the human in Storybook.'
---

# Implement from design (playbook)

Invoked by `ds-plan-implementation` when `.local/agent-harness/work/<N>/assets/` is non-empty. Pairs with the human
Storybook checklist in `ds-verify-changes`. The designers' review (Jira "Design Review" step) remains
authoritative for visual sign-off.

## Prerequisite

`.local/agent-harness/work/<N>/assets/` exists with `manifest.md` (file · Figma node/attachment · story/state ·
viewport). Visual issue with no assets → STOP and request the design; never guess a layout. With the
Figma MCP configured, `get_design_context` may be read for structure; its React + Tailwind code is
reference only, never pasted (AGENTS.md → Tooling / MCP).

## Steps

1. **Read the assets** and the manifest: spacing, colour, typography, sizing, radius, shadows, states.
2. **Map every value to a theme token before writing code** (AGENTS.md → Coding conventions;
   `packages/themes/AGENTS.md` → Token tiers lists the component token groups):
   - **Component tokens first:** `theme.components.<group>.<key>` from
     `packages/themes/src/themes/daimler-truck/components.ts`. Groups do not always match package
     names, and values are typed `string | object`: narrow to `string` before use.
   - **Fallback to semantic tokens:** `theme.palette.*`, `theme.spacing.*`, `theme.fontStyles.*`,
     `theme.shape.*`, `theme.shadows.*` when no component token covers the value.
   - No token matches → STOP and report value + screen/state (a token gap is resolved in Figma →
     token export, never by hardcoding or inventing a token).
   - Moving an existing component from semantic to component tokens can change its appearance (the
     values differ, e.g. accordion) → call it out in the plan as a visual change for design review.
   - Reuse existing `@dt-dds/*` components before building new parts; respect package layering.
3. **Implement** with TDD per `ds-implement-plan` (behaviour and states are testable; pixel values are
   not — record appearance under Untested behaviors).
4. **Fidelity:** add a story per designed state; list in the verify checklist which frame to compare
   with which story/state/viewport. With no browser automation configured, the visual comparison is
   done by the human (`HUMAN-RUN-PENDING` until they report; `ds-verify-changes` → Procedure,
   step 6).

## Verify

Verify gate passes; every designed state has a story; the human confirms visual fidelity against the
listed frames (or reports deviations, which loop back to implementation).
