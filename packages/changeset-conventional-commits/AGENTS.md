# AGENTS.md — release tooling

Applies to `packages/changeset-conventional-commits/` (vendored fork of
iamchathu/changeset-conventional-commits) and `scripts/` (`changeset-plugin`, `check-pkg-deps`,
`generate-pkg-list`; `scripts/AGENTS.md` links here). Release-critical: ask a maintainer before
changing anything. The root `AGENTS.md` applies.

## How commits become releases (verified against the built fork)

- On every push to `main`, CI (`version-tag.yml`) runs `yarn changesets:ci`: commits since the last
  tag → **subject only** (`%s`) → one changeset per conventional subject (summary = subject).
- Changed files map to packages by unanchored path match (`icon-button/` also marks `react-icon`), plus
  all dependents and the umbrella. `feat*` → minor; `type!:` / `BREAKING CHANGE:` in the subject →
  major for **every** public package; any other type touching a package → patch; files outside
  packages → no release. Trailers never matter.
- Pre mode (`beta`): every bump type yields `1.0.0-beta.N+1`.
- Known bugs: the type regex is built in a template literal and unescaped (`fixup! …`, `featurette:`
  are misparsed; CodeQL alerts 16–19); `addTag` swallows errors and exits 0 (#154); `--preid beta` is
  ignored by the CLI.

## Rules

- Never run `yarn changesets:*`, `changeset version|publish`, `npm publish`, or `git tag` (CI only).
- `.changeset/`: never add files — every `.md` except `README.md` is read as a changeset.
  `spotty-times-nail.md` is the known perpetual changeset (removal pending, on its own branch).
- Fork changes need tests in `packages/changeset-conventional-commits/src/utils/index.test.ts`
  (`yarn turbo run test --filter=changeset-conventional-commits`). `scripts/` is untested, unlinted and
  outside Sonar — add tests with any change there.
- `patches/@changesets+parse+0.4.1.patch` is obsolete: nothing applies it (no postinstall), and
  `yarn.lock` resolves a newer `@changesets/parse`.
