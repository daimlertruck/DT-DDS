# release-notes

Private workspace (never published) that writes the DT-DDS release notes.

## What it does

- **GitHub Release per `@dt-dds/react` tag.** `dist/cli.js` reads the umbrella version from
  `packages/dt-dds-react/package.json` and creates one GitHub Release on the tag
  `@dt-dds/react@<version>`. Prerelease versions (`1.0.0-beta.N`) get no Release.
- **Release body.** Built from the commit subjects between the previous `@dt-dds/react` tag and the
  new one:
  - a date line (UTC, `YYYY-MM-DD`) and a compare link;
  - sections in this order, empty ones left out: Breaking changes (`type!:` or
    `BREAKING CHANGE:` in the subject), Deprecated (`feat:` whose description starts with
    `deprecate`), Added (`feat:`), Changed (`perf:`), Fixed (`fix:`); other types are left out;
  - each entry links its PR (or its commit when no merged PR is found);
  - Breaking changes and Deprecated entries link the next major's page in `docs/upgrading/`.
- **Changesets changelog module.** `dist/changelog.js` writes one line per changeset with a link to
  its PR, and no "Updated dependencies" lines.

## Where it runs

- `.github/workflows/publish.yml`, job `github-release`: after `publish`, it builds this package and
  runs `node packages/release-notes/dist/cli.js` with `GH_TOKEN`. A rerun skips a Release that
  already exists; a Release for an older major is not marked as latest.
- If the job fails, use "Re-run failed jobs" on that workflow run. Once every package is published,
  a new manual run of the publish workflow does not create the missed Release. A maintainer can
  also build this package, run `git fetch --tags`, then run
  `node packages/release-notes/dist/cli.js --tag @dt-dds/react@<version>` with a `GH_TOKEN` that has
  `contents: write`.
- `.github/workflows/version-tag.yml` builds this package before `yarn changesets:ci`, so the
  changelog module is ready when `.changeset/config.json` points at it.

## Switching the changelog (1.0.0 cut)

Set `changelog` in `.changeset/config.json` to:

```json
"changelog": "../packages/release-notes/dist/changelog.js"
```

## Local use

```sh
yarn turbo run build --filter=release-notes
node packages/release-notes/dist/cli.js --dry-run --tag @dt-dds/react@1.0.0-beta.380
```

`--dry-run` prints the decision, the body and the `gh` command, and calls no `gh`. `--tag` overrides
the version read from `packages/dt-dds-react/package.json`; the tag must exist in your clone.
