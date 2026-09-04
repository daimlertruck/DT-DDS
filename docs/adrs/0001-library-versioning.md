# Decide version strategy for UI component library

- Status: Accepted
- Author: António Freire
- Deciders: Ana Pereira, Cátia Raminhos, João Pargana, António Freire
- Date: 28 February 2023

**Priority:** High

## Context and Problem Statement

Today, most UI components are versioned as part of the entire library.

That may conflict with the idea of composing modular UI applications:

- A developer that wants to adopt a specific component will have to introduce the whole library on a single version into their application; and
- Every component on a page must comply with this library version, as such it may introduce bottlenecks when migrating from major versions.

In that sense, versioning single UI Components, can provide more granular control over the composition of Applications.

However, it also introduces complexity and new tooling may be require to manage the many dependencies.

No matter the decision, we will version design tokens and icons, independently.

## Considered Options

- Version single library
- Version individual components

## Pros and Cons of the Options

### Version single library

#### Pros

- **Simpler** to manage the version
- There is more **confidence** that the group of **components** contained in the library are **compatible with one another**
- **Easier** to **sync** the **UI library** version with the **design tools** and **documentation**

#### Cons

- It may introduce **bottlenecks when migrating from major versions** (the teams are forced to migrate the whole library, instead of migrating component by component)
  - A good example is what happened with the migration from Workbench v5 to v7 - \~1,5 months dedicated to the migration
- Given tblx-uikit is not stable yet and we need to coordinate requirements from API Portal and eTruckReady FUSO, probably there will be a lot of breaking changes on the library
  - If, for example, the **API Portal team** wants to get the **latest version of the button component**, **needs to update all the library** which could:
    - have **unneeded and undesired updates**;
    - **break** the API Portal; and
    - mean **more efforts** to update the library on the API Portal team side

### Version individual components

#### Pros

- User developers (teams using the library) **only update what they need**
  - If, for example, the **API Portal team** wants to get the **latest version of the button component**, they just need to update that component
- User developers have **more granular control** over the composition of the Applications
- Developers of the UI library can **control when to make updates**

#### Cons

- **More complexity** to manage individual packages
  - Question: can this be mitigated by the tools we have available, like Changesets in Turborepo (https://turbo.build/repo/docs/handbook/publishing-packages/versioning-and-publishing)?
    - Yes. An example already @ tb.lx, even with pipelines setup: https://git.t3.daimlertruck.com/tblx/tblx-webkit
- **Can't ensure** library **compatibility among components** (given it's impossible to test against all the version combinations of all components in the library). This also implies to:
  - lose some consistency between components; and
  - have multiple versions of the same component in an application, in order to ensure compatibility among some components (e.g., If `Button v12` is the latest and greatest, but `Modal v4.3` relies on `Button v3.8`)
  - Question: how can we mitigate this?
    - Maybe with both strategies
- **Harder to sync** each **component version** with **design tools** and **documentation**
  - Question: how can we mitigate this? Versioning in design and documentation must be done also component by component?
    - Yes. An example of documentation tackling different versions for a component: https://auro.alaskaair.com/components/auro/button/releases

## Decision outcome

Given:

- the **flexibility** that versioning components can give;
- the **tools we have available** for versioning by component, both for the UI Library (like Changesets in Turborepo) and for the design and documentation, which **mitigate** the **complexity** of **managing individual packages** and the **sync of the UI library with design tools and documentation**, respectively; and
- the **impact in the API Portal** if we only have a single version for the whole library.

We decided to have **versioning both for the library and for each component,** which is technically possible, not too complex (when comparing to only have versioning by component), makes sense in terms of the flexibility (and scalability) we want to give in the future and also tackles the problem of the components consistency.

### Next steps:

- Implement the versioning strategy by components
  - Be inspired by: https://git.t3.daimlertruck.com/tblx/tblx-webkit
  - High-level sub-tasks:
    - Add package.json to each component
    - Setup Changeset in the project
    - Setup the build
    - Setup the pipeline for each component (with general validations first, and then build only the changed component and publish it to Artifactory)
    - Setup a code generator for new package components
- Discuss how to sync the UI library/components version with the design tools and documentation (involve designers on it!) and plan a strategy

## References:

- https://blog.bitsrc.io/versioning-independent-ui-components-why-and-how-7ea60d8be5f2
- https://bradfrost.com/blog/post/design-system-versioning-single-library-or-individual-components/
- https://medium.com/eightshapes-llc/versioning-design-systems-48cceb5ace4d
- https://blog.andri.co/006-versioning-and-publishing-getting-your-UI-library-into-your-users-hands/

### Examples of Design Systems with both approaches:

- https://github.com/contentful/forma-36
- https://github.com/zendeskgarden/react-components
- https://paste.twilio.design/
- https://react-spectrum.adobe.com/react-spectrum/index.html
- https://github.com/washingtonpost/wpds-ui-kit
