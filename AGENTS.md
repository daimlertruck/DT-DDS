# AGENTS.md — DT-DDS

Agent-agnostic contract for AI agents in this repo. Skills in `.agents/skills/` resolve its sections
**by heading name**: keep headings stable. CONTRIBUTING.md stays the humans' source of truth for
process; this file encodes it for agents and records where CONTRIBUTING is stale.

## Project overview

- Design system for Daimler Truck. Yarn classic workspaces + Turborepo. Tool and
  dependency versions: read them from the `package.json` files; agent docs name none.
- 39 independently versioned `@dt-dds/react-*` packages (`packages/react-packages/*`), plus
  `@dt-dds/themes`, `@dt-dds/fonts`, `@dt-dds/icons`, and the umbrella `@dt-dds/react`
  (`packages/dt-dds-react`, `export *` of everything). Perpetual `beta` pre-release, public npm.
- Docs: Storybook in `apps/docs` (Vite aliases to package sources).
- Layering: themes/icons/box → core (owns `Provider`) → primitives → composites → umbrella.
  No upward imports. Every `@dt-dds/*` runtime import is declared in that package's `package.json`
  with the exact workspace version.

## Precedence

- This file and repo conventions override personal/global agent configs (e.g. Jest for package
  tests, Vitest only for `apps/docs` story tests; `interface` for object shapes; `as const` objects
  over enums; no mutation tooling).
- **Trial mode** (below) supersedes any skill instruction that pushes, comments, labels or opens PRs.

## Trial mode (human-in-the-loop)

- **Local only.** Agents may read remote state (`git fetch`, `gh issue view`, `gh pr view`, `gh api`
  GET / GraphQL queries) but never write it: no `git push`, no PR or issue writes, no labels, no
  `/take`, no `gh api` mutations. The agent prepares the exact command + text; the human runs it.
- **Gates.** Pipeline runs stop at every stage gate for explicit human approval (`approve` /
  `revise: …` / `loop: …` / `lane:N` / `stop`; Ask-first paths need `approve; consent: …` per path).
  Critical gates that stay human after the trial: G1 intake, G3 plan, G6 review, G7 publish
  (push + PR). Candidates to automate later: G2, G4↔G5 loop, G5. A session that relays a gate
  passes the human's reply to `run.mts --decide` verbatim and never answers a gate itself.
- **Commits** on the feature branch are allowed. History rewrites need explicit human approval:
  any rebase, any `reset` that moves the branch, `commit --amend`, `checkout -B`, `branch -D`. The one
  exception: run.mts autosquashes the run's own fixups (`autosquash.mts`: no PR, no remote branch,
  tree unchanged, abort on conflict).
- **Cleanup:** a stage deletes the files its run created (a probe test) with
  `node agent-harness/scripts/git/clean-run.mts <path>`; it refuses tracked, ignored and pre-existing paths.
- Work artifacts live in `.local/agent-harness/work/<N>/` (gitignored); never stage or commit them.

## Stack & commands

- Install: `yarn --frozen-lockfile` (re-run after switching branches with different lockfiles).
- **Verify gate** (mirrors required checks `check-fixups`, `lint`, `tests`, `build`):
  1. `git fetch origin main && git merge-base --is-ancestor origin/main HEAD` (branch up to date)
  2. `yarn turbo run lint test build --filter='...[origin/main]'` (changed packages + dependents;
     a lockfile change can widen it to all; a root `package.json` change alone selects only the root
     package). Files outside every workspace select only the root package, which runs nothing: if
     `--dry=json` shows 0 tasks, run CI's `yarn lint`, `yarn test`,
     `yarn turbo run build --filter='./packages/*'`. CI checks none of those files
     (`turbo/generators/**`, root `scripts/`): run what you change. **Typecheck = `build`** (tsup
     `dts`): only what `index.ts` imports; tests and stories are not type-checked.
  3. `yarn check-pkg-deps`
  4. `npx --no -- commitlint --from origin/main --to HEAD`
  5. `git log --format=%s origin/main..HEAD | grep -E '^(fixup|amend)! '`: informational (see below).
