var a=Object.defineProperty;var o=(e,t)=>a(e,"name",{value:t,configurable:!0});import{t as i}from"./jsx-runtime-Br4tQxt1.js";import{n as r}from"./lib-Cj7JS-zf.js";import{c,s as d}from"./dist-EptLD9wu.js";var n=i(),l=`- [Prerequisites](#prerequisites)
- [📓 Installation](#-installation)
- [⚙️ DT-DDS current stack](#️-dt-dds-current-stack)
  - [Useful Commands](#useful-commands)
- [Apps \\& Packages](#apps--packages)
- [GitHub Workflow](#github-workflow)
  - [Issue creation](#issue-creation)
    - [Bug Reports](#bug-reports)
    - [Feature Requests](#feature-requests)
    - [Issue Etiquette](#issue-etiquette)
  - [The Board structure](#the-board-structure)
  - [Triage \\& Refinement process](#triage--refinement-process)
    - [Definition of Ready](#definition-of-ready)
  - [Pull Request Lifecycle](#pull-request-lifecycle)
    - [Definition of Done](#definition-of-done)
  - [Visual Management (Labels vs. Board)](#visual-management-labels-vs-board)
    - [Labels Categorization](#labels-categorization)
- [Coding Standards and Guidelines](#coding-standards-and-guidelines)
  - [Branch Naming Convention](#branch-naming-convention)
  - [Commits](#commits)
    - [Developer Certificate of Origin (DCO)](#developer-certificate-of-origin-dco)
    - [Message Convention](#message-convention)
    - [Strategy](#strategy)
    - [References](#references)
  - [Pull Requests](#pull-requests)
    - [Name Convention](#name-convention)
    - [Preview Link](#preview-link)
    - [Work in Progress](#work-in-progress)
    - [Code Reviews](#code-reviews)
      - [Continuation of Pull Request](#continuation-of-pull-request)
      - [Merging the Pull Request](#merging-the-pull-request)
  - [Code Standards \\& Good Practices](#code-standards--good-practices)
    - [Start developing on DT-DDS](#start-developing-on-dt-dds)
    - [Library Compilation](#library-compilation)
    - [How to build a component from scratch](#how-to-build-a-component-from-scratch)
    - [When to use Types / Interfaces](#when-to-use-types--interfaces)
    - [Compound components pattern](#compound-components-pattern)
    - [Enum vs String literals unions](#enum-vs-string-literals-unions)
    - [Enum vs Objects with as const](#enum-vs-objects-with-as-const)
    - [Named Exports vs Default Exports](#named-exports-vs-default-exports)
    - [Developer Documentation](#developer-documentation)
    - [Prop Forwarding in Styled Components](#prop-forwarding-in-styled-components)
      - [How to add component stories?](#how-to-add-component-stories)
  - [Versioning \\& Publishing Packages](#versioning--publishing-packages)
      - [Workflow](#workflow)
      - [Releasing](#releasing)

# Prerequisites

- Node.js >= v22
- Yarn v1

# 📓 Installation

- Clone the repo
- \`yarn\` for package install

# ⚙️ DT-DDS current stack

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [React](https://reactjs.org/) — JavaScript library for user interfaces
- [Emotion](https://emotion.sh/docs/introduction) — for writing css styles with JavaScript
- [Storybook](https://storybook.js.org/) — UI component environment powered by Vite
- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [React Testing Library](https://testing-library.com/) - to test UI components in a user-centric way
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Changesets](https://github.com/changesets/changesets) for managing versioning and changelogs
- [changeset-conventional-commits (forked - custom package)](https://github.com/iamchathu/changeset-conventional-commits) for automatically generating changesets based on conventional commits
- [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by esbuild
- [Yarn](https://yarnpkg.com/) from managing packages
- [Turbo-gen](https://turbo.build/repo/docs/core-concepts/monorepos/code-generation#writing-generators)/[Plop](https://plopjs.com/documentation/) for custom generators

## Useful Commands

- \`yarn build\` - Build all packages, including the Storybook site
- \`yarn dev\` - Run all packages locally
- \`yarn lint\` - Lint all packages
- \`yarn clean\` - Clean up all \`node_modules\` and \`dist\` folders (runs each package's clean script)
- \`yarn format\` - Format all TypeScript, TypeScript with JSX, and Markdown files based on prettier
- \`yarn test\` - Run tests for all packages
- \`yarn changesets:add\` - Generates changesets based on conventional commits
- \`yarn changesets:version\` - Consumes all changesets, and updates to the most appropriate semver version based on those changesets. It also writes changelog entries for each consumed changeset
- \`yarn changesets:tag\` - Commits the newly created changelogs with the latest packages version and adds the git-tag as \`<package-name>@<package-version>\`
- \`yarn changesets:ci\` - Runs the whole changesets flow, useful for pipelines to generate changesets, versioning and tags
- 🚧 \`yarn release\` - Build all packages and run npm publish in each package that is of a later version than the one currently listed on npm

# Apps & Packages

This Turborepo includes the following packages and applications:

- \`apps/docs\`: Developer documentation site, built with Storybook
- \`examples/with-nextjs-pages-router\`: Usage example of DT-DDS in a Next.js app (with pages router)
- \`packages/dt-ui-react\`: Parent React library
- \`packages/react-packages\`: React components
- \`packages/tsconfig\`: Shared \`tsconfig.json\`s used throughout the Turborepo
- \`packages/eslint-config-custom\`: ESLint preset
- \`packages/jest-config\`: Shared jest configuration file
- \`packages/changeset-conventional-commits\`: Changeset plugin used to automatically generate changesets and tagging versions

# GitHub Workflow

## Issue creation

⚠️ Before opening a Pull Request, please create an issue.

You can use one of the templates mentioned below, for bugs and features, or use the blank one for questions or other topics. For the last type, the issues will be double checked by the maintainers/contributors to help the author.

**Who can create issues?** Everyone, since it's following the correct template for the desired request.

**Issues created should strictly follow the templates, the required fields are mandatory and can invalidate the issue if not present.**

### Bug Reports

If you've encountered a bug in our project, please follow these steps to report it:

1. **Search Existing Issues:** Before creating a new issue, please search the [existing issues](https://github.com/daimlertruck/DT-DDS/issues) to check if the bug has already been reported. If you find a similar issue, you can add a comment to provide additional details.

2. **Create a New Issue:** If you couldn't find an existing issue, [create a new issue](https://github.com/daimlertruck/DT-DDS/issues/new/choose) and use the ["Bug report" template](<(./.github/ISSUE_TEMPLATE/bug_report.yml)>). Provide as much detail as possible, including steps to reproduce, expected behavior, and actual behavior. Screenshots, error messages, and relevant code snippets are highly appreciated.
   - After creating, the issue will have automatically the following labels: \`type:feature\` and \`status:triage\`

### Feature Requests

To propose a new feature:

1. **Search Existing Requests:** First, search the [existing issues](https://github.com/daimlertruck/DT-DDS/issues) to see if the feature has already been suggested. You can upvote and add your insights to existing feature requests.

2. **Create a New Issue:** If your feature idea hasn't been proposed yet, [create a new issue](https://github.com/daimlertruck/DT-DDS/issues/new/choose) and use the ["Feature request" template](<(./.github/ISSUE_TEMPLATE/feature_request.yml)>).
   - After creating, the issue will have automatically the following labels: \`type:bug\` and \`status:triage\`
   - There is a case where the issue is not ready to be picked up (missing design, RFC, triage) but the component is urgent for your product: it should be created in the scope of your product at first.

### Issue Etiquette

- Be respectful and considerate when commenting on issues.
- Please **do not** post comments consisting solely of "+1" or ":thumbsup:".
  Use [GitHub's "reactions" feature](https://blog.github.com/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/)
  instead.
- Provide additional information promptly if requested by maintainers.

## The Board structure

Our [project board](https://github.com/orgs/daimlertruck/projects/1) acts as the single source of truth for the status of all work items.

| **Column**      | **Description**                                                                                                                                                                                                                                                                                                                                                                    | **Owner**                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **Triage**      | **The Landing Zone.** All new issues arrive here automatically. They may be labelled as bug, feature, or question based on the template used.                                                                                                                                                                                                                                      | **Maintainers & Contributors** |
| **Backlog**     | **To Be Refined.** Validated issues that need prioritization or scoping. Work does not start here.                                                                                                                                                                                                                                                                                 | **Maintainers Only**           |
| **Ready**       | **Ready to be picked up.** Issues with clear requirements and approved scope. Contributors can assign themselves to these tasks.                                                                                                                                                                                                                                                   | **Maintainers & Contributors** |
| **In Progress** | **Active Work.** Tasks currently being worked on.                                                                                                                                                                                                                                                                                                                                  | **Assignee**                   |
| **In Review**   | **PR Open.** Automatically moved here when a Pull Request is linked to the issue.<br><br>⭐️ Good practices:<br>- Target review time is 2 - 3 business days<br>- Required approvals: 2 developers, at least 1 of them is a maintainer<br>- Check the PR list and contribute with your review before taking a new task to work<br>- Contributors reviews are welcome and encouraged | **Reviewers**                  |
| **Done**        | **Shipped.** Automatically moved here when the PR is merged.                                                                                                                                                                                                                                                                                                                       | **System**                     |

## Triage & Refinement process

To ensure high quality and clarity, every issue goes through a strict triage process before code is written.

⚠️ Please only pickup issues with the label "status:ready" and in the "Ready" column of the board.
Change the issue label to "status:in progress" (remove "status:ready") and assign to you, when picking it up.

ℹ️ You can see [here](./MAINTAINERS.md#triage--refinement-process) more details of the process done by maintainers.

### Definition of Ready

_All things that are needed for a Task/issue before it is moved into ready status_

- Designs needs to be accessible (when applicable)
- Designer team validation for new components/refactors changing UI/UX aspects
- No known impediments that don't allow the task to be finished
- Descriptions and context given
- Acceptance Criteria defined
- Latest UX/UI attached and without open clarifications
- If it's a new component or a new feature inside a current component: it has an associated approved RFC (see [RFC Template](./docs/rfcs/0000-template.md))
- The Task/issue has been refined and agreed by the team
- The Task has been assigned to the correct epic (when applicable)

## Pull Request Lifecycle

- **In Review**: When you open a Pull Request, ensure you link it to the issue (e.g., "Closes #123"). Change the issue label to "status:in review".
- **Done**: Once the PR is merged into the main branch, the issue automatically moves to Done.

### Definition of Done

_All things that need to be done before a Task is moved to done_

- Acceptance criteria fulfilled
- Tests implemented & run successfully
- Supports Localisation (if applicable) & A11y
- Storybook updated, with all flow cases (states), behaviour documentation, code snippet and specifications of the component
- Component spec created/updated (see [Component spec template](./turbo/generators/new-component-package/templates/README.md.hbs)) together with the code, based on the corresponding RFC
- Quality gates passed successfully (SonarQube & BlackDuck)
- PR approved by 2 or more developers
  - At least, one of them is a maintainer
- Code merged, deployed and available to users

## Visual Management (Labels vs. Board)

To ensure visibility for both Maintainers (who use the Board) and Contributors (who browse the Issues List), we use a **Label-State Synchronization** system.

Every column on the Board corresponds to a specific status label on the issue.

| **Board Column** | **Issue Label**        | **Description**                                                                              | **Who Acts?**              |
| ---------------- | ---------------------- | -------------------------------------------------------------------------------------------- | -------------------------- |
| **Triage**       | status: triage 🟤      | **The Landing Zone.** Needs categorization to be done manually                               | Maintainers                |
| **Backlog**      | status: backlog 🟠     | **To Be Refined.** Validated issues waiting for prioritization and/or clear scope.           | Maintainers                |
| **Ready**        | status: ready 🟢       | **Ready to be picked up.** Issues with clear requirements and approved scope. Ready for dev. | Contributors & Maintainers |
| **In Progress**  | status: in progress 🔵 | **Active Work.** Someone is currently working on this.                                       | Assignee                   |
| **In Review**    | status: in review 🟣   | **PR Open.** A Pull Request is linked and under review.                                      | Reviewers                  |
| **Done**         | (No status label)      | **Shipped.** The issue is closed.                                                            | System                     |

### Labels Categorization

- **Status labels**: defined by the prefix "status: xxx", and help to control the issue lifecycle
- **Type labels**: defined by the prefix "type: xxx" and control the nature of the issue
- **Priority labels**: labels from p0 to p3 are used to determine the priority according to the priority matrix
- Other labels might be created to create granularity identifying the issues as we need

# Coding Standards and Guidelines

This guide is intended to support the developers by providing a set of programming conventions, style and best practices to follow on DT-DDS.

## Branch Naming Convention

New branches should follow the name pattern \`{type}/{issue-nr}/{description-in-kebab-case}\` (example: \`feature/XXX/new-feature\`). When there is no issue, replace \`{issue-nr}\` for \`NO-ISSUE\`.

**Note:** The rule should be to always have an issue created for each task.

## Commits

### Developer Certificate of Origin (DCO)

A [Developer Certificate of Origin (DCO)](https://developercertificate.org/) is a simple mechanism that authors use to affirm they have the right to contribute their code under the project’s license.

Every Commit you submit needs a \`Signed-off-by: Your Name <you@example.com>\` trailer. The easiest way to achieve this is by adding the \`-s\` / \`--signoff\` flag to \`git commit\`. For ease of convenience, we also provide a Husky hook which will automatically append a DCO “Signed-off-by” trailer to every commit message if one isn’t already present.

By submitting commits with a valid \`Signed-off-by\` line, you agree that your contribution is covered by the MIT license.

### Message Convention

All commit messages should follow [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) specification.  
The message should be structured as follows:

\`\`\`
<type>[optional scope]: <description>

[optional body]
\`\`\`

The commit title has a limit of 50 characters. **Description** should be written in the present tense (**change**, not **changed** or **changes**), to be consistent with generated messages from commands like git merge.

Even though the **body** is optional, the developer should always consider adding one so that the project has a more clear and detailed commit history for anyone to follow. Each line of **body** should be wrapped at 72 characters.

### Strategy

- Avoid mixing concerns, commits should be “atomic”. For example, creating two different components should produce two separate commits.
- Commits should never crash the application. For example, a refactor that changed a payload of a request, needs to be applied to all places in the same commit. It's the same for tests, should be added in the same commit of the feature/fix, etc.

### References

For more information on how to commit, read the following documentation and blog posts:

- [How to Write a Git Commit Message](https://cbea.ms/git-commit/)
- [Git Commit Best Practices](https://gist.github.com/luismts/495d982e8c5b1a0ced4a57cf3d93cf60)
- [Help him!! Help your code reviewer.](https://leidsoncruz.github.io/post/help-him-help-your-code-reviewer/)

## Pull Requests

### Name Convention

Pull Requests (PRs) should be opened with the following title structure \`{type}: {description}\`, for example: \`feat: PR description\`.
The project already includes a [PR template](./.github/pull_request_template.md) that should be correctly filled in.

### Preview Link

After a PR is opened, a deploy to the github pages gets triggered and a Preview Link is added to the PR description. This will enable developers and designers to see the changes and review accordingly.

### Work in Progress

When creating a PR that is not ready to be reviewed, open it as a [Draft Pull Request](https://github.blog/2019-02-14-introducing-draft-pull-requests/). Furthermore, the PR title should include the \`[WIP]\` tag in the beginning, for example: \`[WIP] feat: PR description\`.

### Code Reviews

Every PR should be reviewed and approved by at least two reviewers before being merged to the main branch.

As a contributor organise yourself and try to ideally review the pending PR's in the first 24h. 💡

After each review, and every time the developer need to perform a fix on a branch, fixes related to a commit should reference the same commit using [fixup commit](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---fixupamendrewordltcommitgt). This allows the reviewers to track the changes easier and keeps clean and clear commit history.

#### Continuation of Pull Request

As a rule of thumb the code author is also the PR assignee. "Assignees are responsible for making sure the pull request is not blocked. They are responsible for making sure the pull request progresses."

Check it out the [useful PR guidelines by MDN](https://developer.mozilla.org/en-US/docs/MDN/Community/Pull_requests)

#### Merging the Pull Request

After the review process is completed and before merging the branch, all discussions **must** be resolved by the one that opened them. This way, everyone is aware if the discussion is finished or if there is something pending. Besides that, and after merging the branch, the developer should also rebase the branch with the main/develop branch using the \`autosquash\` option, so that all fixups' commits are squashed with its respective parent commit.

Even if the PR is approved by the assignees, the comments made by other contributors must be considered;

After all of this, the branch is ready to be merged using \`rebase and merge\`.

## Code Standards & Good Practices

It is important to follow certain coding guidelines and standards to maintain consistency across the project's code base.

### Start developing on DT-DDS

Please only pickup issues with the label "status:ready" and in the "Ready" column of the board.
Change the issue label to "status:in progress" (remove "status:ready") and assign to you, when picking it up.

### Library Compilation

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

### How to build a component from scratch

Components are independent packages that should be created in the workspace \`packages/react-packages/**\`

1. Run \`yarn generate:component\`

2. You will be asked for a package name (in kebab-case)

3. A component package with a boilerplate will be created in the workspace \`react-packages\` 🎉

4. All the integration with storybook and \`dt-dds-react\` main library will be provided automatically.

### When to use Types / Interfaces

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

### Compound components pattern

We must use this pattern when creating components that are composable, not all the cases will apply this pattern, but for example cases where we have a main component that depends on other parts such as:

- Menu depends on items;
- Dropdown depends on items;
- Table depends on headers, columns, rows, footers
- ...

**Why?**

Compound components manage their own internal state, which they share among the several child components. When implementing a compound component, we don’t have to worry about managing the state ourselves.

When importing a compound component, we don’t have to explicitly import the child components that are available on that component.
Reference: https://www.patterns.dev/react/compound-pattern/

### Enum vs String literals unions

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

### Enum vs Objects with as const

Given the objects keeps the base code aligned with the state of JavaScript we are in favor of this approach instead of using enums.

The biggest argument in favour of this format over TypeScript’s enum is that it keeps your codebase aligned with the state of JavaScript, and when/if enums are added to JavaScript then you can move to the additional syntax.

Reference: https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums

### Named Exports vs Default Exports

**We should always use named exports for components and utility functions**, as default exports have many downsides.
Default exports were introduced mostly for easier interoperability with thousands CommonJS modules that were exporting single values. They don’t bring many benefits when used internally in our codebase.

We want to be clear and objective about which components we provide in an assertive way.

Reference: https://stackoverflow.com/a/68665805

### Developer Documentation

DT-DDS developer documentation is built with Storybook. Storybook documentation is composed by:

- Documentation pages
- Component stories

Both supports [MDX](https://github.com/mdx-js/mdx), which allows you to use Markdown syntax and JSX for more advanced components.

Add a file with \`.stories.mdx\` extension inside \`apps/docs\` directory, following the instructions on https://storybook.js.org/docs/6.5/react/writing-docs/mdx#documentation-only-mdx.
Afterwards, the page is included automatically in the documentation.

If you created custom components to import in the page or a lot of subpages, we recommend to create a sub-directory for all the files related to the page and subpages, including the MDX file(s). The page(s) will still be included automatically.

Note: On Storybook v6, documentation pages still use the \`.stories.mdx\` extension (otherwise they are not included). On v7 these pages can use \`.mdx\` extension.

### Prop Forwarding in Styled Components

When using \`@emotion/styled\`, props passed to styled components are forwarded to the underlying DOM element by default. This can cause React warnings for non-standard DOM attributes and potential issues.

Use the \`$\` prefix convention for \`styling-only\` props combined with shouldForwardProp to prevent them from being forwarded to the DOM.

Recommended approach - Use \`$\` prefix with \`shouldForwardProp\`:

\`\`\`jsx
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

interface ButtonProps {
  $isDisabled: boolean;
  $size: 'small' | 'large';
}

const Button =
  styled('button', {
    shouldForwardProp: (prop) => isPropValid(prop) && !prop.startsWith('$'),
  }) <
  ButtonProps >
  \`
  /* styles using $isDisabled, $size */
\`;
\`\`\`

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

## Versioning & Publishing Packages

New changes should be tracked using the [Semantic Versioning](https://semver.org/).

This project uses [Changesets](https://github.com/changesets/changesets) and [changeset-conventional-commits (forked - custom package)](packages/changeset-conventional-commits/README.md) to manage versions and create changelogs.

#### Workflow

- \`changeset-conventional-commits\`: Generates changesets based on conventional commits
- \`Changesets\`: Consumes the changesets in order to bump the packages version and it's dependencies
- \`changeset-conventional-commits\`: At last, commits the new packages version and changelogs with summary: \`release: version packages\` and tag it using the format: \`<package-name>@<package-version>\`

#### Releasing

When you merge your code to the \`main\` branch, the pipeline will run the \`Version and Tag\` workflow with \`yarn changeset:ci\` script defined in the root \`package.json\`:

\`\`\`bash
yarn changesets:add && yarn changesets:version && yarn changesets:tag
\`\`\`

Respectively runs:

\`\`\`bash
node scripts/changeset-plugin --add-changesets
\`\`\`

\`\`\`bash
changeset version --preid beta
\`\`\`

\`\`\`bash
node scripts/changeset-plugin --add-tag
\`\`\`

Those commands will be responsible to:

- Generate changeset based on the last conventional commits since the last tagged version
- Bump packages with semver based on changeset files
- Commit generated \`CHANGELOG.md\` files and updated \`package.json\` files, adding the summary: \`release: version packages\`
  - 🛠 Default format for CHANGELOG.md provided by changesets is not flexible to customize, however we have some room for improvement, check it out: [modifying the changelog formats](https://github.com/changesets/changesets/blob/main/docs/modifying-changelog-format.md)
  - Adds git-tag for the new packages version and push changes.

Finally after versioning and tagging, the pack and publish is done in the \`Publish\` workflow by running the following commands for the changed packages:

- \`yarn install\`
- \`yarn build\`
- \`yarn pack\`
- \`yarn publish\`

The \`Publish\` workflow only runs if the \`Version and Tag\` workflow has been run successfully (there was a release commit).

⚠️ All flagged 🛠 information on this file represents the current state but not the final, it needs to be improved.
`;function s(e){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(c,{title:"Contribution Guidelines"}),`
`,(0,n.jsx)(d,{children:l})]})}o(s,"_createMdxContent");function g(e={}){const{wrapper:t}={...r(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(s,{...e})}):s(e)}o(g,"MDXContent");export{g as default};
