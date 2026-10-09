# changeset-conventional-commits

This plugin for changeset is a fork from https://github.com/iamchathu/changeset-conventional-commits you can find all details of the original development there.

Additional modifications &copy; 2025 tb.lx by Daimler Truck.
Below you can find useful information on how this plugin was modified to meet our own requirements.

## Install & Build

```
yarn install
yarn build
```

## Useful Commands

- `yarn lint` - Lint package
- `yarn test` - Test package
- `yarn build` - Build package

## Usage

1. Make sure the project is setup with changesets.
2. Import to use as script: `const changesetPlugin = require('changeset-conventional-commits');`
3. Run the available methods:
   - `changesetPlugin.conventionalCommitChangeset()`
   - `changesetPlugin.addTag()`

## Methods

### conventionalCommitChangeset

This method is responsible to identify the available packages within the monorepo, rules to be considered a valid repo:

- Package hasn't the `private` property or it should be false
- Package has the `version` property
- Package `name` isn't included in the `ignored` property in the `config.json` of the `.changeset` folder

After identified the packages, we identify what are the latest commits since the last git-tag:

[PS. Only conventional commits are considered](https://www.conventionalcommits.org/en/v1.0.0/)

Example:

```bash
96c85c8 (HEAD -> main) chore: fix getting PR number on pipeline
c247c66 chore: fix pipeline when checking versions
2ad41a5 (@package/example@1.0.0) release: version packages
32455e1 fix: remove page components
eae07bf fix: PR preview link to target correct repository
```

Commits to be considered:

- chore: fix getting PR number on pipeline
- fix: pipeline when checking versions

We can also have the case where we don't have tags yet, we are starting implementing this plugin, then we'll get the full list of commits since the beggining:

```bash
96c85c8 (HEAD -> main) chore: fix getting PR number on pipeline
c247c66 chore: fix pipeline when checking versions
2ad41a5 fix: remove page components
eae07bf fix: PR preview link to target correct repository
9a3b645 chore: change pool on pipeline
.
.
.
0239b33 initial commit
```

All conventional commits will be considered.

Having the list of commits we iterate over each of them to identify the changed files. Why?\
_R: Given we are in a monorepo and possible managing versions for different packages, we need to know for which packages should we generate the changelogs in order to bump version and further generate the changelog. This logic will find the match between the changed file and the available packages path_

What about the dependencies? Now we have the changed package identified but shall we have the packages that depends on it as well?\
_R: Yes, there is a logic to identify within the monorepo if the changed package appear in another package, then we consider this package affected as well. Besides that whenever a BREAKCHANGE is added all package within this monorepo will be considered affected._

Now after identified the changed packages a `changeset` will be generated for each commit, this would be the outcome:

```markdown
---
'@dt-dds/react': patch
---

chore: set beta version for main branch
```

A `tag-packages.json` file will be generated within the `.changeset` folder, containing the list of packages changed to be tagged.

### addTag

This method will be resposible for:

- Commit the generated changelogs and bumped packages using the command: `git add -A && git commit -m "release: version Packages"`
- Tagging every package within the `tag-packages.json` in the `.changeset` folder using the command `git tag <package-name>@<package-version>`

## Note

Take in mind that this library is a plugin to complement and acomplish what we want to achieve with changeset.
The methods here fill the gaps that aren't provided by changeset out-of-the-box like **automatically generate changesets based on conventional commits** and the **tagging and commit files** only for affected packages.
Actually the changeset has a cli command for tagging, but it tags every single package in the monorepo.

## &copy; License

Licensed under [MIT License](LICENSE)