- Tests import sibling packages from `dist/` — always test through turbo (it builds `^deps`), never a
  bare `yarn workspace <pkg> test` against stale builds.
- **Story render check** (new or changed stories): `yarn workspace @dt-dds/docs test-storybook
<Name>.stories` renders each matching story in Chromium (CI job `storybook-tests`, not required).
  A Storybook build passes a story that throws. First run on a machine: `yarn workspace
@dt-dds/docs playwright install chromium`.
- **VRT** (ADR-0009): build Storybook (`yarn turbo run build --filter='./packages/*'`, then
  `yarn workspace @dt-dds/docs build`), then `yarn workspace @dt-dds/docs vrt [--grep <story id or
  file path>]`. Playwright in its Docker image (Docker required), Chromium, Default brand; report
  `apps/docs/test-results/vrt-report/` and `vrt.json`; CI workflow "Visual Regression" (not
  required). Agents read the report; only humans run `vrt:update`.
- The Bash tool runs zsh: quote every glob and bracket (`'--include=*.tsx'`,
  `--filter='...[origin/main]'`); unquoted, zsh aborts with `no matches found` and runs nothing.
- Storybook, tokens and snapshot commands: see the directory guides below.
- **e2e gate:** not configured.
- **Run the app:** Storybook `cd apps/docs && yarn dev` → http://localhost:6006.
- Not reproducible locally: `blackduck-scan` (required in CI), SonarQube (advisory), CodeQL.

## Format check

TS/TSX formatting is enforced inside `lint` (`prettier/prettier: error`); fix it with
`yarn workspace <package> lint --fix` (root `yarn format` rewrites the whole repo). Markdown is not
checked in CI; `npx prettier --check <changed .md files>` is advisory.

## Branch & commit policy

- Base branch `main`. Branch name `{type}/{N}/{kebab-slug}` (N = GitHub issue number, bare).
  Merge method: rebase only (ruleset). Never push `main`; direct pushes are blocked for humans.
- **Conventional Commits**, header ≤ 50 chars, body lines ≤ 72 (CONTRIBUTING; commitlint would
  allow 100). Imperative present tense. Atomic commits; every commit green (CONTRIBUTING:
  "commits should never crash the application"); tests in the same commit as the change.
- **Commit subjects are release input:** on `main` each conventional subject becomes a changelog
  line and releases the packages its files touch (+ dependents) — `docs:`/`test:` included; `!` or
  `BREAKING CHANGE:` in the subject releases **all 43 packages** (never without maintainer approval).
  Details: `packages/changeset-conventional-commits/AGENTS.md`.
- **Fixes to committed work:** `git commit --fixup=<sha>` (`--fixup=amend:<sha>` to change the
  message). No PR yet: run.mts folds the run's own fixups before the PR draft (Trial mode); when it
  refuses, the human autosquashes and rebases (`git rebase -i --autosquash origin/main`), then
  pushes. PR open: push the fixups as they are, so reviewers see the change; the human autosquashes
  before merge (`check-fixups` catches `fixup!` only, not `amend!`). Agents prepare and check every
  other rewrite; they never run one.
- **DCO — only the human signs off.** Agents add no trailer (no `Co-Authored-By`, no
  `Signed-off-by`) and never pass `-s`. The husky `commit-msg` hook (commitlint + DCO) appends the
  human's `Signed-off-by` **last**. No `--no-verify`.
- Pre-commit hook runs `check-pkg-deps` (internal versions must match workspace versions).
- PR (prepared by the agent, opened by the human): title `{type}: {description}` (`[WIP] ` prefix
  while draft), body from `.github/pull_request_template.md` with no attribution line,
  **`Closes #N`** in the Issue section, Live Preview left for CI.

## Tooling / MCP

- **Tracker & forge:** GitHub via `gh` CLI (repo `daimlertruck/DT-DDS`). Read-only use in Trial mode.
  A GitHub MCP server, if configured, is read-only too: the MCP guard denies every write tool.
- Design: Figma links in issues/RFCs. Figma MCP: optional, off by default, **read-only** when on
  (the MCP guard allows only its read tools). `get_design_context` code (React + Tailwind) is
  reference only: implement with Emotion and theme tokens.
