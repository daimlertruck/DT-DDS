# Require guards, stage limits and usage records from agents that run the pipeline

- Status: In Review
- Author: Antonio Freire
- Deciders: DT-DDS maintainers (MAINTAINERS.md)
- Date: 11 November 2026
- Decision due date: N/A
- Refines: ADR-0008 (decision 6)

**Priority:** Low

## Context and Problem Statement

Issue: #277, "Decide which coding agents may run the pipeline".

ADR-0008 decision 6 keeps the core agent-agnostic, with Claude Code adapters for now. In practice:

- `AGENTS.md` and `.agents/skills/` load in any coding agent.
- The guards, the per-stage tool limits and the usage records are Claude Code parts:
  `.claude/settings.json`, `.claude/pipeline.settings.json` and
  `agent-harness/scripts/runner/adapters/claude.mts`.
- In other agents, such as Codex or pi, the Trial mode rules are instructions only.
- `run.mts` loads one adapter per harness (`agent-harness/scripts/runner/adapter.mts`). It has one,
  `claude`, and stops on any other `--harness`.

What must a coding agent provide before an adapter for it is accepted and it may run pipeline
stages?

## Considered Options

- Option 1: Claude Code only, with no entry criteria (status quo).
- Option 2: Entry criteria per agent, checked with the eval levels of ADR-0008 decision 8.
- Option 3: Agent-independent enforcement: an OS sandbox or container, plus scoped credentials,
  that bound every agent.

## Pros and Cons of the Options

### Option 1

#### Pros

- No work.

#### Cons

- Every request to use another agent is decided case by case, with no stated bar.

### Option 2

#### Pros

- Reuses the existing adapter seam, guards and evals.
- Each admission is a normal harness PR with evidence.

#### Cons

- Each agent needs its own guard registration and tests.
- The guards stay Policy and Advisory layers (`docs/agent-harness/architecture.md` → Enforcement
  layers), not a Boundary.

### Option 3

#### Pros

- A Boundary layer that holds for any agent.

#### Cons

- It replaces the current layers rather than adding an agent.
- It is a larger change than this issue justifies while Claude Code covers every pipeline user.

Whether Codex or pi could meet option 2 or run inside option 3 was not checked.

## Decision outcome

Option 2. A coding agent may run pipeline stages only when a harness PR shows every requirement
below, each with its check. The check levels are those of ADR-0008 decision 8.

| Requirement              | What the agent provides                                                                                                                                                                                                                                                                                                                                                                                                                                    | Check (ADR-0008 decision 8 level)                                                                                                                                                                                                                                                                       | Claude Code today                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| R1 Guards                | Every guard the Claude Code adapter registers runs on the agent's tool calls before they execute: `guard-bash` on shell commands, `guard-mcp` on GitHub and Figma MCP tools, `budget-guard` on every tool in a stage, `guard-reviewer` on reviewer agents. Each guard fails closed (an error or malformed input is a deny). A contributor's own settings cannot turn a guard off in a pipeline session. Any MCP guard keeps the Figma read-only allowlist. | Level 1: a registration test that reads the agent's real config, like `agent-harness/hooks/registration.test.mts`, and a real-CLI test, like `agent-harness/tests/claude-code.integration.test.mts`. Level 2: the guardrail eval passes every case with that agent driving the session, run by a human. | `.claude/settings.json`, `.claude/pipeline.settings.json`, the reviewer agents' frontmatter                        |
| R2 Per-stage tool limits | An adapter `agent-harness/scripts/runner/adapters/<agent>.mts` that implements `HarnessAdapter`. It maps each capability in `agent-harness/config/stages.json` to the agent's tools and runs each stage without prompts: a call outside the stage's allowlist is denied, not asked. It applies the deny rules for the runner's files and the never-edit paths, and the stage's model tier, turn cap and spend cap.                                         | Level 1: a real-CLI test in which a call outside a stage's allowlist is refused and a write to a runner file is refused.                                                                                                                                                                                | `agent-harness/scripts/runner/adapters/claude.mts` (`permissionsOf`, `dontAsk`, `--max-turns`, `--max-budget-usd`) |
| R3 Usage recording       | Each session leaves a machine-readable result: tokens by kind and model, cost, permission denials and a session id for resume. `run.mts` writes it to the run log's Dispatches row, and from there it goes into the run record (level 5).                                                                                                                                                                                                                  | Level 1: a parser test with a saved result of that agent, like `agent-harness/scripts/records/usage.test.mts`.                                                                                                                                                                                          | `claude -p --output-format json`, read by `agent-harness/scripts/records/usage.mts`                                |

Proposed for the maintainers to confirm in review, beyond what the issue asks:

- The agent loads `AGENTS.md` and starts the stage skill from `.agents/skills/` without a copy
  (proposed).
- Its commit and PR attribution can be switched off in committed config, as ADR-0008 decision 5
  requires (proposed).
- Reviewer agents run read-only (proposed).

A PR that admits an agent contains:

- the adapter, registered in `ADAPTERS` in `agent-harness/scripts/runner/adapter.mts`;
- the agent's committed config;
- the level-1 tests, run in the harness CI job;
- the level-2 eval report in the PR description;
- updates to the runbook text that says other agents run none of the guards
  (`docs/agent-harness/workflow.md`, `docs/agent-harness/architecture.md`).

A new agent that meets this list needs no new ADR. No agent gets remote writes beyond what ADR-0008
decision 4 allows.

**Today** only Claude Code meets the list. No other agent is admitted, and `run.mts` keeps refusing
other harnesses. Whether Codex or pi could meet the list was not checked.

**Agents that do not qualify:** contributors may use them interactively with `AGENTS.md` and the
skills, where the Trial mode rules are instructions only. They do not run pipeline stages.

**Out of scope:** how a second model reviews the work. #278 decides that.

Consequences:

- Good: a stated bar for admitting an agent, reuse of the existing seams and evals, and no change
  for current users.
- Bad: each admitted agent duplicates guard registration and tests. The guards remain Policy and
  Advisory layers, not a Boundary.

Revisit when a second agent is proposed for many contributors, or when the guards move to an
agent-independent layer (option 3).

### Next steps:

- [ ] On acceptance, the maintainers set the Status.
- [ ] The first PR that admits another agent follows this list.

## References

- #277, #278
- ADR-0008 (decisions 1, 4, 5, 6 and 8)
- `docs/agent-harness/architecture.md` (Enforcement layers)
- `agent-harness/scripts/runner/adapter.mts`
- `agent-harness/config/stages.json`
