# Leave pre-release mode at 1.0.0 and release continuously under semver

- Status: In Review
- Author: Antonio Freire
- Deciders: DT-DDS maintainers (MAINTAINERS.md)
- Date: 4 November 2026
- Decision due date: N/A
- Supersedes: ADR-0005

**Priority:** High

## Context and Problem Statement

Issue: #228, "v1 stable release strategy published" ([OKR1][KR3], milestone M1 of #224).

DT-DDS has no version adopters can rely on. Every merge to `main` publishes (ADR-0005), every
version is a beta, and no version number tells an adopter that a release breaks them.

- Changesets has stayed in pre-release mode (`beta`), so every bump, major included, yields
  `1.0.0-beta.N+1`, and `publish.yml` publishes every version to the `latest` dist-tag.
  `@dt-dds/react` is at `1.0.0-beta.362`.
- In October 2026, `@dt-dds/react` was published 24 times and 352 package versions were tagged.
  Since November 2025, 55 of 116 releases had no `feat`, `fix` or `perf` commit in their input,
  because the release fork (`changeset-conventional-commits`) releases every conventional type
  that touches a package. `fa4ffae01`, for example, released 20 packages for a stories-only
  `docs:` commit and a VRT `test:` commit.
- Breaking changes are invisible. Four commits declared `BREAKING CHANGE:` only in their body and
  shipped as ordinary betas, such as `226e1c7d6 fix: remove isUppercased prop from button`; the
  fork reads subjects only. One commit subject in the history uses `!`.
- The README's install command writes a range such as `^1.0.0-beta.362`, which matches every later
  beta and every stable 1.x. Adopters get every beta, breaking ones included, whenever their
  lockfile updates.
- Component packages declare React `>=17.0.2` as a peer, but tests and Storybook run React 18.3.1
  only.