- Browser automation: **none configured** → visual checks are the human's, in Storybook (agent
  records `HUMAN-RUN-PENDING` + a checklist). Guarded CI, release or hook behaviour gets a human-run
  simulation (`ds-verify-changes/references/human-run-simulation.md`); the agent runs the rest.
- Static analysis: CodeQL alerts readable via `gh api repos/daimlertruck/DT-DDS/code-scanning/alerts`
  (GET). SonarQube runs only in CI and is not a required check.
- Storybook MCP: `apps/docs` loads `@storybook/addon-mcp` (it needs Storybook 10.3 or later: check
  `apps/docs/package.json`); no agent is configured to use it yet. VRT: see Stack & commands; the
  verify stage does not run it yet (follow-up issue).
  Update this section and the stage skills as the ADR-0008 decision 8 prerequisites land.

## Architecture decisions

- Sources, in order: `docs/adrs/` (ADRs; "Decision outcome" sections bind), `docs/rfcs/` (component
  change decisions — each RFC is a delta; read the component's whole chain), and the component spec
  `packages/react-packages/<pkg>/README.md` (living spec; template
  `turbo/generators/new-component-package/templates/README.md.hbs`).
- Established conventions (treat as decided, no ADR needed): Emotion + `Provider` theming; token
  pipeline (Figma export → `build:theme`); README as component spec; perpetual beta; hybrid component
  creation (ADR-0002); Downshift for select (ADR-0007).
- Not binding (stale ADR statements): ADR-0001 "publish to Artifactory"; ADR-0003 "SSO-protected /
  versioning add-on"; ADR-0005 "Coverity".
- Routing: new component or new feature (new public API) → RFC, a **separate PR**, approved before
  work (`needs:rfc`). Non-breaking improvements/bugs → no RFC. New tool/architecture/pattern → ADR.
  Breaking change, deprecation, or unclear feature-vs-enhancement → STOP, maintainer decides.

## Testing strategy

- Jest + React Testing Library + `@testing-library/user-event`, jsdom; config `packages/jest-config`.
  Stories are tested apart, in Chromium (`test-storybook`, Stack & commands).
- Location: colocated `src/<Component>.test.tsx`; hooks/utils in `__tests__/`. Only `.test.ts(x)`.
- Coverage floor per package 75/70/75/75 (statements/branches/functions/lines) — never lower it.
- Prefer role queries + `user-event` for new tests (note `configure({ defaultHidden: true })`).
  One test per acceptance criterion and per spec keyboard row; titles follow the file's style
  (usually `it('should …')`).
- Snapshots (`@emotion/jest`) change only intentionally, reviewed, via `test:update:snapshot`.
- **Agent runs: TDD is mandatory** (failing test first). Humans choose their own approach.

## Coding conventions

- TypeScript strict. `interface` for object shapes; string-literal unions / `as const` objects over
  enums; named exports for components and utilities; arrow-function components; compound-component
  pattern for composable components.
- Styling: Emotion. `$`-prefixed styling-only props + `shouldForwardProp`. **Never hardcode
  hex/px** — **component tokens first** (`theme.components.<group>.<key>`), **semantic tokens as
  fallback** (`theme.palette.*`, …); details in `packages/themes/AGENTS.md`. Missing token → STOP and
  report; never invent one.
- Accessibility: jsx-a11y clean; follow WAI-ARIA APG for the pattern; the spec's keyboard table is
  the contract.
- Imports: `import-x/order` groups (react first, `@emotion/**` after externals, `@dt-dds/**`
  internal), alphabetised, blank line between groups.
- Public types (props, unions) exported from the package `src/index.ts`.

## Definition of Done

Blocking rules (ds-code-review may cite them):

1. Acceptance criteria covered by executed tests.
2. Public API change → spec README updated in the same PR, matching TS (names, required, defaults);
   first RFC-driven change to a legacy README migrates it to the template.
3. Implementation deviating from the approved RFC → flagged, not silently shipped.
4. One story per States & Variants row for new/changed states (CSF3 `StoryObj`).
5. Every `@dt-dds/*` import declared with the exact workspace version; public types exported.
6. No `!`/BREAKING subject without maintainer approval; no edits to off-limits paths.
7. Verify gate green with fresh evidence.

## Work intake & routing

- Lifecycle labels: `status:triage` → `status:backlog` → `status:ready` → `status:in progress` →
  `status:in review`. Types: `type:bug|feature|enhancement|docs|chore|question`; areas:
  `area:component|themes|ci/cd|dx`; priority `priority:p0`–`p3` (p0 = library-breaking bug **or**
  critical/architecture change); `needs:rfc`. (CONTRIBUTING's spaced label names are stale.)
- Pipelines only start from `status:ready` issues. Pickup (assign + label swap, or `/take` once
  #215 ships) is done by the human in Trial mode.
- Facts the issue states with a file:line, a command or a SHA are inputs, not claims to re-prove.
- OKR work: title `[OKRn][KRn][Mn]: …`, OKR milestone, sub-issue of the KR parent issue.
- Maintainer-only: validity, priority, Backlog→Ready, RFC/ADR approval, design sign-off.

## Run lanes & budgets

`node agent-harness/scripts/run.mts <N>` runs the pipeline in a lane (0 Express, 1 Standard, 2 Full,
Escalate) that `lane.mts` picks and `agent-harness/config/stages.json` caps; `--dry` shows why. A lane
change after G1 is a scope decision. A `run budget` denial ends the stage: report what is left.

## Off-limits paths

Never hand-edit (owner in brackets): `packages/themes/src/themes/**` [build:theme],
`packages/themes/src/tokens/**` [Figma export; only in token-import tasks], `.changeset/**`
[release CI — never add any file there: every `.md` except README.md is read as a changeset], `**/CHANGELOG.md` [changesets], `**/__snapshots__/**` [test:update:snapshot;
VRT baselines in `apps/docs/vrt/__snapshots__/`: `vrt:update`, humans only],
`packages/icons/src/codes.ts`, `yarn.lock` [yarn], README `PACKAGES_TABLE_*` region [CI].
Ask first: `.github/**`, `.husky/**`, `turbo/generators/**`, `scripts/**`,
`packages/changeset-conventional-commits/**`. Never run `yarn changesets:*`, `changeset
version|publish`, `npm publish`, `yarn release`, or `git tag`.

## Known landmines

- CONTRIBUTING stale spots: swapped auto-labels (139/148), package-level `.mdx` (the stories glob
  skips it), release section (`release:` message, `yarn publish`), 2-approval rule (ruleset
  enforces 1 code-owner).
- `main` CI is always cancelled by the release commit; the PR is the last verified point.
- `.changeset/spotty-times-nail.md` releases app-header on every push (removal pending).

## Directory guides

Nested `AGENTS.md` files (each with a `CLAUDE.md` stub) add rules for their subtree: `apps/docs/`
(Storybook) · `packages/react-packages/` (components, specs, stories, tests) ·
`packages/themes/` (tokens, token tiers) · `packages/changeset-conventional-commits/` = `scripts/`.

## Harness maintenance

- **`AGENTS.md` files are the source of truth** for agent instructions. `CLAUDE.md` files only import
  them (`@AGENTS.md`) plus Claude-specific runtime notes — never put shared rules there.
- **Skills:** create and edit only in `.agents/skills/<name>/`; tool dirs (`.claude/skills/`, …)
  hold per-skill links kept in sync by `node agent-harness/scripts/sync-skills.mts --fix`. Skills we
  author are `ds-<name>`; third-party ones keep their upstream name, pinned
  (`docs/agent-harness/architecture.md` → Skills).
- `.local/` (run state, work dirs, local run records) is gitignored: never stage it (guard-bash
  denies it).
- Changing the harness (`agent-harness/`, `.claude/`): read `agent-harness/README.md` → Changing the
  harness first (TypeScript rules, the checks to run, when the guardrail eval is due).

## Ask a maintainer

Board automation rules; ADR approval flow; design review (Jira "Design Review"); feature vs
enhancement edge cases; anything touching release tooling or workflows.
