# Agent harness architecture

The decision to have a harness is [ADR-0008](../adrs/0008-agentic-development-workflow.md); running
it is the [runbook](workflow.md); testing it is [testing.md](testing.md).

The harness is a workflow, not an agent framework: a script runs a fixed sequence of stages, each a
fresh Claude Code session with a fixed skill and fixed permissions, and a human decides at every
gate. Keep it that size. A new mechanism needs a current problem it solves.

## Directory ownership

| Path                       | Owns                                                                                                                                                                          | Tracked |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `AGENTS.md` and its guides | The rules every agent follows. `CLAUDE.md` files only import them                                                                                                             | yes     |
| `.agents/skills/`          | Every skill, agent-agnostic (the skills CLI layout, so the third-party pins in `skills-lock.json` keep working)                                                               | yes     |
| `.claude/`                 | Claude Code only: `settings.json` (hooks for every session), `pipeline.settings.json` (stage sessions), `agents/` (reviewer wrappers), `skills/` (links to `.agents/skills/`) | yes     |
| `agent-harness/config/`    | The stage table (`stages.json`: stages, lanes, gates, caps, tools by capability) and list prices. Data only                                                                   | yes     |
| `agent-harness/hooks/`     | The hook handlers that `.claude/` registers                                                                                                                                   | yes     |
| `agent-harness/scripts/`   | The runner (`run.mts`, `runner/`), git helpers (`git/`), run records (`records/`), the checks, the skill sync                                                                 | yes     |
| `agent-harness/tests/`     | Tests that span modules: `run.mts` end to end with a fake `claude`, the real `claude` CLI against a scripted model                                                            | yes     |
| `agent-harness/evals/`     | Real-model behavioural evals (paid, human-run)                                                                                                                                | yes     |
| `docs/agent-harness/`      | This documentation, and `runs/`: one record per pipeline run, committed with its PR                                                                                           | yes     |
| `.local/agent-harness/`    | Run state and work dirs (`work/<N>/`), local run records (`runs/<N>/`), eval reports                                                                                          | no      |

Unit tests sit next to the module they test (`*.test.mts`); `tests/` holds only the cross-module
suites (`*.integration.test.mts`).

