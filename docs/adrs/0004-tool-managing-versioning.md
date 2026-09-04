# Decide tool to manage versioning

- Status: Accepted
- Author: Tiago Mendes
- Deciders: Ana Pereira, António Freire, Cátia Raminhos, Diogo Costa, Joel Pereira, Leidson Cruz, Masoud Soleymani, Tiago Mendes
- Date: 21 August 2023

**Priority**: High

## Context and Problem Statement

Offer an automated solution for simplifying the process of updating package versions and changelog.

Some requirements:

- update version in package.json
- update changelog with the release information
- works in a monorepo setup

## Considered Options

1. ChangeSet
2. Release-please
3. Release it
4. Intuit auto

## Pros and Cons of the Options

### ChangeSet

#### Pros

- Already being used within tblx (tblx-webkit)
- Good documentation
- It's a widely used tool, which means it has an active community. Furthermore, it's the tool recommended by Turbo CLI for versioning.
- It is compatible with our approach of each component having a separated version
- It is tightly integrated with GitHub Actions and is also easily integrated with CI/CD pipelines facilitating that automation process of releases;
- We can bump the version of every component when bumping the main package, also we can bump every component when we bump the version of one component.

#### Cons

- Most of the things from changeSet works only for github and not for github enterprise;
- For better changelogs we may need to use our own scripts/logic (maybe we can use the same logic that is being used in tblx-webkit)

### Release-please

#### Pros

- Follows Semantic Versioning to determine version increments
- Was especially design to work with monorepos
- can be used in CI/CD pipelines facilitating the automation process of releases;
- The creation of the release PR worked well after understanding how to do it and it's interesting to see the release PR before doing the release so we can see how the version and the changelog will look like
- Creates git tags and release tags

#### Cons

- The documentation was really scarce and was not easy to understand what each command would do without testing or even what steps/commands where necessary to do a release.
- Most of the documentation is done around using github actions as it is the suggested way to use release-please

### Release it

#### Pros

- Follows Semantic Versioning to determine version increments
- it has interactive and CI mode
- Works for monorepos and has documentation covering monorepos (https://github.com/release-it/release-it/blob/main/docs/recipes/monorepo.md)
- It has a variety of configurations for customising the release process and the changelog
- Offers the ability to add plugins, for example a plugin **to get the bumped version based on commit message (conventional-changelog)**
- Can create git tags for releases

#### Cons

- It doesn't enforce convention commits but the changelog and versioning depends on convention commits  so we need to  do it ourselves by using for example husky and @commitlint/config-conventional to enforce commit conventions
- Due to its variety of configurations, the setup and learning curve can be higher but it has good articles explaining the configurations and good documentation

Notes: As this works by doing an extra commit with the version and changelog, we need a way to make sure the versioning is done by using github actions, or using pipeline or manually checking if the PR has the changelog and version updated before merging

### Intuit/auto

https://github.com/intuit/auto

#### Pros

- has several extra functionalities like _Post release notes to slack, Include Jira story links in the changelog_
- is also suggested by Turbo cli

#### Cons

- couldn't make it work with my monorepo setup(it's not even bumping my version in package.json) even though this tool is suggested by turbo cli couldn't find any information regarding how to set this up using turbo cli

## Decision outcome

We decided to use changesets for versioning given:

- Supports monorepos
- Don't need a PR to generate the versioning and changelogs, all the automation could be done in the pipelines
- Could be automated by custom scripts to achieve the exact behaviour we want for the versioning based on conventional commits which is:
  - Major version, bump all packages within the monorepo
  - Minor, Patch version, bump the changed package and its dependencies
  - Whenever a component is bumped the library version is bumped as well
- Changelog customisation is limited but we can implement a scripting solution for that
- Since we have the scripts done, all processes will be automated with no developer intervention

## References

**Release-it:**

- https://medium.com/valtech-ch/monorepo-semantic-releases-db114811efa5
- https://github.com/release-it/release-it

**Release-please:**

- https://github.com/googleapis/release-please

**ChangeSet:**

- https://github.com/changesets/changesets
