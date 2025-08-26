import{j as e}from"./jsx-runtime-DMAvRu52.js";import{useMDXComponents as s}from"./index-_byTH_QA.js";import{M as a,i}from"./index-DRfeC8hb.js";import"./index-Dl6G-zuu.js";import"./iframe-DMbQnZwK.js";import"./index-XZl3Vlk1.js";import"./index-DCrStp1_.js";import"./index-yCl_L3Am.js";import"./index-DrFu-skq.js";const r=`# Coding Standards and Guidelines

This guide is intended to support the developers by providing a set of programming conventions, style and best practices to follow on DT-DDS.

- [Coding Standards and Guidelines](#coding-standards-and-guidelines)
  - [1. Branch Naming Convention](#1-branch-naming-convention)
  - [2. Commits](#2-commits)
    - [2.1. Developer Certificate of Origin (DCO)](#21-developer-certificate-of-origin-dco)
    - [2.2. Message Convention](#21-message-convention)
    - [2.3. Strategy](#22-strategy)
    - [2.4. References](#23-references)
  - [3. Pull Requests](#3-pull-requests)
    - [3.1. Name Convention](#31-name-convention)
    - [3.2. Preview Link](#32-preview-link)
    - [3.3. Work in Progress](#33-work-in-progress)
    - [3.4. Code Reviews](#34-code-reviews)
      - [3.4.1 Continuation of Pull Request](#341-continuation-of-pull-request)
      - [3.4.2 Merging the Pull Request](#342-merging-the-pull-request)
  - [4. Code Standards & Good Practices](#4-code-standards--good-practices)
    - [4.1. Start developing on DT-DDS](#41-start-developing-on-DT-DDS)
    - [4.2. Library Compilation](#42-library-compilation)
    - [4.3. How to build a component from scratch](#43-how-to-build-a-component-from-scratch)
    - [4.4. When to use Types / Interfaces](#44-when-to-use-types--interfaces)
    - [4.5. Compound components pattern](#45-compound-components-pattern)
    - [4.6. Enum vs String literals unions](#46-enum-vs-string-literals-unions)
    - [4.7. Enum vs Objects with as const](#47-enum-vs-objects-with-as-const)
    - [4.8. Named Exports vs Default Exports](#48-named-exports-vs-default-exports)
    - [4.9. Developer Documentation](#49-developer-documentation)
    - [4.10. How to add component stories?](#410-how-to-add-component-stories)
  - [5. Versioning & Publishing Packages](#5-versioning-&-publishing-packages)

## 1. Branch Naming Convention

New branches should follow the name pattern \`{type}/{ticket}/{description-in-kebab-case}\` (example: \`feature/DTUI-XXX/new-feature\`). When there is no JIRA ticket, replace \`{ticket}\` for \`NO-ISSUE\`.

**Note:** The rule should be to always have a JIRA ticket created for each task.

## 2. Commits

### 2.1. Developer Certificate of Origin (DCO)

A [Developer Certificate of Origin (DCO)](https://developercertificate.org/) is a simple mechanism that authors use to affirm they have the right to contribute their code under the project’s license.

Every Commit you submit needs a \`Signed-off-by: Your Name <you@example.com>\` trailer. The easiest way to achieve this is by adding the \`-s\` / \`--signoff\` flag to \`git commit\`. For ease of convenience, we also provide a Husky hook which will automatically append a DCO “Signed-off-by” trailer to every commit message if one isn’t already present.

By submitting commits with a valid \`Signed-off-by\` line, you agree that your contribution is covered by the MIT license.

### 2.2 Message Convention

All commit messages should follow [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) specification.  
The message should be structured as follows:

\`\`\`
<type>[optional scope]: <description>

[optional body]
\`\`\`

The commit title has a limit of 50 characters. **Description** should be written in the present tense (**change**, not **changed** or **changes**), to be consistent with generated messages from commands like git merge.

Even though the **body** is optional, the developer should always consider adding one so that the project has a more clear and detailed commit history for anyone to follow. Each line of **body** should be wrapped at 72 characters.

### 2.3. Strategy

- Avoid mixing concerns, commits should be “atomic”. For example, creating two different components should produce two separate commits.
- Commits should never crash the application. For example, a refactor that changed a payload of a request, needs to be applied to all places in the same commit. It's the same for tests, should be added in the same commit of the feature/fix, etc.

### 2.4. References

For more information on how to commit, read the following documentation and blog posts:

- [How to Write a Git Commit Message](https://cbea.ms/git-commit/)
- [Git Commit Best Practices](https://gist.github.com/luismts/495d982e8c5b1a0ced4a57cf3d93cf60)
- [Help him!! Help your code reviewer.](https://leidsoncruz.github.io/post/help-him-help-your-code-reviewer/)

## 3. Pull Requests

### 3.1. Name Convention

Pull Requests (PRs) should be opened with the following title structure \`{ticket}: {description}\`, for example: \`DTUI-XXX: PR description\`. The project already includes a PR template (see it under the folder \`.github\`) that should be correcly filled in.

### 3.2. Preview Link

After a PR is opened, a deploy to the github pages gets triggered and a Preview Link is added to the PR description. This will enable developers and designers to see the changes and review accordingly.

### 3.3. Work in Progress

When creating a PR that is not ready to be reviewed, open it as a [Draft Pull Request](https://github.blog/2019-02-14-introducing-draft-pull-requests/). Furthermore, the PR title should include the \`[WIP]\` tag in the beginning, for example: \`[WIP] DTUI-XXX: PR description\`.

### 3.4. Code Reviews

Every PR should be reviewed and approved by at least two reviewers before being merged to the main branch.

As a contributor organise yourself and try to ideally review the pending PR's in the first 24h. 💡

After each review, and every time the developer need to perform a fix on a branch, fixes related to a commit should reference the same commit using [fixup commit](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---fixupamendrewordltcommitgt). This allows the reviewers to track the changes easier and keeps clean and clear commit history.

#### 3.4.1 Continuation of Pull Request

As a rule of thumb the code author is also the PR assignee. "Assignees are responsible for making sure the pull request is not blocked. They are responsible for making sure the pull request progresses."

Check it out the [useful PR guidelines by MDN](https://developer.mozilla.org/en-US/docs/MDN/Community/Pull_requests)

#### 3.4.2 Merging the Pull Request

After the review process is completed and before merging the branch, all discussions **must** be resolved by the one that opened them. This way, everyone is aware if the discussion is finished or if there is something pending. Besides that, and after merging the branch, the developer should also rebase the branch with the main/develop branch using the \`autosquash\` commit, so that all fixups' commits are squashed with its respective parent commit.

Even if the PR is approved by the assignees, the comments made by other contributors must be considered;

After all of this, the branch is ready to be merged using \`rebase and merge\`.

## 4. Code Standards & Good Practices

It is important to follow certain coding guidelines and standards to maintain consistency across the project's code base.

### 4.1. Start developing on DT-DDS

Only create a new component if the design specification is ready and approved in the contributors sync, the component spec's to be found on [Figma](https://www.figma.com/file/HMNEjcZa01vPjEaBbB0vtF/DT_UI?type=design&node-id=48%3A8967&mode=design&t=UTbLy7JmqDqrFuWC-1).

Challenge the specification, raise concerns and your point of view to have great component results.

There is a case where you don't have the specification ready but the component is urgent for your product, it should be created in the scope of your product at first;

### 4.2 Library Compilation

To make the core library code work across all browsers, we need to compile the raw TypeScript and React code to plain JavaScript. We can accomplish this with \`tsup\`, which uses \`esbuild\` to greatly improve performance.

Running \`yarn build\` from the root of the Turborepo will run the \`build\` command defined in each package's \`package.json\` file. Turborepo runs each \`build\` in parallel and caches & hashes the output to speed up future builds.

For \`dt-dds-react\`, you should see a folder \`dt-dds-react/dist\` which contains the compiled output.

\`\`\`bash
dt-dds-react
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    ├── index.mjs   <-- ES Modules version
    └── index.css   <-- CSS file
    ...
\`\`\`

### 4.3. How to build a component from scratch

Components are independent packages that should be created in the workspace \`packages/react-packages/**\`

1. Run \`yarn generate:component\`

2. You will be asked for a package name (in kebab-case)

3. A component package with a boilerplate will be created in the workspace \`react-packages\` 🎉

4. All the integration with storybook and \`dt-dds-react\` main library will be provided automatically.

### 4.4. When to use Types / Interfaces

Types and interfaces are very similar, in the last versions of typescript almost all features of an interface are available in type.

To follow a standard and have everyone on the same page we should use:

\`Interfaces\`: to define object shapes until you need some feature that is available only on the type alias.

\`Types\`: to "create" a new data type or define an object shape that needs something that only types have (Ex: conditional types, extends primitives, etc).

Also, it has differences to get a better error explanation. You can find the documentation related to the usage below:

[errors](https://www.typescriptlang.org/play#code/PTAEBUAsFMCdtAQ3qALgdwPagLaIJYB2ammANgM4mgAm0AxmcgqjKBZIgA4KYBmSQgCgQoTACMAVg1QAuUEVRw+ietCqJCNNAE8eSMvkQV1AOhHALEGDqQoAbnFsV8OfE1gAaQdr6ZYaGw4mBSooPSYOMHE9MbqVqphrAgUiDjQ5kKoeggAQviwNOA5oAC8oADeQqCg6EQA5hTyAEwA3EIAvu1CisqqeQU0AJKESrAqapXVtQ1NoG2dQkIRhKGg4oMAjPL5hcX65RUzhI0toF3LmKthG4XNO4MjYxMIh8en8+fdorkMiACuJggOQAyvRYPguGF8Bp2KhYP96Kh-rBEGRdPoKDpQtAcJ4rPhUAByKhcEIucRkFjYXqwNwAD0C0AKoEB1MwmRWa1uNAAzA9Ck8+pNyjzNt8wFBoLZxJhWOx-lwybAwtB6UotA0xMkArSXhotBizFZ9gg0UYTFQaNhWDDQPYjApRnATEj8FcjRRvOhIO5oATneN+lROI4kKAANbSrCFTLZfQAeXQ6LehEwSJRhDR8nh-wQHVAADJQLsijl2vGEAAlCREMqVUBpjOwLNkeQqSj5oslx6Bl7dPX9UAABWgqnTEdAao1NCopdNUxqETImBRfH+bbQCOg7RqfEM6nbaJM7Q6PT7Q4Awr76FHiNPoFo573nkOqkvyKvxhuj53d6B93wQ8AOPHdFiEKkwkwZN5CTFMGzqE45mabwm2RFtsy3PMvgg6AwnoG873ka98FvR96yORCPhQ8JPzXH8QM7bxAOAjsgQuE1ODCVJ8Bob0EHgCIokfbQdFXVkgUHNQqEwRwAkrBJDDiChTFAEEeHofA+FItEyB0bxxD+NlQDE-4ZjIdF6jw9Y8LGKdYFgfwrHSChUislTQCGARTNASBZLgMQ5KZADyBXKj7Mc2AvRM8TYmEUQTAQPz0GBHgwQhKFwk0UAuEch06DQF0As0bRghQPx6DZGhnPUNz1FqGBiBjCMtTqeUpPqwwo1AEiyMITJoPggjSLvdphr6+tBolUAE0IBA8EkfxaC0vg4EfSZDIwaByMrAwLXq+wqA6igEhQVhEGhC9pLsXgeGIEqjT25SbvCFcTBocxRCgO10k0KgfLiqd1REwQnVfDbbDoRhkC1QkEnYBgrm0VBXAyJYOtAABpQkNUXHKUSi+RZXIMdCFPdGroQbHUFx99aJXFF5FCCETnJqwRmCuUYACWIgUQR64rTG4EAIzQrO0VdUBcAr+AJKXaAYDwLvdfqll24dFS4WxDmmZd-CZ+EGlPbp1c17W8dQTBsXkQh-hwQzYGNpZRAAEWgO6aC1D1TICepMGPbxbStFa1sISYIg3bRDKQKwyRcFGwyW-m5vqZXHFUgAJaDoCCvwAi4f5KVIvSgbj6BqtEStosJElw02uzYgs6g8G65IcFBjrMlEWbeAEZIbLWeAKC-a684R5kTgMdF+GC8urKsXn6uQVdDSr+0jsp6Kg7hVRJ388YwqsVh4EQbQ7X5v3MG0LgmEmS2d5VWRnbASAaa4JoQFCXf9-3aDTCE4AABHPMoQVYUGALyAA7M0XkUDeQAFZgBV3BJCVAABaY6aDDpoKrsAeBzQABsAAOZopCAAMABifBxDSHNDIUIIAA)
[documentations](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

Examples of usage:

\`\`\`typescript
type NullableString = string | null;

interface MyInterface {
  name: NullableString;
}
\`\`\`

### 4.5. Compound components pattern

We must use this pattern when creating components that are composable, not all the cases will apply this pattern, but for example cases where we have a main component that depends on other parts such as:

- Menu depends on items;
- Dropdown depends on items;
- Table depends on headers, columns, rows, footers
- ...

**Why?**

Compound components manage their own internal state, which they share among the several child components. When implementing a compound component, we don’t have to worry about managing the state ourselves.

When importing a compound component, we don’t have to explicitly import the child components that are available on that component.
Reference: https://www.patterns.dev/react/compound-pattern/

### 4.6. Enum vs String literals unions

We encourage and see as a good practice using String literal unions rather than Enum to define a set of values, there are still some cases where enum's can be used, but for sure it will be an exception.

Examples of usage:

\`\`\`typescript
enum PortfolioProjectStatus { DRAFT, PUBLISHED }
vs.
type PortfolioProjectStatus = "DRAFT" | "PUBLISHED"
\`\`\`

Enums requires to be exported/imported by the files that depend on them, for example in a method or passing it through component props.

If there isn't a strong need to use enum it should be avoided. An exception of using enum is when you have an API and you need to change a specific code that represents a category, you can use an enum to improve the code readability.

Example:

\`\`\`typescript
enum DecodedCategory {
  BOOKS = 'B01',
  MOVIES = 'M01',
  MUSIC = 'MU01',
}
\`\`\`

Reference: https://contra.com/p/W3ol7m3o-enums-vs-string-literal-unions-in-type-script

### 4.7. Enum vs Objects with as const

Given the objects keeps the base code aligned with the state of JavaScript we are in favor of this approach instead of using enums.

The biggest argument in favour of this format over TypeScript’s enum is that it keeps your codebase aligned with the state of JavaScript, and when/if enums are added to JavaScript then you can move to the additional syntax.

Reference: https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums

### 4.8. Named Exports vs Default Exports

**We should always use named exports for components and utility functions**, as default exports have many downsides.
Default exports were introduced mostly for easier interoperability with thousands CommonJS modules that were exporting single values. They don’t bring many benefits when used internally in our codebase.

We want to be clear and objective about which components we provide in an assertive way.

Reference: https://stackoverflow.com/a/68665805

### 4.9. Developer Documentation

DT-DDS developer documentation is built with Storybook. Storybook documentation is composed by:

- Documentation pages
- Component stories

Both supports [MDX](https://github.com/mdx-js/mdx), which allows you to use Markdown syntax and JSX for more advanced components.

Add a file with \`.stories.mdx\` extension inside \`apps/docs\` directory, following the instructions on https://storybook.js.org/docs/6.5/react/writing-docs/mdx#documentation-only-mdx.
Afterwards, the page is included automatically in the documentation.

If you created custom components to import in the page or a lot of subpages, we recommend to create a sub-directory for all the files related to the page and subpages, including the MDX file(s). The page(s) will still be included automatically.

Note: On Storybook v6, documentation pages still use the \`.stories.mdx\` extension (otherwise they are not included). On v7 these pages can use \`.mdx\` extension.

#### How to add component stories?

In case you want to add documentation more complex than the usual component stories, add a \`.stories.mdx\` file alongside with the component inside \`packages/react-packages/<component>\`, or convert the current story in Component Story Format (CSF) to MDX format (see an example of the conversion on https://storybook.js.org/docs/6.5/react/writing-docs/mdx#mdx-flavored-csf).

For more information on how to write MDX stories see https://storybook.js.org/docs/6.5/react/writing-docs/mdx#writing-stories.

Note: MDX and CSF stories can't coexist in the same directory.

For more information on Storybook and Docs, read the following documentation and blog posts:

- https://storybook.js.org/addons/@storybook/addon-docs
- https://storybook.js.org/docs/6.5/react/writing-docs/introduction
- https://medium.com/storybookjs/storybook-docs-sneak-peak-5be78445094a
- https://storybook.js.org/tutorials/design-systems-for-developers/react/en/document/
- https://storybook.js.org/blog/structuring-your-storybook/

## 5. Versioning & Publishing Packages

New changes should be tracked using the [Semantic Versioning](https://semver.org/).

This project uses [Changesets](https://github.com/changesets/changesets) and [changeset-conventional-commits (forked - custom package)](packages/changeset-conventional-commits/README.md) to manage versions and create changelogs.

#### Workflow

- \`changeset-conventional-commits\`: Generates changesets based on conventional commits
- \`Changesets\`: Consumes the changesets in order to bump the packages version and it's dependencies
- \`changeset-conventional-commits\`: At last, commits the new packages version and changelogs with summary: \`release: version packages\` and tag it using the format: \`<package-name>@<package-version>\`

#### Generating the Changelog

To generate your changelog, run \`yarn changeset:add\` followed by \`yarn changeset:version\` locally, you'll have the changelogs generated from the conventional commits as follows:

\`\`\`markdown
# @package/example

## 1.0.0

### Major Changes

- fix(container)!: remove ability to specify the container background

### Minor Changes

- feat(button): add new property to enable different shadows

### Patch Changes

- docs: move Storybook to docs application
- docs: add support section in README
- docs: add Usage section on README
- fix: remove page components
\`\`\`

🛠 This is the default format provided by changesets, it's not so flexible to customize, however we have some room for improvement, check it out: [modifying the changelog formats](https://github.com/changesets/changesets/blob/main/docs/modifying-changelog-format.md)

#### Releasing

When you merge your code to the \`main\` branch, the pipeline will run the \`VersionAndTag\` step with \`yarn changeset:ci\` script defined in the root \`package.json\`:

\`\`\`bash
yarn changesets:add && yarn changesets:version && yarn changesets:tag
\`\`\`

Respectively runs:

\`\`\`bash
node scripts/changeset-plugin --add-changesets
\`\`\`

\`\`\`bash
changeset version
\`\`\`

\`\`\`bash
node scripts/changeset-plugin --add-tag
\`\`\`

Those commands will be responsible to:

- Generate changeset based on the last conventional commits since the last tagged version
- Bump packages with semver based on changeset files
- Commit generated \`CHANGELOG.md\` files and updated \`package.json\` files, adding the summary: \`release: version packages\`
  - Adds git-tag for the new packages version and push changes.

🛠 Finally after versioning and tagging, the pack and publish is done in the pipeline in the step \`BuildAndPublish\` by running the following commands for the \`@dt-dds/react\` package:

- \`yarn install\`
- \`yarn build\`
- \`yarn pack\`
- \`yarn publish\`

The \`BuildAndPublish\` step only runs if the previous \`VersionAndTag\` step has been run successfully

⚠️ All flagged 🚧 information on this file needs further review since might not be working as expected.\\
⚠️ All flagged 🛠 information on this file represents the current state but not the final, it needs to be improved.
`;function o(n){return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Contribution Guidelines"}),`
`,e.jsx(i,{children:r})]})}function b(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o()}export{b as default};
