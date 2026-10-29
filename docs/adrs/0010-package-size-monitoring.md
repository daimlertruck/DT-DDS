# Monitor package size with a committed baseline and a non-blocking PR check

- Status: In Review
- Author: afreire-laptop
- Deciders: DT-DDS maintainers (MAINTAINERS.md)
- Date: 29 October 2026
- Decision due date: N/A

**Priority:** Medium

## Context and Problem Statement

Issue: #227, "Package size baseline captured + CI monitoring enabled (non-blocking)" ([OKR1][KR1],
milestone M3 of #222).

Nothing measures the size of DT-DDS packages. A change can add kilobytes to what adopters install
and bundle, and nobody notices until after the release.

Current state:

- There are 43 published `@dt-dds/*` packages. tsup builds 42 of them into ESM (`dist/index.mjs`),
  CJS (`dist/index.js`) and type declarations; component packages leave React and Emotion out as
  peers. `@dt-dds/icons` has no build: it ships TypeScript source and icon fonts.
- Sizes on `main` at `3dcce4225`: packed tarballs range from 3,306 B (`@dt-dds/react`) to
  14,165,273 B (`@dt-dds/icons`), and 38 of the 43 are under 20 kB. Gzipped ESM entries range from
  210 B (`@dt-dds/fonts`) to 37,849 B (`@dt-dds/react-date-picker`), and 41 of the 42 are under
  20 kB.
- The repo has no size tooling.
- The required checks are `check-fixups`, `lint`, `tests` and `build`. The release commit cancels
  every CI run on `main`, so a `main` run's artifacts are not a reliable baseline.
