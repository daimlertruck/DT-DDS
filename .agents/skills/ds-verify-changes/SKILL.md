---
name: ds-verify-changes
description: 'Use as DT-DDS pipeline stage 5 (verify), or standalone on any branch: run the local equivalents of the required CI checks with fresh evidence, confirm each AC behaviour, and hand what the agent cannot run to the human.'
argument-hint: '[ISSUE-NUMBER]'
---

# Verify changes

Run the quality gates and record the result (commands: AGENTS.md → Stack & commands). Standalone on
a human branch, write the report to `.local/agent-harness/work/<branch-slug>/`. In a pipeline run, also read
`intake-decisions.md` and `run-log.md` in `.local/agent-harness/work/<N>/` when they exist: the G1 decisions say
what must be verified and how, and the run log holds each gate's `revise:` instruction.

## Status line (pipeline runs)

run.mts sets the status lines (`PASS`, `PARTIAL: …`, `BLOCKER: …`). For this stage, a `FAIL`
verdict is `BLOCKER: verdict FAIL — <gates>` (the human answers `loop:`).

## Procedure

1. **Environment.** No conflict markers in `yarn.lock`; `yarn --frozen-lockfile` is a no-op;
   `git fetch origin main`.
2. **Up to date.** `git merge-base --is-ancestor origin/main HEAD` — the ruleset requires strict
   up-to-date branches. If behind, record `BEHIND-MAIN` and report (rebasing is the human's call);
   continue the other gates.
3. **Format check** (AGENTS.md → Format check): covered by lint for TS/TSX. For changed Markdown:
   `git diff --name-only --diff-filter=d origin/main...HEAD | grep -E '\.md$' | xargs -r npx prettier --check`
   — advisory; skip generated files (`CHANGELOG.md`, README `PACKAGES_TABLE_*` region).
4. **Verify gate** — run each and record exit code + failures:
   - lint + tests + build (typecheck): `yarn turbo run lint test build --filter='...[origin/main]'`.
     First record its task count: `yarn --silent turbo run lint test build --filter='...[origin/main]'
     --dry=json | jq '.tasks | length'` (without `--silent` yarn's banner breaks the JSON). Files
     outside every workspace select only the root package `//`, which has no tasks; on 0 tasks run CI's own
     commands instead (`yarn lint`, `yarn test`, `yarn turbo run build --filter='./packages/*'`) and
     record their task counts. A gate that ran 0 tasks is never a PASS on its own.
   - internal versions: `yarn check-pkg-deps`
   - commit messages: `npx --no -- commitlint --from origin/main --to HEAD`
   - sign-off, fixups and commit bodies: `node agent-harness/scripts/git/check-commits.mts` (read-only; a
     shell loop would be denied in a pipeline session). Every commit in `origin/main..HEAD` must
     have exactly one `Signed-off-by` — the human committer's — as its **last** trailer: any
     `BAD-SIGNOFF` line fails the gate. `fixups:` is informational. Commit
     bodies are team-facing: each `HARNESS-WORD` line is reworded (an `amend!` commit,
     `ds-commit-message`) or justified in the report.
   - **Story render check** when stories changed: `yarn workspace @dt-dds/docs test-storybook
     <Name>.stories` for each changed stories file; its per-story PASS is the evidence that a story
     renders (a Storybook build and its `index.json` pass a story that throws). A failing story is a
     `FAIL` gate. First run on a machine: `yarn workspace @dt-dds/docs playwright install chromium`.
   - Storybook build when `apps/docs` changed, or a Storybook checklist is handed over (its URLs come
     from the build): `yarn turbo run build --filter='./packages/*' && (cd apps/docs && yarn build)`
   - tokens changed: `yarn workspace @dt-dds/themes type-check` + `build:theme` diff is clean
5. **e2e gate:** not configured — record `N/A`.
6. **Behavioural confirmation.** Record one status per behaviour an AC names. Who runs each check
   follows from one question: **can the agent run it safely in a throwaway clone?**
   - **Yes → agent-run** (the default): CI's own commands, generators, scripts, and hook behaviour
     that no guard blocks. Run it in a throwaway clone when it writes beyond build output or needs a
     clean state: `node agent-harness/scripts/git/sandbox.mts create <name> --issue <N> --stage
     ds-verify-changes --purpose <what> --keep-until G5 --logs <paths in the clone>`. Record
     `PASS`/`FAIL` with fresh evidence, add an optional replay command for the human (nothing waits
     on it), then `sandbox.mts close <name>`: it keeps the declared logs in
     `.local/agent-harness/work/<N>/logs/<name>/` and deletes the clone. Keep it open only when a human checklist
     needs it; run.mts closes it after the G5 decision.
   - **No → `HUMAN-RUN-PENDING`**, only for one of these reasons, named beside the status:
     - **guarded:** it needs a command a guard blocks (release tooling, tags, pushes, hook bypass):
       write a **human-run simulation at attempt 1**, following `references/human-run-simulation.md`;
     - **remote or credentialed:** it needs a remote effect or credentials the agent does not have;
     - **judgement or a browser:** it needs a human eye (visual, design fidelity) or a browser (none
       is configured, AGENTS.md → Tooling / MCP). Write a **human checklist**: `cd apps/docs && yarn
       dev`, the story URLs/states to open, each `ACn` path to exercise (keyboard included), and —
       with `.local/agent-harness/work/<N>/assets/` — the design frames to compare. Before handing it over, take
       every URL from the build's `apps/docs/storybook-static/index.json` (never compose one), check
       each item's baseline in the static build, and for a docs-page item compare with what the
       story defines in `args`/`argTypes` and with the same tab of the baseline component. Fix an
       item whose baseline fails before the human sees it. Results are recorded per item, never inferred from a summary reply.
   - `NO-RUNTIME-SURFACE` + reason: nothing to exercise (pure type changes, docs).
   - A file you created in the checkout for a check (outside a sandbox) goes before you report:
     `node agent-harness/scripts/git/clean-run.mts <path>` (it deletes only what this run created).
   - After the human reports: `PASS (human-run <ISO time>)`, `FAIL (human-run <ISO time>)` or
     `INVALID (human-run <ISO time>)`, quoting the evidence (the checklist outcome, or the log lines).
   - `BLOCKED-BY-ENV` + named obstacle: nobody can produce the evidence before merge (for example,
     behaviour on the real CI runner on `main`). List it under Untested behaviors with the
     post-merge check.

   A check routed to the human because a guard blocks it is never run by the agent, in whole or in
   part.
7. **Release impact** (informational, feeds ds-code-review): list commit subjects and the packages each
   will release per AGENTS.md → Branch & commit policy; flag any breaking subject.
8. Record pass/fail per gate. Any FAIL → summarize and hand back to `ds-implement-plan`.

## Discipline: verification before completion (mandatory)

**No PASS without fresh evidence from this run.** Fresh means the same code, the same base and
the same version of every floating external tool the check runs (an `@latest` or unpinned
package such as a generator): record each such version beside its evidence, and treat a changed
version as stale evidence.

| Claim | Requires | Not sufficient |
|---|---|---|
| Lint clean | `turbo run lint` exits 0 | "should be fine" |
| Typecheck OK | `turbo run build` exits 0 (tsup dts) | lint passed |
| Unit pass | `turbo run test` reports 0 failures, coverage thresholds met | a previous run |
| Versions OK | `check-pkg-deps` exits 0 | package.json looks right |
| Commits OK | commitlint exits 0 and every commit has the human sign-off | hook ran once |
| Behavioural OK | agent-run evidence from this run, or `PASS (human-run …)` for a check routed to the human: the checklist confirmed, or the simulation log says PASS | every gate passed; the script looks right |
| Bug fixed | the original symptom's test now passes | the code changed |

Distinguish PASS / FAIL / HUMAN-RUN-PENDING / BLOCKED-BY-ENV / NO-RUNTIME-SURFACE / N/A honestly.
Environment gaps are not code failures.

## Output artifact: `validation-report.md`

Per-gate result with commands and quoted failures; release-impact table; the human checklist or
simulation section; final verdict `PASS` / `FAIL` from the blocking gates, with the behavioural
status beside it. G5 is clean only if no AC-linked behaviour is `HUMAN-RUN-PENDING` or
`BLOCKED-BY-ENV`.

Each pass rewrites the report for the current attempt; only the Attempt log carries history
(earlier attempts stay in `.local/agent-harness/work/<N>/snapshots/`).

REQUIRED closing section — **Attempt log** (append-only across passes): attempt # · verdict ·
failure signature · what the implement pass changed since the previous attempt (from `git log`).

REQUIRED closing section — **Untested behaviors**: behavior · named obstacle · what would verify it
(or "none"). Run any un-gated verification script this session and record its output.
