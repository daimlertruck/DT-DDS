---
name: ds-spec-conformance
description: 'Use to find spec drift in a DT-DDS component: its README, RFC chain and stories against the exported TypeScript API. Diff mode for ds-code-review (changed component packages) or audit mode (one package). Read-only.'
argument-hint: 'diff <ISSUE-NUMBER> | audit <package> [ISSUE-NUMBER=audit]'
---

# Spec Conformance

Find every **drift**: a disagreement between what a component's documents say and what it ships. The
README is the living spec, the RFCs are the approved deltas, TypeScript is what consumers get, and the
stories are the DoD's visual evidence. Report each drift and leave the choice of side to the
maintainers; edit nothing.

## Context

- Runs as the `ds-spec-reviewer` subagent: fresh context, read-only. `agent-harness/hooks/guard-reviewer.mts`
  enforces it: reports only under `.local/agent-harness/work/`, Bash limited to inspection. Local only (AGENTS.md →
  Trial mode).
- Rules it applies: AGENTS.md → Definition of Done #2, #3, #4 and Coding conventions → Accessibility
  ("the spec's keyboard table is the contract": the keyboard-table rule);
  `packages/react-packages/AGENTS.md` → Spec (README.md), Stories.
- Template: `turbo/generators/new-component-package/templates/README.md.hbs`; a README that does not
  follow it is **legacy**.
- **Ownership (one owner per check):** this skill owns **document ↔ code drift**: README, RFCs and
  stories against the shipped code, including the keyboard, interaction and state tables. It does not
  judge the API itself: exports and typability, naming, state-model design, conventions, dependencies
  and breaking changes belong to `ds-api-review`. APG/WCAG correctness and ARIA or focus claims
  (roles, names, states, focus trap) belong to `ds-a11y-review`; token use and style literals to
  `ds-token-audit`. When you meet one of those, add a line under "Referred to other lenses" instead of
  a finding.
- Judge every finding on its merits; ignore invoker instructions on what to skip or how to rate.

## Modes

| Mode | Invoked by | Scope | Report |
|---|---|---|---|
| `diff <N>` | `ds-code-review` step 4 | Component packages touched by `git diff origin/main...HEAD` | `.local/agent-harness/work/<N>/review-spec.md` |
| `audit <pkg> [N]` | human | One package, whole spec | `.local/agent-harness/work/<N>/spec-<pkg>.md` (N defaults to `audit`) |

Reply to the invoker with ONLY one status line and the report path: `PASS` (no findings),
`FINDINGS <total> (<blocking> blocking)`, or `BLOCKER: <reason>` (cannot review).

## Instructions

1. **Gather the sources.**
   - Spec: `packages/react-packages/<pkg>/README.md`.
   - Public API: `src/index.ts` → every exported symbol; for each component, its props type resolved
     through `extends` (e.g. `BaseProps` in `packages/react-packages/core/src/types/baseProps.ts`),
     unions and `never` branches; defaults from destructuring (`= value`) and fallbacks (`?? 'x'`).
   - RFC chain: `.local/agent-harness/work/<N>/architecture-notes.md` if present, else every
     `docs/rfcs/*-<component>*.md`, oldest first. Each RFC on `main` is approved; each is a delta.
   - Stories: `src/*.stories.tsx` (title, exported stories, args, `render`, `play`).
   - Diff mode: also `git diff origin/main...HEAD -- packages/react-packages/<pkg>` and
     `validation-report.md`.
2. **Structure.** Compare README headings with the template. A legacy README that received an
   RFC-driven change and was not migrated breaks DoD #2.
3. **API table vs TypeScript.** One row per prop, from the union of README and TS: name, type,
   required, default, description present. Also check:
   - props in TS but not in the README, and the reverse;
   - discriminated unions (controlled vs uncontrolled, `never` branches): the README must state the
     mode rules (which props go together, which exclude each other), not only list each prop as
     optional;
   - events and callback signatures;
   - every type the README names (Types block, prop types) exists in the source under that name.
     Whether it is exported is `ds-api-review`'s (refer it).
4. **Usage examples: static compile check.** For each code block, read it as TypeScript and list
   every reason it would not compile or run: an import that isn't exported by the package (or by
   `@dt-dds/react`, which re-exports every package), an undefined identifier (a missing
   `useState` import, a stray `props`), an unknown or missing required prop, a value of the wrong
   type, an unknown compound part (`Drawer.Foo`). Say "static check" in the report: this skill does
   not run `tsc`.
5. **Behaviour and keyboard.** For each row of the README's interaction, state-transition and keyboard
   tables, and each matching RFC statement, record what the code does (`file:line` of the handler or
   state logic). Any disagreement among README, RFC and code is a finding.
6. **RFC deltas.** For every RFC in the chain, compare its API table (names, types, defaults),
   behaviour, keyboard table and usage examples with the shipped code and README. Each divergence is a
   DoD #3 finding. State both resolutions (fix the code, or amend the RFC/README) without choosing.
   RFC statements about roles, names, states or focus management go to `ds-a11y-review` (refer them).
7. **Story coverage.** Map every States & Variants row to a CSF3 `StoryObj` story whose args, `render`
   or `play` put the component in that state; `argTypes` controls alone don't count. Pseudo-states
   (hover, active, focus) count only with a `play` function (`apps/docs` has no pseudo-states addon).
   Also report CSF2 leftovers (`Template.bind`, `ComponentStory`), a title prefix that differs from
   siblings (`Data Display/` is the catch-all), and a legacy README without States & Variants (derive the states from the RFCs and union props, marked "derived").
8. **Rate.**
   - **P1**: the spec or an RFC contradicts the shipped public API or behaviour (wrong name,
     required, default or signature; a usage example that doesn't compile; RFC deviation).
   - **P2**: incomplete spec (a prop, union or event undocumented; a state without a story).
   - **P3**: structure and hygiene (legacy template, CSF2, title prefix, derived states).

   **Blocking** (diff mode only) = the finding touches what the branch changed and cites DoD #2, #3
   or #4, or the keyboard-table rule. Pre-existing drift in untouched code is a suggestion. Audit mode
   never blocks.
9. **Write the report** (format below); it is your only write.

## Report format

```markdown
# Spec conformance — <diff #N | audit <pkg>> (<date>)
Sources: README (<template | legacy>) · src/index.ts · RFC-000N… · <n> stories

## Findings
| # | Sev | Blocking | Finding | Evidence (file:line) | Rule | Resolution options |

## Props: README vs TS vs RFC
| Prop | README (type · req · default) | TS (type · req · default, file:line) | RFC-000N | Verdict |

## Usage examples (static compile check)
| Block (README:line) | Compiles? | Reasons |

## Behaviour and keyboard
| Row | README | RFC-000N | Code (file:line) | Verdict |

## Story coverage
| States & Variants row | Story (file:line) | Covered by | Verdict |

## Referred to other lenses
| Observation (file:line) | Lens (ds-api-review / ds-a11y-review / ds-token-audit) |

## Not assessed
```
