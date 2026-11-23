# Upgrading DT-DDS

How to take a DT-DDS release, from 1.0.0 on. To move from the beta to 1.0.0, start with
[Upgrading from the beta to 1.0.0](https://github.com/daimlertruck/DT-DDS/blob/main/docs/upgrading/1.0.0.md).

## What a release means

DT-DDS follows semantic versioning:

- a patch fixes a bug;
- a minor adds a feature, or deprecates an API next to its replacement;
- a major removes or changes an API.

A range such as `^1.0.0` receives every patch and minor, and never a major.

A stable major, such as 1.x, keeps its public API compatible: exports, props and their defaults,
types, the theme's shape and token names, and the behaviour each component's spec README states.
Experimental components are not covered. Their spec README and Storybook mark them, and their
breaking changes can ship in a minor, with a migration note.

## Reading the release notes

Every release bumps the umbrella `@dt-dds/react`, so its release notes cover the whole release,
whichever packages you install. Each release has one GitHub Release on its `@dt-dds/react` tag,
and its notes list, in this order:

1. breaking changes and the actions they require;
2. deprecations, each with its replacement;
3. additions, changes and fixes.

Each breaking change and deprecation links its migration guide entry. Before you upgrade, read the
notes of every release between your version and the new one.

Until 1.0.0, each package's `CHANGELOG.md` is its release notes, for example the
[`@dt-dds/react` changelog](https://github.com/daimlertruck/DT-DDS/blob/main/packages/dt-dds-react/CHANGELOG.md).

## Upgrading

Upgrade with your package manager's upgrade command, so `package.json` and the lockfile change
together. With the umbrella `@dt-dds/react`, which re-exports every component package and the
themes at versions that match each other, you upgrade one package.

If you install `@dt-dds/*` packages one by one, upgrade all of them together. DT-DDS packages pin
each other to exact versions, so mixed versions can install duplicate copies of shared packages,
such as `@dt-dds/react-core`.

| Package manager  | Umbrella                              | Packages one by one                                                                                   |
| ---------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| npm              | `npm install @dt-dds/react@latest`    | `npm install @dt-dds/react-button@latest @dt-dds/react-tabs@latest`, naming every `@dt-dds/*` package |
| pnpm             | `pnpm update @dt-dds/react --latest`  | `pnpm update "@dt-dds/*" --latest`                                                                    |
| Yarn 1           | `yarn upgrade @dt-dds/react --latest` | `yarn upgrade --scope @dt-dds --latest`                                                               |
| Yarn 2 and later | `yarn up @dt-dds/react`               | `yarn up "@dt-dds/*"`                                                                                 |

These commands take the latest release. To stay on a major, give its range instead, such as
`@dt-dds/react@^1`.

Then check that only one copy of `@dt-dds/react-core` is installed: `npm ls @dt-dds/react-core`,
`pnpm why @dt-dds/react-core` or `yarn why @dt-dds/react-core`.

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
Each major has its own migration page in `docs/upgrading/`, in the entry format that
[Upgrading from the beta to 1.0.0](https://github.com/daimlertruck/DT-DDS/blob/main/docs/upgrading/1.0.0.md#entry-format)
defines.

### Codemods

[Issue 231](https://github.com/daimlertruck/DT-DDS/issues/231) writes this section.

### Upgrade bot

[Issue 232](https://github.com/daimlertruck/DT-DDS/issues/232) writes this section.

## The previous major

After a new major ships, the previous major gets security and p0 fixes for 6 months. These patches
publish under a dist-tag other than `latest`, such as `v1`, and each one has a release tag in the
[tags list](https://github.com/daimlertruck/DT-DDS/tags).

## Peer ranges

React `^18 || ^19` ([issue 316](https://github.com/daimlertruck/DT-DDS/issues/316)) and Emotion
`^11`. Dropping a React major is a breaking change, so it only ships in a major.

## Reporting a regression

If a patch or minor breaks your app, open a
[bug report](https://github.com/daimlertruck/DT-DDS/issues/new?template=bug_report.yml). Name the
package, the version that works and the version that breaks.
