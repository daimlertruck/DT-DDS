# Agentic workflow runbook

The agentic workflow takes a `status:ready` issue to a verified local branch and a prepared pull
request. The runner (`agent-harness/scripts/run.mts`) runs each stage as its own Claude Code session
and stops after every stage for your decision. The rules agents follow are in
[`AGENTS.md`](../../AGENTS.md); the design is [ADR-0008](../adrs/0008-agentic-development-workflow.md),
and how the harness works is in [architecture.md](architecture.md).

## Before your first run

1. Install Claude Code 2.1.295 or later and log in. The stages run as Claude Code sessions, and the
   guards that stop agents from pushing or releasing are Claude Code hooks: other agents (Codex, pi)
   get the skills and `AGENTS.md`, not the guards.
2. Use Node 22.18 or later on the 22 line, or 24 or later (the root `engines`:
   `^22.18.0 || >=24`): the harness scripts and guards are TypeScript that Node runs directly. On an
   older Node the guards cannot start, and Claude Code denies every call they guard.
3. Log in to GitHub (`gh auth login`): the stages read issues and PRs.
4. Install dependencies: `yarn --frozen-lockfile`.
5. If your issue adds or changes stories: once per machine, run
   `yarn workspace @dt-dds/docs playwright install chromium`. The implement and verify stages render
   each changed story in Chromium.
6. Check that the guards work: `node agent-harness/hooks/check-hooks.mts` prints `ok` for every hook.
7. Open Claude Code in your checkout once (`claude`) and accept the trust prompt. In a folder you
   have not trusted, Claude Code skips the reviewer agents' read-only guard without a warning.
8. Leave `CLAUDE_CODE_SUBAGENT_MODEL` unset: it overrides every stage's model, and the runner
   refuses to start while it is set.

On Windows, enable symlinks before you clone (`git config --global core.symlinks true` and
Developer Mode): the skill links in `.claude/skills/` and `scripts/AGENTS.md` are symlinks.

## Run an issue

1. Claim the issue: assign yourself and change `status:ready` to `status:in progress`. The runner
   refuses to start until the issue is claimed.

   ```bash
   gh issue edit <N> --add-assignee @me --remove-label "status:ready" --add-label "status:in progress"
   ```

2. Start from a clean checkout: no uncommitted changes and no untracked files. An untracked file that
   appears during a run stops it.
3. Preview the run. This calls no model and writes nothing:

   ```bash
   node agent-harness/scripts/run.mts <N> --dry
   ```

   `<N>` is the issue number. The preview prints the lane, the reasons for it, the steps and the
   caps. An `escalate` lane stops here: a maintainer decides.