- Known release-tooling bugs: `addTag` swallows errors and exits 0 (#154); the commit-type regex
  misparses subjects such as `fixup! …` (CodeQL alerts 16–19); `.changeset/spotty-times-nail.md`
  releases `@dt-dds/react-app-header` on every push. `publish.yml` publishes each package in its
  own parallel job, so one failed job leaves a partial release (#313). A new push to `main` can
  cancel `version-tag.yml` between pushing the release commit and pushing its tags (#314).

ADR-0005 chose continuous deployment and expected this review "when we have a more mature design
system", for "more predictability on our deliveries as well as controlled breaking changes
releases".

## Considered Options

- Continuous releases under semver: leave pre-release mode at 1.0.0 and keep releasing every merge
  to `latest`.
- Promoted releases from a `next` channel (release train): every merge publishes a prerelease, and
  stable releases reach `latest` only through a release PR.

Both options ship 1.0.0 and share the release input, the breaking-change process, the stability
promise and the previous-major support in the Decision outcome. They differ in how a merged change
reaches `latest`.

## Pros and Cons of the Options

### Continuous releases under semver

As today, every merge to `main` releases the packages it touches to `latest`, now with plain
semver versions.

#### Pros

- No new workflow or channel: the release flow and its automation stay as they are.
- Fixes reach adopters when they merge.
- Pre mode, and the fork's handling of it, ends at 1.0.0.
- Adopters still choose when to take a release, through their lockfile and the bot (#232).

#### Cons

- Every compatible release reaches adopters' next update with no check beyond the PR's review and
  CI.
- Release volume on `latest` stays high, at about half of today's.
- A `!` merged by mistake publishes a major of every package at once; maintainer approval of `!`
  subjects is the only guard.
- Each merge is its own release, with one commit subject as its notes, until #229 structures them.

### Promoted releases from a `next` channel (release train)

Every merge publishes `x.y.z-next.N` under the `next` dist-tag. A release PR into `main` leaves pre
mode, writes the stable versions and changelogs, and re-enters pre mode. A maintainer merges it,
on demand or on a fixed cadence, and the stable versions publish to `latest`.

#### Pros

- A human decides when stable versions change, and every stable release passes through a PR that
  runs CI.
- Adopters can try changes on `next` before they reach `latest`.
- A stable release batches several merges under one set of release notes.
- A `!` merged by mistake reaches `next` only and can be reverted before a promotion.

#### Cons

- The time on `next` only helps if someone tests there, and no adopter or check is defined for it.
- Fixes reach stable adopters only at a promotion.
- A new workflow: the release PR conflicts with every per-merge version commit, so it has to be
  regenerated whenever `main` moves.
- Pre mode stays on `main` for good, which the Changesets docs advise against, and the fork's
  pre-mode handling has to be proven: today's `pre.json` records no changesets.
- A promotion promotes every package with a pending prerelease; none can be held back.

## Decision outcome

We decided to leave pre-release mode at 1.0.0 and keep releasing every merge, under semver: a
breaking change always ships as a new major, and only changes adopters can observe produce a
release.

- Release flow: as today, every merge to `main` releases the packages it touches, their dependents
  and the umbrella `@dt-dds/react` to the `latest` dist-tag. There is no prerelease channel.
- Release input: only `feat`, `fix`, `perf` and `!` produce a release (table below). A change
  adopters can observe uses one of them. Runtime dependency updates use `fix(deps):`;
  `chore(deps):` is for devDependencies.
- Breaking changes: expand–contract on `main`, and a major only when maintainers decide (below).
- Versioning: packages stay independently versioned (ADR-0001), and a `!` makes every public
  package major (ADR-0004). Internal dependencies stay pinned to exact versions, and the umbrella
  stays the recommended install.
- React peers: `^18 || ^19`, with a React 19 test job, set before 1.0.0, because narrowing the
  range afterwards would be breaking.
- 1.0.0 ships when the entry criteria in Next steps are met. There is no target date.

### What each commit releases after 1.0.0

| Commit on `main`   | Release                                                          |
| ------------------ | ---------------------------------------------------------------- |
| `fix:`, `perf:`    | patch of the touched packages, their dependents and the umbrella |
| `feat:`            | minor of the touched packages, their dependents and the umbrella |
| `!` in the subject | major of every public package                                    |
| any other type     | none; it ships with the next release of the packages it touches  |

Adopters on `^1.0.0` receive every patch and minor, and never a major. At the 1.0.0 cut, leaving
pre mode turns every `1.0.0-beta.N` into `1.0.0`, so adopters on `^1.0.0-beta.N` reach 1.0.0
without changing their range.

### Breaking changes

1. Expand: the new API ships next to the old one in a minor (`feat:`), as a new prop, component or
   variant, or as opt-in behaviour. The old API gets a JSDoc `@deprecated` tag and a
   development-only console warning that names the replacement. The change gets a migration guide
   entry (#229) and, when the migration is mechanical, a codemod (#231).
2. Wait at least 3 months, with at least one minor that contains the deprecation.
3. Contract: when maintainers decide to ship a major, all its removals and default flips merge as
   `!` commits in one PR. A rebase merge pushes them together, so the release job runs once and
   publishes one major.
4. From then on, the previous major gets fixes for 6 months (Previous-major support, below).

Breaking changes with no expand step, such as narrowing a peer range, are contract-only and follow
steps 3 and 4. A library-wide opt-in mechanism, such as "future flags" on `Provider`, would be new
public API and needs an RFC.

### Stability promise

From 1.0.0, semver covers:

- everything exported from a package's `src/index.ts`: names, props and their defaults, and types;
- behaviour stated in the component's spec README, including its keyboard table;
- the theme object's shape and its token names;
- the supported peer ranges (React, Emotion): dropping a React major is breaking.

It does not cover:

- DOM structure, internal class names and Emotion internals;
- visual changes that follow the approved design (token values);
- undocumented behaviour;
- components marked experimental.

### Previous-major support

The immediate predecessor major gets security and p0 fixes for 6 months after the next major
ships. No maintenance branch is kept: the previous major lives on as its release tags. For each
fix:

1. The fix merges to `main` first, with its test.
2. A branch such as `release/1.x` is created from that major's last tag of the umbrella
   (`@dt-dds/react@1.x.y`). Every release bumps the umbrella, so this tag marks the major's last
   state of the whole repository.
3. A PR cherry-picks the fix into the branch, so CI and review run against that major's code.
4. On merge, the release job publishes the patch under a dist-tag other than `latest`, such as
   `v1`.
5. The branch is deleted. The new tags keep its commits, so the next fix branches from them: it
   holds the earlier patches and none of the commits merged to `main` since.

The patches' changelogs live on their tagged commits, not on `main`, so the release notes (#229)
list them.

### Experimental components

A new component can be marked experimental, by a status in its spec README and a Storybook tag.
It is outside the stability promise: its breaking changes ship as `feat:` with a migration note,
never `!`, until a maintainer graduates it.

### Reliability groundwork (#224)

Semver tells adopters what a release does to them. The other #224 milestones help them act on it:

- #229, release notes and migration guide templates: structured notes that list breaking changes
  and required actions first, and a migration guide entry for every deprecation and every major.
- #230, upgrade guide and playbook: how adopters move from the beta to 1.0.0, then from one major
  to the next.
- #231, codemod workflow: a codemod for every mechanical breaking change, shipped with its
  deprecation so adopters can migrate before the major.
- #232, GitHub bot: upgrade PRs and release notifications in consumer applications, so adopters
  take releases on their own schedule, with their own CI as the check.

The CI guardrails (#222: a11y, VRT, package size) and the accessibility audit of the components
(#223) make regressions visible in each PR before it merges.

The same guardrails protect the semver promise against breaking changes committed without `!`.
Reviews check component changes against their spec contract (RFC chain and spec README), VRT
(#226) shows visual changes, and the codemod workflow (#231) validates each breaking change.
`@dt-dds/themes`, and possibly `@dt-dds/icons` and `@dt-dds/react-core`, have no spec contract:
#317 adds one, with a check.

### Why

- The release frequency is not the root problem; versions that carry no meaning are. Leaving pre
  mode makes semver hold, and the type filter removes the empty releases. Neither needs a
  prerelease channel.
- With semver holding, `^1.x` adopters never receive a breaking change, so batching compatible
  releases adds little reliability. Its time on `next` checks nothing until someone tests there,
  and it costs a new workflow and permanent pre mode (Revisit when).
- Expand–contract (Fowler's parallel change) keeps every change on `main` and gives adopters a
  migration window. One PR per major keeps majors rare and deliberate. Previous-major fixes use
  trunk-based development's release branches created "on a just in time basis": each exists for
  one cherry-picked fix and is deleted once the patch publishes.

### Revisit when

- adopters report regressions from releases they took in: consider a prerelease channel that
  stable releases are promoted from;
- commit subjects prove too thin for release notes: consider changeset files authored in PRs;
- adopters report duplicate copies of shared packages: consider caret ranges for internal
  dependencies;
- the rhythm of majors is known: consider a fixed major cadence.

### Consequences

Besides the pros and cons of continuous releases above:

Good:

- `^1.x` ranges are safe: a breaking change always means a new major.
- About half of today's releases stop, and the rest carry a change adopters can see.
- Beta adopters reach 1.0.0 without changing their ranges.

Bad:

- `refactor:` and README-only changes reach npm only with the next release of their packages.
- Old and new APIs coexist for at least 3 months per breaking change, and each major adds 6 months
  of backports.
- Exact pins keep the risk of duplicate shared packages when adopters mix versions.

### Next steps:

Entry criteria for 1.0.0, tracked in #320:

- [ ] #312: only `feat`, `fix`, `perf` and `!` release; the commit-type regex (CodeQL alerts
      16–19) is fixed and `spotty-times-nail.md` removed; CONTRIBUTING and the `AGENTS.md` files
      describe the new rules
- [ ] #313: each release publishes all-or-nothing
- [ ] #314: a new push cannot cancel a release between its commit and its tags
- [ ] #154: `addTag` fails the job on errors
- [ ] #300 and #301: the packaging fixes that would be breaking after 1.0.0
- [ ] #315: every package's API is audited, and each breaking candidate has either landed in beta
      or been accepted as the 1.0.0 API
- [ ] #223: the accessibility audit of the components and its fixes are complete
- [ ] #316: React peers are `^18 || ^19`, and the tests run on both
- [ ] #229 and #230: the release notes and migration guide templates, and the beta-to-1.0.0
      upgrade guide, are published

The 1.0.0 cut:

- [ ] #320: rehearse on a disposable copy of the repository and registry, then one PR leaves pre
      mode (`changeset pre exit`); on merge, the release job publishes every package as 1.0.0

Before the first major:

- [ ] #231: the codemod workflow
- [ ] #318: previous-major patches release from short-lived `release/**` branches, under a
      dist-tag such as `v1`

Alongside:

- [ ] #317: a contract and a check for breaking changes in themes, and in icons and core if triage
      confirms the gap
- [ ] #319: the experimental status in the spec README template and in Storybook
- [ ] #232: the upgrade bot
- [ ] On acceptance, set ADR-0005's status to "Superseded by ADR-0011"

## References

- Issue: #228. Parent: #224. Reliability groundwork: #229, #230, #231, #232. Follow-ups: #312 to
  #320. Related: #222, #223, #226, #154, #300, #301
- ADR-0001: library versioning. ADR-0004: versioning tool. ADR-0005: release process (superseded)
- `packages/changeset-conventional-commits/AGENTS.md`: how commits become releases today
- Changesets 2.29.7, prereleases (leaving pre mode):
  https://github.com/changesets/changesets/blob/%40changesets/cli%402.29.7/docs/prereleases.md
- Semantic Versioning 2.0.0: https://semver.org/
- node-semver, prerelease tags and caret ranges: https://github.com/npm/node-semver/blob/main/README.md
- Martin Fowler, Parallel Change: https://martinfowler.com/bliki/ParallelChange.html
- Trunk-based development, branch for release: https://trunkbaseddevelopment.com/branch-for-release/
