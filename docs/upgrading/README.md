# Upgrading DT-DDS

How to take a DT-DDS release, from 1.0.0 on. To move from the beta to 1.0.0, start with
[Upgrading from the beta to 1.0.0](https://github.com/daimlertruck/DT-DDS/blob/main/docs/upgrading/1.0.0.md).
The rules on this page come from
[ADR-0011](https://github.com/daimlertruck/DT-DDS/blob/main/docs/adrs/0011-v1-stable-release-strategy.md).

## What a release means

From 1.0.0, DT-DDS follows semantic versioning:

- a patch fixes a bug;
- a minor adds a feature, or deprecates an API next to its replacement;
- a major removes or changes an API.

A range such as `^1.0.0` receives every patch and minor, and never a major.

The stability promise covers:

- everything exported from a package's `src/index.ts`: names, props and their defaults, and types;
- behaviour stated in the component's spec README, including its keyboard table;
- the theme object's shape and its token names;
- the supported peer ranges (React, Emotion).

It does not cover:

- DOM structure, internal class names and Emotion internals;
- visual changes that follow the approved design (token values);
- undocumented behaviour;
- components marked experimental. An experimental component says so in its spec README and in
  Storybook ([issue 319](https://github.com/daimlertruck/DT-DDS/issues/319)). Its breaking changes
  ship in a minor, with a migration note.

## Reading the release notes

Today, each package's `CHANGELOG.md` is its release notes, for example the
[`@dt-dds/react` changelog](https://github.com/daimlertruck/DT-DDS/blob/main/packages/dt-dds-react/CHANGELOG.md).
Structured release notes, which list breaking changes and required actions first, come with
[issue 229](https://github.com/daimlertruck/DT-DDS/issues/229).

## Installing

Install the umbrella package `@dt-dds/react`. It re-exports every component package and the themes,
at versions that match each other.

```bash
yarn add @dt-dds/react @emotion/css @emotion/react @emotion/styled
```

If you install `@dt-dds/*` packages one by one, upgrade all of them together. DT-DDS packages pin
each other to exact versions, so mixed versions can install duplicate copies of shared packages,
such as `@dt-dds/react-core`.

## Deprecations

An API is deprecated before a major removes it:

- it gets a JSDoc `@deprecated` tag, which your editor shows;
- in development builds, it logs a console warning that names the replacement;
- it gets a migration guide entry;
- when the migration is mechanical, it gets a codemod.

A deprecated API stays for at least 3 months and at least one minor release. Move to the
replacement during that window, and the major brings no surprise.

## Majors

A major ships all its removals at once, and each one has a migration guide entry. The first
migration page is
[Upgrading from the beta to 1.0.0](https://github.com/daimlertruck/DT-DDS/blob/main/docs/upgrading/1.0.0.md).

### Codemods

[Issue 231](https://github.com/daimlertruck/DT-DDS/issues/231) writes this section.

### Upgrade bot

[Issue 232](https://github.com/daimlertruck/DT-DDS/issues/232) writes this section.

## The previous major

After a new major ships, the previous major gets security and p0 fixes for 6 months. These patches
publish under a dist-tag other than `latest`, such as `v1`, and each one has a release tag in the
[tags list](https://github.com/daimlertruck/DT-DDS/tags).

## Peer ranges

From 1.0.0: React `^18 || ^19`
([issue 316](https://github.com/daimlertruck/DT-DDS/issues/316)), Emotion `^11`. Dropping a React
major is a breaking change, so it only ships in a major.

## Reporting a regression

If a patch or minor breaks your app, open a
[bug report](https://github.com/daimlertruck/DT-DDS/issues/new?template=bug_report.yml). Name the
package, the version that works and the version that breaks.