`.local/` is a separate directory, not a protected one: every session can read and write it. Only
pipeline stages are denied the files the runner owns there
([Enforcement layers](#enforcement-layers)).

## Execution flow

1. `run.mts <N>` checks that no other run is active, runs the preflight (the issue is claimed,
   `check-hooks.mts` passes, `CLAUDE_CODE_SUBAGENT_MODEL` is unset) and picks the lane from the
   issue (`runner/lane.mts`; a model call may only raise it).
2. For each step of the lane, the runner writes the run file
   (`.local/agent-harness/work/.active-run.json`: the step and its tool-call cap), runs the health
   checks before the first branch step, and starts one session: `claude -p` with
   `--settings .claude/pipeline.settings.json`, the stage's agent, its model, `--max-turns`,
   `--max-budget-usd` (what is left of the lane cap), `--permission-mode dontAsk` and an allowlist
   generated from the stage's capabilities (`runner/adapters/claude.mts`). The session's environment
   drops the parent session's variables and blocks every git push (`runner/session-env.mts`).
3. After the session, the runner records its usage, checks for red flags (tracked files changed by
   a work-dir stage, a commit on `main`, a new remote branch) and shows the stage's
   `gate-summary.md`.
4. At the gate, the human's reply decides: next step, the same step again, back to implement, a
   lane change or a stop. The decision and its effects are written to the work dir.
5. At G7 the runner commits the run record (`docs/agent-harness/runs/<N>.json`) and the human pushes
   and opens the PR. After the merge, `run.mts <N> --close` records the run locally and deletes its
   work dir.

## Enforcement layers

The harness uses three kinds of control:

- **Boundary:** enforced by an authority the agent cannot act as. It holds even if the agent tries
  to get around it.
- **Policy:** enforced deterministically by a runtime, for the inputs that runtime sees. It holds
  for ordinary mistakes; an agent that can run arbitrary code can get past it.
- **Advisory:** instructions and text matching. It stops the common case, not a determined one.

| Control                                                                                                          | Kind                 | Covers                                                                                                                       | Does not cover                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| GitHub rulesets (`main` protected, rebase only, a code-owner approval)                                           | Boundary             | Changes reaching `main`                                                                                                      | Feature branches, comments, labels, issues: whatever the session's GitHub token may do                                    |
| npm registry rights (CI holds the publish token)                                                                 | Boundary             | Publishing, if no developer machine holds a publish token                                                                    | A developer who has one                                                                                                   |
| Stage permissions: `dontAsk`, an allowlist per stage, deny rules for the runner's files and the never-edit paths | Policy (Claude Code) | Which tools and command prefixes a stage may use; Edit and Write on the runner's files, the harness and the off-limits paths | What an allowed command runs (`yarn <script>`, a test file): Claude Code's Bash rules are not a boundary around a program |
| `budget-guard` (every tool, stages)                                                                              | Policy               | The tool-call cap per step                                                                                                   | Spend inside one call (`--max-budget-usd` and the lane cap cover spend)                                                   |
| Session push block (`GIT_CONFIG_*` in the stage environment)                                                     | Policy (git)         | Every git push from a stage, whatever runs it                                                                                | A command that resets the variables or sets a `pushurl`; GitHub API writes                                                |
| Runner checks: red flags, loop bounds, budget, `PASS`-only approval                                              | Policy               | Detects what a stage changed; ends runaway loops and spend                                                                   | Prevention: a red flag is found after the session                                                                         |
| `guard-mcp` (GitHub and Figma MCP tools, every session)                                                          | Policy               | MCP writes, by exact tool name, under any server name containing `github` or `figma`                                         | MCP servers of other names                                                                                                |
| `guard-reviewer` (reviewer agents' frontmatter)                                                                  | Policy               | Reviewer writes outside the work dir; non-inspection Bash                                                                    | Folders never trusted interactively: Claude Code skips frontmatter hooks there (the review stage's rules still apply)     |
| `guard-bash` (Bash, every session)                                                                               | Advisory             | The literal forms of remote writes, releases, hook bypass, agent sign-off, history rewrites (ask)                            | A script the agent writes and runs, a command built from variables, an alias set before the session                       |
| `AGENTS.md`, skills                                                                                              | Advisory             | Everything else, including off-limits paths in interactive sessions                                                          | —                                                                                                                         |

Every guard fails closed: malformed input or an error is a deny, and each is registered with
`"onFailure": "block"` (Claude Code 2.1.295 or later). Both settings files pin
`"disableAllHooks": false`, which wins over user settings. A contributor's
`.claude/settings.local.json` can still turn hooks off in their own interactive sessions; pipeline
stages are not affected (their `--settings` file takes precedence).

`guard-bash` is the only guard that reads shell text, and it is advisory by design. It does not get
new rules without a reproduced incident; a gap that needs a shell parser is closed in a stronger
layer instead (the environment, a stage permission, the credentials).

## Approval boundary

A gate involves three acts: the stage asks for a transition (its status and `gate-summary.md`), the
human decides, and the runner applies the decision. The runner always applies only a valid decision:
only a `PASS` can be approved, every Ask-first path needs consent, text typed during a stage is never
a decision, and an empty or unknown reply changes nothing.

Who supplied the decision is a different question:

| How the run is driven                 | Where the reply comes from                                             | Kind                                                                                                                                                     |
| ------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `run.mts <N>` in a terminal           | The runner reads its own terminal; no agent session is running         | Trusted to the extent the terminal is the human's                                                                                                        |
| `/ds-run-pipeline <N>` in Claude Code | The session asks the human, then runs `run.mts <N> --decide "<reply>"` | Advisory: the instructions say to pass the reply verbatim, and Claude Code shows the call, but nothing stops the session from sending a reply of its own |

A relaying session can also write the runner's state files: only stage sessions are denied them.
Claude Code gives a hook no way to tell a human's answer from an agent's tool call, and a forced
permission prompt on `--decide` would add a second prompt to every gate without closing the
state-file route.

So Phase 1 keeps the relay as it is, with the human watching the session, and the terminal remains
the trusted path. Before any gate unlocks a privileged action (a push, a PR), approval must come
only from a channel the agent cannot drive: [phase-2.md](phase-2.md).

## Credentials and execution

Agent sessions run as the developer, with the developer's credentials: the `gh` login, the git
credential helper and SSH agent, and any npm token in `~/.npmrc`. The harness does not change them.
So what an agent could do at worst is what those credentials allow, minus the policy layers above:

| Route                         | Stage sessions                                                                                                     | Interactive sessions                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `git push`                    | Not on any allowlist; `guard-bash`; the session push block; a remote branch is a red flag                          | `guard-bash`; the human sees the call              |
| GitHub API writes (`gh`, MCP) | Only `gh … view/list` and `gh api --method GET` prefixes are allowed; `guard-bash` checks the method; no MCP tools | `guard-bash`, `guard-mcp`; the human sees the call |
| `npm`/`yarn publish`          | `guard-bash` on stages that may run `yarn`                                                                         | `guard-bash`                                       |
| Code an allowed command runs  | The push block only; nothing stops an API write from such code                                                     | The human                                          |

Known limits, accepted for Phase 1 (a human watches every run):

- A stage that may run `yarn` or tests can run code that writes to GitHub with the developer's
  token, or rewrites the runner's state files.
- A relaying session can answer a gate itself or edit the run state.
- Off-limits paths and the harness itself are protected only by instructions in interactive
  sessions (stages deny them by rule).
- Other agents (Codex, pi) read `AGENTS.md` and the skills but run none of the hooks.
- Claude Code's native sandbox is not used.

## Skills

Create and edit skills only in `.agents/skills/<name>/`. The SessionStart hook runs
`node agent-harness/scripts/sync-skills.mts --fix`, which links each skill into `.claude/skills/` and
adopts a skill another agent created in its own folder. DT-DDS skills are `ds-<name>`, so a
contributor's personal skill cannot shadow one (in Claude Code the personal skill wins a name
clash).

### Reviewers

Each reviewer is a skill plus a read-only wrapper in `.claude/agents/`. `ds-code-review` dispatches
them in parallel (`diff <N>`) and picks the lenses from the changed files; humans run them in audit
mode. Each check has one owner; the others list it under "Referred to other lenses".

| Skill (wrapper)                            | Owns                                                                                                                              | Audit mode                            |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `ds-spec-conformance` (`ds-spec-reviewer`) | README, RFC and stories against the code, including keyboard tables; story coverage                                               | `audit <pkg>`                         |
| `ds-api-review` (`ds-api-reviewer`)        | Exports and types, naming against the library, state model, API conventions, `@dt-dds/*` dependencies, breaking-change candidates | `audit <pkg>` / `audit all`           |
| `ds-a11y-review` (`ds-a11y-reviewer`)      | WAI-ARIA APG and WCAG 2.1 AA, ARIA and focus claims, a11y tests; the component-to-pattern map                                     | `audit <pkg>` / `audit family:<name>` |
| `ds-token-audit` (`ds-token-auditor`)      | Literals, token tier, role misuse, token gaps, theme bypasses                                                                     | `audit <pkg>` / `audit all`           |

`test-design-reviewer` runs inside `ds-code-review` on changed tests.

### Third-party skills

Third-party skills are installed with the skills CLI at project scope, pinned to a full commit SHA,
never from HEAD:

```bash
DISABLE_TELEMETRY=1 npx --yes skills@1.7.0 add "<owner>/<repo>#<full-sha>" --skill <name> -a universal -a claude-code -y
```

- `-a universal -a claude-code` puts the canonical copy in `.agents/skills/<name>` and a relative link
  in `.claude/skills/<name>`. With a single `-a`, the CLI copies instead of linking.
- `skills-lock.json` records the source, the pinned SHA, the skill path and a SHA-256 of the files.
  Licences are in `.agents/THIRD_PARTY_NOTICES.md`. Never add a file inside an installed skill
  folder: its content hash would no longer match.
- Restore: `npx skills@1.7.0 experimental_install` writes `.agents/skills/` only; the SessionStart
  sync creates the `.claude/skills` links.
- Upstream names are kept, because renaming breaks the lock.
- To bump a skill, run `add` again with the new SHA, after reviewing
  `gh api --method GET repos/<owner>/<repo>/compare/<pin>...<new>` and passing the security-audit gate
  below again. `npx skills update` only reinstalls the pinned SHA (a repair, never a bump). Run it
  from an agent session: from a plain terminal it also links the skill into every agent it detects
  on the machine.

The security-audit gate runs per skill, before approval:

1. The partner audit (skills.sh: Gen Agent Trust Hub, Socket, Snyk, sometimes ZeroLeaks). Telemetry
   is off, which also turns off the CLI's audit table, so query it directly:
   `curl -s "https://add-skill.vercel.sh/audit?source=<owner>/<repo>&skills=<name>"`. Any
   `medium`, `high` or `critical`, or Socket `alerts > 0`, stops for a human decision. The audit is
   keyed by skill name, not commit: if `analyzedAt` is older than the pinned commit, mark it "audit
   predates pin".
2. The harness checks: scripts, instructions fetched over the network at run time, hook installers,
   GitHub-write instructions, conflicts with `AGENTS.md`, context cost.

| Skill                  | Pin                                             | Licence                                                                    | Audit Gen · Socket · Snyk (analyzed)                                      | Scripts                                              | Network fetch | Hooks | GitHub writes | AGENTS.md conflict                                                                                                     | Words                                    | Approved   |
| ---------------------- | ----------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------- | ------------- | ----- | ------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ---------- |
| `grilling`             | mattpocock/skills `85f83d3` (2026-08-20 10:34Z) | MIT                                                                        | safe · safe (0 alerts) · low (2026-08-20 14:34Z, after the pin)           | none (`agents/openai.yaml` = Codex display metadata) | none          | none  | none          | none                                                                                                                   | 319                                      | 2026-09-25 |
| `test-design-reviewer` | citypaul/.dotfiles `8f1ebbc` (2026-08-09)       | MIT (root licence; GitHub shows NOASSERTION because of its scope preamble) | safe · safe (0 alerts) · low (2026-09-23; folder unchanged since the pin) | none                                                 | none          | none  | none          | none; rates First (test-first evidence), which is informational for human-authored branches (AGENTS.md: humans choose) | 608 + 166 (`references/source-notes.md`) | 2026-09-25 |

### Vendored reference files

The CLI cannot place files inside another skill, so these are copied unmodified with
`gh api --method GET …/contents/<path>?ref=<sha>`, with `LICENSE` beside them and blob SHAs checked
with `git hash-object`. The same security-audit gate applies; the audit is the parent skill's.

| Files                                                                                   | Into                                                                    | Source pin                                                          | Licence                                                                  | Audit (parent skill)                                                               | Harness checks                                                                                                                     | Words                   | Approved   |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------- |
| `WCAG.md`, `A11Y-PATTERNS.md`                                                           | `ds-a11y-review/references/vendor/addyosmani-web-quality-skills/`       | addyosmani/web-quality-skills `c6b06ad` (2026-08-24)                | MIT                                                                      | `accessibility`: safe · safe (0 alerts) · low, + ZeroLeaks low (2026-09-14)        | clean; page-level items (skip link, page title) are outside component scope                                                        | 1344 + 697              | 2026-09-25 |
| `state`, `composition`, `types`, `as-child`, `polymorphism`, `data-attributes` (`.mdx`) | `ds-api-review/references/vendor/vercel-components.build/` (+ `NOTICE`) | vercel/components.build `787c75a` (2026-02-12; HEAD tree identical) | Apache-2.0 (short-form `LICENSE`; full text in `THIRD_PARTY_NOTICES.md`) | `building-components`: safe · safe (0 alerts) · low, + ZeroLeaks safe (2026-09-15) | clean; conflicts documented, not edited: `type` vs `interface`, Tailwind vs Emotion, `npm install @radix-ui/*` (needs an ADR here) | 6154 (loaded on demand) | 2026-09-25 |

The Vercel composition rules (`vercel-labs/agent-skills`, no repo licence) are only linked from
`ds-api-review/references/api-conventions.md`, pinned at `a5343bd`; no text is copied.

## Extending the harness

| To add                                | Change                                                                                               | And test with                                                        |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| A stage, or a lane step               | `config/stages.json` and its skill in `.agents/skills/`                                              | `stage-table.test.mts`, a `tests/run-*.integration.test.mts` case    |
| A tool or command a stage may use     | The stage's capabilities in `stages.json`, or the rule lists in `scripts/runner/adapters/claude.mts` | `stage-table.test.mts`, and a real-CLI scenario for a new rule shape |
| A guard rule                          | The guard in `hooks/`, only for a reproduced incident                                                | A unit case that fails first, plus an allowed twin                   |
| A hook or a settings key              | `.claude/settings.json` or `.claude/pipeline.settings.json`, the handler in `hooks/`                 | `registration.test.mts`, `check-hooks.mts`, a real-CLI scenario      |
| A question about what a model chooses | A case in `evals/`                                                                                   | The eval itself ([testing.md](testing.md#behavioural-evals))         |