4. Start the run in one of two ways:

   - From Claude Code: in a new session, type `/ds-run-pipeline <N>`. The session shows you each
     gate and is told to pass your reply on verbatim. Starting that session with
     `claude --settings .claude/pipeline.settings.json` is optional and makes each relayed reply
     cheaper (Sonnet, claude.ai connectors off); the stages get these settings either way.
   - In a terminal: run `node agent-harness/scripts/run.mts <N>` and answer each gate at the prompt.

   In a terminal, the runner reads your reply itself. From Claude Code, the session relays it with
   `run.mts <N> --decide "<reply>"`: Claude Code shows you that call, but nothing technical stops a
   session from sending a reply you did not give. Watch the session, or use the terminal for a gate
   you want to answer yourself ([Approval boundary](architecture.md#approval-boundary)).

5. Answer each gate (see [Gate replies](#gate-replies)). Read the stage's summary, and open the
   artifact in `.local/agent-harness/work/<N>/` when you need the detail.
6. When you approve G7, the runner commits the run's record, `docs/agent-harness/runs/<N>.json` (cost,
   tokens and gate decisions; see [its README](runs/README.md)), on the feature branch. Then
   open `.local/agent-harness/work/<N>/pr-draft.md` and run its push and `gh pr create` commands.
7. Review comments on the open PR: `/ds-resolve-pr-comments <PR>` works through the threads locally,
   as `fixup!` commits, and drafts the replies for you to post. Push the fixups as they are; the
   autosquash waits until just before the merge.
8. After the PR is merged and you have done the post-merge checks, record the run and delete its
   work dir: `/ds-run-pipeline <N> close`, or in a terminal:

   ```bash
   node agent-harness/scripts/run.mts <N> --close
   ```

   It refuses while the PR is open. It ends with a `gh issue comment` command that posts the run's
   summary on the issue; run it.

## Stop and resume

| You want to                                                  | Do                                                                                                                                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pause at a gate                                              | Reply `stop`.                                                                                                                                                                   |
| Resume after `stop`, an interrupt (Ctrl-C) or a failed check | Start the run again with the same command (`/ds-run-pipeline <N>` or `node agent-harness/scripts/run.mts <N>`). Approved steps are skipped and the pending gate is shown again. |
| Start the issue over, or run it again after G7               | Add `--fresh`. The earlier work dir moves to `.local/agent-harness/work/<N>.<UTC time>`.                                                                                        |

## Lanes and gates

The runner picks the lane from the issue's labels and template fields; `--dry` shows why. When the
rules are unsure, one short model call may raise the lane, never lower it. Caps are token cost at
list price, per run.

A lane is a list of steps, each one Claude Code session that ends at a gate. Lane 0 runs its one
stage in two steps; the other lanes run one step per stage.

| Lane       | When                                                                                                                                          | Gates                                                              | Cap |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --- |
| 0 Express  | `type:bug`, `type:chore` or `type:docs` whose Possible solution states the change, only in manifest, config or doc files, in up to 3 packages | G1+G3 (plan and exact diff), G7 publish (PR draft)                 | $3  |
| 1 Standard | Other bugs and enhancements in up to 2 packages, and docs or manifest changes of any size                                                     | G1 intake, G3 plan, G4 implement, G5 verify, G6 review, G7 publish | $10 |
| 2 Full     | A feature with an approved RFC; API, visual or a11y work; behaviour across 3 or more packages                                                 | Lane 1 plus G2 architecture                                        | $30 |
| Escalate   | A breaking change or deprecation, `needs:rfc`, a feature without an RFC, an enhancement that changes the public API, `type:question`          | None: a maintainer decides                                         | —   |

Changing the lane after G1 (`lane:N`) is a scope decision and is recorded.

## Gate replies

| Reply                                           | Effect                                                                                        |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `approve`                                       | Accept the stage and run the next one.                                                        |
| `revise: <instruction>`                         | Run the same stage again with your instruction.                                               |
| `loop: <instruction>`                           | From G4 to G7: a code or scope change. It is recorded and the run goes back to implement.     |
| `lane:<0\|1\|2\|escalate>`                      | Change the lane.                                                                              |
| `stop`                                          | Pause the run; the gate stays pending (see [Stop and resume](#stop-and-resume)).              |
| `approve; consent: <path> (<name>, maintainer)` | At the first gate, for each Ask-first path the plan touches (`AGENTS.md` → Off-limits paths). |

Only a `PASS` can be approved. A `PARTIAL`, `BLOCKER` or `FAIL` status needs `revise:`, `loop:`,
`lane:N` or `stop`. Anything else, including an empty reply, is never taken as an approval.

## What you do between gates

- Before G1, you can settle open questions with the `grilling` skill: reply `stop`, run `/grilling`
  in a Claude Code session on `.local/agent-harness/work/<N>/context-bundle.md`, and write the
  decisions to `.local/agent-harness/work/<N>/intake-decisions.md`. Resume, then answer G1 with
  `revise: read intake-decisions.md`.
- Before you approve G5, work through its Storybook checklist: run Storybook
  (`cd apps/docs && yarn dev`, then http://localhost:6006), check each item, and write each result in
  `validation-report.md`. If the report lists tool versions, check them with `npm view <pkg> version`.
- For a commit, rebase, reset or install you make outside a stage, add a row yourself to the Human
  actions table of `.local/agent-harness/work/<N>/run-log.md` before your next reply. Name the
  commits that changed in that reply (`revise:` or `loop:`), so the next stage knows.
- The runner folds the run's own `fixup!` commits before the PR draft. If it reports that it could
  not, reply `stop` at G5 and run `git rebase -i --autosquash origin/main` (`git rebase --abort`
  undoes a conflict). Record it in the run log, resume, and answer G5 with `revise:`.
- You never add `Signed-off-by` by hand: the husky `commit-msg` hook adds yours to every commit,
  including the agents' commits.

## Options

| Option                       | Use                                                        |
| ---------------------------- | ---------------------------------------------------------- |
| `--lane <0\|1\|2\|escalate>` | Override the classifier.                                   |
| `--budget-usd <usd>`         | A lower token-dollar cap for this run.                     |
| `--tool-calls <n>`           | Raise every later session's tool-call cap to n (recorded). |
| `--fresh`                    | Start over; the earlier work dir moves aside.              |
| `--issue-file <path>`        | Read the issue from a JSON file instead of GitHub.         |
| `--record-out <path>`        | Write a JSON summary of the run.                           |

## When a run stops

| Message                                                                                   | What to do                                                                                                                                                               |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Red flag or `clean-tree` failure listing an untracked file or folder                      | Remove it from the checkout, then resume.                                                                                                                                |
| Red flag about a commit on `main`, a remote branch, or a stage that changed tracked files | Inspect before resuming; the run stopped to protect the branch.                                                                                                          |
| `--budget-usd … spent`                                                                    | Resume with a higher `--budget-usd` (the lane cap still applies).                                                                                                        |
| `run budget: lane … cap … reached`                                                        | Resume with `--lane <N>` for a higher lane's cap (recorded as your override), or end the run.                                                                            |
| A stage's tool calls denied with `run budget:`                                            | The step hit its tool-call cap. Answer the gate with `revise: …`: a re-run gets its own allowance. If the cap is too small for the step, resume with `--tool-calls <n>`. |
| Loop limit (3 loops at G5 or 2 at G6)                                                     | The approach is likely unsound: rethink it with `lane:N` or a new plan.                                                                                                  |
| `check-hooks.mts failed`                                                                  | Fix the hook or your Node install, then resume.                                                                                                                          |
| Interrupted (Ctrl-C)                                                                      | Resume. Usage of the interrupted session is still recorded.                                                                                                              |
| Run already finished                                                                      | Use `--fresh` for a new run.                                                                                                                                             |

## Other commands

Type these in a Claude Code session in the repo:

| Command                                          | Use                                                                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `/ds-code-review [N]`                            | Review a branch before you push it (Lanes 1 and 2 do this at G6).                                            |
| `/ds-resolve-pr-comments <PR>`                   | Work through a PR's open review threads locally: fixes as `fixup!` commits, replies drafted for you to post. |
| `/ds-spec-conformance audit <package>`           | Audit a component's README spec against its code, RFCs and stories.                                          |
| `/ds-api-review audit <package\|all>`            | Audit a component's public API.                                                                              |
| `/ds-a11y-review audit <package\|family:<name>>` | Audit accessibility against the WAI-ARIA pattern.                                                            |
| `/ds-token-audit audit <package\|all>`           | Audit design-token use.                                                                                      |

## Changing the harness

Harness maintainers: start at [`agent-harness/README.md`](../../agent-harness/README.md) (the
commands and the rules for changing the harness), then [architecture.md](architecture.md) and
[testing.md](testing.md). The guardrail eval asks agents to attempt forbidden actions, so only a
human runs it ([Behavioural evals](testing.md#behavioural-evals)).