- KR1 precedents: the a11y checks (#225) report in the job summary and an artifact, with read-only
  permissions. VRT (ADR-0009) runs as a separate, non-required workflow, with committed baselines
  that only humans update.
- Two known size problems have their own issues: 41 packages map `exports` to the CJS build only
  (#300), and the published `@dt-dds/icons` lacks its entry file (#301).

Requirements for the first phase:

- Non-blocking: the size check reports and never blocks a merge.
- Baseline captured: today's sizes are recorded in a form reviewers can read.
- Local and CI parity: the same command runs locally and in CI, so agents can read the result
  before a push (ADR-0008).
- Human baseline updates: as in ADR-0009, only humans update the baseline.
- No accidental releases: updating the baseline must not release a package.
- No new dependency where existing tools are enough.

The question: what do we measure, where does the baseline live, how is the result reported, and
when does the size check fail?

## Considered Options

Each of the seven decisions has its own options.

- Metric: the published tarball; the package's own code; the import cost in an app bundle.
- Baseline: a committed file; a build of `origin/main` in the same job; the artifact of the latest
  `main` run.
- Report: the job summary and an artifact; a sticky PR comment; annotations only.
- Failure: always green; red past a threshold, not a required check.
- Threshold: 5% and 1 kB; 10% and 2 kB; any growth.
- Baseline updates: humans only; anyone, in the PR that causes the growth.
- Trigger: a separate workflow on PRs; a job in `ci.yml`; also on pushes to `main`.

## Pros and Cons of the Options

### Metric: the published tarball

Packed size, unpacked size and file count, from `npm pack --dry-run --json`.

#### Pros

- It is what adopters download and install.
- It catches files that should not ship.
- No new dependency. No package defines a `prepack` or `prepare` script, so `npm pack` runs no
  package code.

#### Cons

- Type declarations and the two module formats dilute a change to the runtime code.
- It says nothing about dependencies.

### Metric: the package's own code

Gzip size of `dist/index.mjs`, dependencies excluded.

#### Pros

- A sharp signal when a component's own code grows.
- No new dependency (`node:zlib`).

#### Cons

- It misses a heavy new dependency.
- `@dt-dds/icons` has no ESM build to measure.

### Metric: the import cost in an app bundle

Each package's entry bundled with peers excluded and dependencies included, then minified and
gzipped, with esbuild or size-limit.

#### Pros

- Closest to the runtime cost adopters pay.

#### Cons

- It needs a bundler as a new devDependency.
- Shared dependencies (`@dt-dds/themes`, `@dt-dds/react-core`) appear in every package's number.
- While `exports` points to the CJS build (#300), the numbers reflect code bundlers cannot
  tree-shake.

### Baseline: a committed file

#### Pros

- The file is the captured baseline, and reviewers see every change to it in a diff.
- One build per run.
- The same review model as Jest snapshots and the VRT baselines.

#### Cons

- It drifts when a PR grows a package and nobody updates the file: later PRs report that growth
  too.

### Baseline: a build of `origin/main` in the same job

#### Pros

- It never drifts: each PR is compared with its base.

#### Cons

- Two builds per run, and a more complex job.
- Nothing records the baseline, so "baseline captured" would need a separate document.

### Baseline: the artifact of the latest `main` run

#### Cons

- Not workable: the release commit cancels CI runs on `main`.

### Report: the job summary and an artifact

#### Pros

- Read-only permissions, as in #225.
- No third-party action.

#### Cons

- Reviewers see the report only when they open the workflow run.

### Report: a sticky PR comment

#### Pros

- The numbers sit in the PR conversation, where review happens.

#### Cons

- It needs `pull-requests: write` and, usually, a third-party action.
- PRs from forks get a read-only token, so the comment cannot be posted from that run.

### Report: annotations only

#### Cons

- Annotations are single messages, not a comparison across packages.

### Failure: always green

#### Pros

- An intended change never turns the size check red.

#### Cons

- A check that is always green gets ignored.

### Failure: red past a threshold, not a required check

#### Pros

- A regression shows in the PR's checks without blocking the merge, as VRT does.

#### Cons

- A noisy threshold teaches people to ignore red.

### Threshold

- 5% and 1 kB: a package fails only past both limits. Below 20 kB, 1 kB is the larger limit, so it
  decides for 38 of the 43 tarballs and 41 of the 42 ESM entries. For `@dt-dds/icons`, 5% is about
  708 kB.
- 10% and 2 kB: fewer false alarms, but a 1.5 kB growth in `@dt-dds/react-sidebar`'s 9.4 kB ESM
  entry (+16%) passes.
- Any growth: strict and noisy. Every PR that adds code turns the size check red until a human
  updates the baseline.

### Baseline updates

- Humans only: the VRT rule. An agent cannot accept its own regression; when an agent's PR grows a
  package, the size check stays red until a human updates the baseline.
- Anyone, in the PR: faster, like Jest snapshots, but an agent can accept its own regression, and
  only a reviewer reading the diff catches it.

### Trigger

- A separate workflow on PRs to `main`, filtered to `packages/**`, `yarn.lock` and its own files,
  runs only when sizes can change.
- A job in `ci.yml` would run on every PR, because that workflow has no path filter.
- On pushes to `main`, the release commit cancels the runs.

## Decision outcome

We decided to monitor package size with a committed baseline and a non-blocking PR check, with no
new dependency:

- Metrics: for every published `@dt-dds/*` package, the tarball's packed size, unpacked size and
  file count (`npm pack --dry-run --json`), and the gzip size of `dist/index.mjs`. `@dt-dds/icons`
  gets the tarball metrics only.
- Baseline: one committed JSON file, at a path the release matcher maps to no package, so updating
  it releases nothing (`packages/changeset-conventional-commits/AGENTS.md`).
- Commands: one root command measures the packages and compares them with the baseline, and CI
  runs the same command. A second root command rewrites the baseline.
- Baseline updates: only humans, through the update command, in a reviewed commit of its own.
  Agents never update the baseline, the initial capture included.
- CI: a separate workflow on PRs to `main` that change `packages/**`, `yarn.lock` or its own files,
  with `permissions: contents: read`. It is not a required check and runs outside the required
  jobs.
- Failure: the size check fails when a package's packed tarball size or gzipped `dist/index.mjs`
  grows by more than 5% and by more than 1 kB (1,000 bytes). New packages and packages that got
  smaller are reported and never fail it.
- Report: a job summary table of the packages whose metrics changed, with the baseline value, the
  PR value and the difference, plus the full report as a JSON artifact.

### Why

- Tarball and own-code sizes show whether a PR made the packages bigger, with no new dependency and
  the same result locally and in CI.
- A committed baseline is the captured record #227 asks for, and changes to it are reviewed like
  code.
- Red past a threshold, but not required, makes regressions visible without blocking the merge, as
  VRT does.
- Human-only updates keep agents from accepting their own regressions (ADR-0008, ADR-0009).

### Revisit when

- the threshold produces false alarms or misses regressions in practice;
- the import cost is added (#303), since it needs a bundler as a devDependency;
- the report moves to a PR comment (#302), since it needs write permission on PRs.

### Consequences

Good:

- A size baseline and a regression signal, with no new dependency or vendor.
- Agents read the same report locally before a push.
- Baseline changes are reviewed like code.

Bad:

- The baseline drifts when growth merges without an update.
- Neither metric covers dependencies until #303.
- The report lives in the workflow run, not the PR conversation, until #302.

### Next steps:

- [ ] Add the measure and update commands and the non-blocking workflow (#227; maintainers agree first on the `.github/**` change)
- [ ] Capture the initial baseline: a human, with the update command, in its own commit
- [ ] Record the rules in `AGENTS.md`: the baseline is human-only and changes only through the update command
- [ ] Explain the report and baseline updates in the contributor docs
- [ ] Follow-ups: #302 (PR comment), #303 (import cost), #300 (`exports`), #301 (`@dt-dds/icons`)

## References

- Issue: #227 (package size baseline). Parent: #222. Related: #225 (a11y checks in CI), #226 (VRT)
- ADR-0008: agentic development workflow (agents read results before a push)
- ADR-0009: visual regression testing tool (separate workflow, committed baselines, human-only updates)
- Follow-ups: #300, #301, #302, #303
- `npm pack`: https://docs.npmjs.com/cli/commands/npm-pack
- Node.js `zlib`: https://nodejs.org/api/zlib.html
