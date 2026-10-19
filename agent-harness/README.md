# Agent harness

The code behind the DT-DDS agentic workflow: the pipeline runner that runs each stage as its own
Claude Code session and stops at a human gate after it, the hooks that guard every session, and
their tests and evals. Contributors use it through the [runbook](../docs/agent-harness/workflow.md).

| Read                                                     | For                                                                          |
| -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [workflow.md](../docs/agent-harness/workflow.md)         | Running an issue through the pipeline, gate replies, stop and resume         |
| [architecture.md](../docs/agent-harness/architecture.md) | Directory ownership, execution flow, enforcement layers, approval and trust  |
| [testing.md](../docs/agent-harness/testing.md)           | Deterministic tests, CI, the guardrail eval                                  |
| [phase-2.md](../docs/agent-harness/phase-2.md)           | What must change before agents get more autonomy; the proposed eval baseline |
| [runs/](../docs/agent-harness/runs/README.md)            | The committed run records                                                    |

## Layout

| Path       | What                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------ |
| `config/`  | `stages.json` (stages, lanes, caps, tools by capability) and `prices.json`                       |
| `hooks/`   | Claude Code hook handlers: the guards, the formatter, the hook health check                      |
| `scripts/` | `run.mts` (the runner) and `runner/`, `git/`, `records/`, `lib/`; `check.mts`, `sync-skills.mts` |
| `tests/`   | Cross-module tests: `run.mts` end to end, the real `claude` CLI, and their fixtures              |
| `evals/`   | The paid behavioural eval (`guardrails/`), human-run                                             |

Claude Code registers the hooks in `.claude/settings.json` (every session),
`.claude/pipeline.settings.json` (pipeline stages) and the reviewer agents' frontmatter in
`.claude/agents/` (`guard-reviewer`). Skills live in `.agents/skills/`. Run state and local records go
to `.local/agent-harness/` (gitignored).

## Commands

The harness needs Node `^22.18.0 || >=24`, and `check.mts` needs `yarn --frozen-lockfile` first.
Run from the repo root:

| Command                                              | Does                                                            |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| `node agent-harness/scripts/run.mts <N> --dry`       | Shows the lane, steps and caps for issue N; no model, no writes |
| `node agent-harness/scripts/run.mts <N>`             | Runs the pipeline, answering gates in this terminal             |
| `node agent-harness/scripts/check.mts`               | Types, lint, format and all deterministic tests (`--fix`)       |
| `node agent-harness/hooks/check-hooks.mts`           | Checks that every registered guard starts and fails closed      |
| `node agent-harness/evals/guardrails/run.mts --list` | Lists the eval's runs; running them is paid and human-only      |

## Changing the harness

- The harness is TypeScript that Node runs by type stripping (the root `engines` floor,
  `^22.18.0 || >=24`): files are `.mts`, imports name the `.mts` file, and only erasable syntax is
  allowed (no `enum`, `namespace` or parameter properties). Generic helpers and helpers that return
  `never` are `function` declarations (Prettier 2 rewrites `<T,>`; TypeScript narrows after a
  `never` call only then).
- Files stay under about 500 lines, split by responsibility. Use `interface` for shapes, `readonly`
  data, pure functions for the logic, and I/O in a thin outer layer.
- Hooks import only Node built-ins, because a guard runs on its own on every tool call.
- Before a harness change merges, `check.mts` and `check-hooks.mts` pass. CI runs both on pull
  requests that touch the harness (`.github/workflows/agent-harness.yml`). In Claude Code,
  `format-harness.mts` formats each harness file an agent edits.
- A guard rule gets a unit case that fails first, plus an allowed twin. A hook registration,
  matcher, settings key or permission rule gets a real-CLI scenario in
  `tests/claude-code.integration.test.mts`. What a model chooses is an eval question, never a guard
  test: [testing.md](../docs/agent-harness/testing.md#which-test-to-add).
- The guardrail eval is due before a harness merge, and after a change to the default model or to
  the `AGENTS.md` rules or skills its cases probe. Only a human runs it
  ([testing.md](../docs/agent-harness/testing.md#running)).
- `guard-bash` reads command text. It does not get new rules without a reproduced incident, and a
  rule that needs a shell parser belongs in a stronger layer instead
  ([architecture.md](../docs/agent-harness/architecture.md#enforcement-layers)).
- After adding or renaming a skill in `.agents/skills/`, run
  `node agent-harness/scripts/sync-skills.mts --fix`.
