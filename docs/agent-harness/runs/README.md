# Agentic run records

One JSON file per pipeline run that reached G7, named after the issue: `<N>.json`. The runner
(`agent-harness/scripts/run.mts`) commits it on the feature branch when G7 is approved, so it ships
with the pull request.

After the merge, `node agent-harness/scripts/run.mts <N> --close` prepares an issue comment with the
same numbers and the pull request's outcome. See the [runbook](../workflow.md).

A record holds numbers and decision kinds only: never the text of a gate reply, a note or a human
action.

| Field                  | What                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `schema`               | `1`                                                                                                                                  |
| `issue`                | The issue number                                                                                                                     |
| `lane`                 | `lane`, `name`, `decidedBy` (rules, a model or the human) and `confidence`                                                           |
| `base`                 | `origin/main` when the run started                                                                                                   |
| `harness`              | `commit`: the last commit that changed the harness; `dirty`: uncommitted harness changes; `claudeCode`: versions                     |
| `started`, `handedOff` | UTC times of the first stage and of the G7 decision                                                                                  |
| `totals`               | `listUsd` (token cost at list price), `reportedUsd` (Claude Code's figure), tokens by type, `stageSeconds`, `toolCalls`              |
| `stages[]`             | Per stage: `stage`, `models`, `listUsd`, `reportedUsd`, `seconds`, and `requests`, `uncachedIn`, `cacheWrite`, `cacheRead`, `output` |
| `gates[]`              | Per gate shown: `gate`, `iteration`, `decision` (`approve`, `revise`, `loop`, `lane`, `stop`) and `waitSeconds`                      |
| `humanActions`         | How many changes and checks the human made between gates (Human actions rows)                                                        |

Costs are token cost at list price (`agent-harness/config/prices.json`), not what a provider bills.
