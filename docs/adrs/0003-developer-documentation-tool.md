# Decide on Developer Documentation Tool to use

- Status: Accepted
- Author: Cátia Raminhos
- Deciders: Ana Pereira, António Freire, Cátia Raminhos, Diogo Costa, Joel Pereira, Leidson Cruz, Masoud Soleymani, Tiago Mendes
- Date: 21 August 2023

**Priority**: High

## Context and Problem Statement

We want to provide a comprehensive guide on how to use the design system and the components library, to help the developers to deliver a consistent look and feel across all brands, and a consistent customer experience across all of our products; and also on how the external developers can contribute to the design system.

We need to select the **tool** to create this **developer documentation**.

The **requirements** for the documentation tool are (which helped to filter the documentation tools, in a first phase):

- Must allow versioning
- Must allow to search in the documentation
- Integration with Storybook is a nice to have
- Preference for MDX files, to be able to reuse some files from Storybook
- Ease of use
- Must be open source
- Must be Daimler compliant (e.g., licenses)
- Need to be protected by Daimler Truck SSO (i.e., can't be public)

To make an informed decision, **we must carefully weight** the following:

- **Ease of use**: how easy it is to add content and customise the documentation to our needs, and to add versioning. This should be balanced with flexibility.
- **Flexibility**: how flexible the tool is regarding the content, customisation and structure, according to our needs.
- **Integration with Storybook**: how seamless the integration is with Storybook
- **Reusability**: how easy it is to reuse the markdown files we already have
- **Integration with the current work model**: how easy it is to integrate the tool in the current work model and processes, and tools we have
- **Dependencies and Maintenance:** Examine the dependencies introduced by each approach. Relying heavily on external libraries might lead to increased maintenance overhead, version compatibility issues, and potential security vulnerabilities. It could be ok, if the library provides more benefits than the costs of maintaining the dependency.
- **Learning Curve:** Evaluate the learning curve for developers adopting each approach. Minimizing complexity can enhance productivity, while leveraging external libraries may require familiarization with their APIs and conventions.
- **Collaboration between design and engineering**: can the designers easily contribute to the documentation?
- **Community support and documentation**: how good the community support and documentation are, when we need help or have doubts regarding the tool

Therefore, the POCs must include:

- A "Welcome" page, with dummy content and images of DT UI (to test out customisation and flexibility, and the creation of documentation without code/components snippets)
- A page that includes the "CONTRIBUTING.md" file (to test the inclusion of existing documentation)
- "Foundations" section, with a dummy page as a child (to test the flexibility of the structure)
- "Buttons" section, with an "Overview" page and some stories related with the button. The "Overview" page must include snippets from stories and the props, for some stories of the "Button" (to test the integration with Storybook Stories)
- Customise according to DT UI style (the most basic ones, just to test): colors, customised logo
- A way to search through the pages
- Versioning: a version for "alpha", another one for "beta" and, also, for "development"

## Considered Options

(before starting the POCs phase, it was created a list with more options, which were filtered afterwards according to documentation tool's requirements. You can see a full list here, with the corresponding features: https://daimlertruck-shared-cmk-8.atlassian.net/wiki/spaces/DTUI/pages/123109650/Developer+Documentation+Tools)

- [Storybook](https://storybook.js.org/) + [Docs](https://storybook.js.org/addons/@storybook/addon-docs) add-on + [Versioning](https://storybook.js.org/addons/@panosvoudouris/addon-versions) add-on
- [Antora](https://antora.org/)
- [Docusaurus](https://docusaurus.io/)
- [Docsify](https://docsify.js.org/)

## Pros and Cons of the Options

### Storybook + Docs add-on + Versioning add-on

https://git.t3.daimlertruck.com/CRAMINH/storybook-docs-poc

#### Pros

- **It's very easy to add new pages**, by adding MDX files, and to customise them, by using JSX components (we can also use emotion, out of the box!)
- It's **very easy to setup a basic theme for Storybook**, and it also provides the **flexibility for more advanced customisation** of the theme and of the generated documentation from MDX files
  - Storybook provides some options to **customise the basics of the theme**, like the logo, font, primary color, **in a very easy way**
  - If we want to **change how the documentation is generated from the MDX files**, we can also override the components for the headings, paragraphs, etc., by using JSX components. This gives a lot of **flexibility**.
- We can **add the sections and subsections we want**
- **Seamless integration with Storybook**. We can display just a Story, a Playground with several stories or only one story, or Props, or everything
- **It's possible and easy** to **include existing markdown** (MD and MDX) files.
- We can still use the same GitHub page and the same release process as before (with some minor adaptations, in case we implement versioning). The documentation will also be kept in the same repository, and the components' documentation can be side by side with the components.
- We would only need to add plugins to customise the theme and for versioning (which are small dependencies). Besides that, **no need to add additional libraries**, given we are already using Storybook.
- Given we are already using Storybook, the only learning curve will be with MDX. Still, MDX is markdown (which most of the developers are familiar with) with the possibility to use JSX inside, and import JSX components (that can use emotion). Overall, we are **keeping the same stack for the documentation, which will help in the productivity**.
- Storybook has a **strong community** (you can reach for help on GitHub, StackOverflow), and besides the official **documentation**, which is **very complete**, there are some articles, tutorials, and even answers on GitHub issues.

#### Cons

- If we want to do more complex customisations of the Storybook Theme, these includes **overriding styles** for CSS classes that **can change overtime** (i.e., between Storybook releases)
- There are some **limitations** in how we can control the **order of the sections and subsections** (given we need to set the order in a array, like the example below). Still, for the **most of the cases**, it's **enough**.

```js
order: ['Welcome', 'Contribution Guidelines', 'Foundations', 'Buttons', '*'];
```

- The **built-in search** has some **limitations**, given it only allows to search by the name of the page or section
- No versioning out-of-the-box
  - There is no built-in version management on Storybook
  - The **versioning add-on** (https://storybook.js.org/addons/@panosvoudouris/addon-versions) **does not work** with Storybook v6 and with GitHub pages (see https://github.com/panosvoudouris/storybook-addon-versions/issues)
  - Still, **we can develop an internal add-on**, based on:
    - The existing one, adapted to our needs (and we can even try to have a dropdown in the toolbar to select from the available versions); or
    - Other tutorials, like this one https://dev.to/kiranmantha/how-to-create-a-custom-toolbar-addon-for-storybook-5e2e.
      - This last one seems a good start for what we need and simple to implement.
      - Therefore, **the only disadvantage is the additional development of the add-on and its \*\***maintenance, and additional steps in the current pipeline\*\*.

### Antora

https://git.t3.daimlertruck.com/CRAMINH/antora-poc

#### Pros

- Very **flexible** in terms of **theme customisation**, **the sections and subsections we want to add**, how navigation bar is organised (i.e., the order the pages and sections appear)
- We already have some teams **inside tb.lx** using and with **experience** with Antora, so we can ask support from them
- It's possible to **search** by the **pages and sections' names**, but also the **contents**, with a good experience (e.g., searched term is highlighted in the search results)
- During the build time, it generates all the subdirectories, corresponding to the **versions**, **automatically from the branches**, according to the configuration
  - Also includes a menu to change between versions

#### Cons

- There is **some learning curve** to learn Antora documentation structure and AsciiDoc
- The **documentation and sections** **must follow the structure imposed **by Antora, with the modules and pages, with yaml files (this could also be viewed as a benefit, given it also gives some structure to the documentation)
- If we just want to **customise** simple things, like the **brand color** or the **logo**, **we cannot do it as simple as changing the value of a property**. We need to provide the file to override the original one, from the UI.
- **Markdown** files are **not well interpreted** by Antora. Possible options to solve this:
  - During the documentation build process convert Markdown files to AsciiDoc and include them in the documentation;
  - Convert all the Markdown files to AsciiDoc, and start using AsciiDoc version; or
  - Duplicate the content
- **Not possible to include Stories and Props from Storybook**, given GitHub doesn't allow it: "Refused to frame '...' because an ancestor violates the following Content Security Policy directive: "frame-ancestors 'none'"." ; and Antora does not support oEmbed. We are only able to add a link to reference the Storybook.
  - We can try to solve the issue, by hosting Storybook in a place without that Policy, like our own Azure
- Probably, we would need to have a subdirectory for Antora documentation on GitHub pages or, in case we don't want it, have the developer documentation in a separate repository
- We are adding an additional dependency to maintain
- **Documentation** is a little **confusing** and not easy to follow
- It's **not so popular or does not have as much support** (not a lot of articles and tutorials) **has the other alternatives**. Still, you can reach out to the Antora team and the community, through GitLab issues.

### Docusaurus

https://git.t3.daimlertruck.com/CRAMINH/docusaurus-poc

#### Pros

- **It's very easy to add new pages**, by adding MDX files, and to customise them, by using JSX components (we can also use emotion, if we install the corresponding packages! Still, it's not supported, officially: https://docusaurus.io/docs/styling-layout#css-in-js)
- We can **add the sections and subsections we want**
- **It's possible and easy** to **include existing markdow**n (MD and MDX) files.
- It's **very easy to setup a basic theme for Docusaurus**, and it also provides the **flexibility for more advanced customisation** of the theme
  - Docusaurus provides some options to **customise the basics of the theme**, like the logo, primary color, **in a very easy way**
  - If we want to **change more advanced parts of the theme**, we can also override the stable CSS classes provided by Docusaurus (https://docusaurus.io/docs/styling-layout#theme-class-names) or the components for the header, footer, etc., by using JSX components. This gives a lot of **flexibility**.
- MDX is markdown (which most of the developers are familiar with) with the possibility to use JSX inside, and import JSX components (that can use emotion). Overall, we are **keeping the same stack for the documentation, which will help in the productivity**.
- It's possible to **search** by the **pages and sections' names**, but also the **contents**, with a good experience (e.g., searched term is highlighted in the search results)
- Docusaurus has a **strong community** (you can reach for help on GitHub, StackOverflow), and besides the official **documentation**, which is **very complete**, there are some articles, tutorials, and even answers on GitHub issues.
- Versioning out-of-the-box
  - We explicitly freeze a version, by calling a Docusaurus command, which will be copied to a "versioned_docs" directory
  - The documentation in the usual "docs" directory is considered as "next" version or work in progress version
  - All versions coexist in the documentation directory vs. having a version of the documentation per branch (like Antora does)
  - Version dropdown out-of-the-box and displays the version in the pages, automatically

#### Cons

- **Not possible to include Stories and Props from Storybook**, given:
  - It's not possible to use DT UI components to be used with the Storybook's components, like Stories, Props, Canvas, etc. (a lot of errors)
  - GitHub doesn't allow to be embed in iframes: "Refused to frame '...' because an ancestor violates the following Content Security Policy directive: "frame-ancestors 'none'"." ;
  - Docusaurus does not support oEmbed.
  - **We are only able to add a link to reference the Storybook story**.
  - We can try to solve the issue, by hosting Storybook in a place without that Policy, like our own Azure
- Probably, we would need to have a subdirectory for Docusaurus documentation on GitHub pages or, in case we don't want it, have the developer documentation in a separate repository
- We are adding an additional dependency to maintain
- The search also implies an additional plugin (we can't use the built-in search because it only works if the documentation is public to everyone)

### Docsify

https://git.t3.daimlertruck.com/CRAMINH/docsify-poc

#### Pros

- **It's very easy to add new pages**, by adding MD files
- We can **add the sections and subsections we want**
- Can **include** other **MD** files
- All developers are familiar with Markdown
- It's **very easy to setup a basic theme for Docsify**, and it also provides the **flexibility for more advanced customisation** of the theme
  - Docsify provides some options to **customise the basics of the theme**, like the logo, primary color, **in a very easy way**
  - If we want to **change more advanced parts of the theme**, we need to install a plugin: https://docsify.js.org/#/themes?id=other-themes.
- It's possible to **search** by the **pages and sections' names**, but also the **contents**, with a good experience (e.g., searched term is highlighted in the search results)
- The **version management** works as similar as Docusaurus: we **use directories for each version**
  - All versions coexist in the same documentation directory vs. having a version of the documentation per branch (like Antora does)
  - Includes a version dropdown (the styles need to be adjusted, though) and the possibility to display the version
- Docsify has a **good community** (you can reach for help on GitHub, StackOverflow; still not so good as Docusaurus or Storybook), and besides the official **documentation**, which is** complete**, there are some articles, tutorials, and even answers on GitHub issues.

#### Cons

- Does **not support MDX** files
- **Cannot include MD files outside the documentation directory.** How to solve this:
  - In the build process, copy the files we are interested in; or
  - Duplicate content
- **Not possible to include Stories and Props from Storybook**, given:
  - Does not support MDX
  - GitHub doesn't allow to be embed in iframes: "Refused to frame '...' because an ancestor violates the following Content Security Policy directive: "frame-ancestors 'none'"." ;
  - Docsify does not support oEmbed.
  - **We are only able to add a link to reference the Storybook story**.
  - We can try to solve the issue, by hosting Storybook in a place without that Policy, like our own Azure
- Probably, we would need to have a subdirectory for Docsify documentation on GitHub pages or, in case we don't want it, have the developer documentation in a separate repository
- We are adding an additional dependency (through CDN) to maintain
- Additional plugin to customise the theme, for the search and versioning (through CDN)

## Decision outcome

We decided to use **Storybook** (with the Docs add-on and the versioning add-on - to be built by us), given:

- it's the simplest solution, with less effort, and, for now, it supports all the requirements and the nice-to-haves (like having a Playground)
  - the trade-off is that the documentation could look like the other Storybooks, even with the style customisations
- we don't need to manage an additional dependency, besides Storybook
- all the team is already familiarised with Storybook. The learning curve will only be on MDX (which is Markdown with support for React components). This will imply in more productivity when documenting the design system.
- we don't need to update documentation on an additional tool, changing the current workflow; everything is already integrated in Storybook and the component documentation is side by side with the component itself. This will also imply in more productivity.

In the future, when we have a more mature design system, in case we feel the need to have more identity in the look or there is other feature missing, we can reassess other tools like Docusaurus and how we can enable Playgrounds there.

### Next steps:

- Setup Storybook to be used with Docs add-on (including basic structure, i.e., where the standalone docs will be)
  - Add Contribution Guidelines page (integrate existing CONTRIBUTING.md)
  - Add Foundations section (with existing Colors section as subsection)
- Setup Storybook CI
- Customise Storybook with DT UI brand → needs input from design & engineering
- Add Welcome page → needs input from design & engineering
- Define other Foundations sub-sections → defined by design & engineering
- ...

#### Later:

- Setup Storybook versioning (in case there is the need to support different versions of the documentation)

## References

### Some examples of developer documentation of design systems:

- [Salesforce](https://design-system-site-spring-23.herokuapp.com/)
- [Polaris Shopify](https://polaris.shopify.com/)
- [Atlassian](https://atlassian.design/)
- [Ant Design](https://ant.design/)

### Storybook:

- Theme customisation (for simpler customisations): https://storybook.js.org/docs/6.5/react/configure/theming#create-a-theme-quickstart
- Complex customisations, with CSS overrides: https://storybook.js.org/docs/6.5/react/configure/theming#css-escape-hatches
- Example of Storybook with a lot of customisations (where we can get inspiration): https://github.com/mondaycom/monday-ui-react-core
- Tutorial on how to create an add-on to add a dropdown in the toolbar, that can be used to change between versions: https://dev.to/kiranmantha/how-to-create-a-custom-toolbar-addon-for-storybook-5e2e

### Antora:

- AsciiDoc documentation: https://docs.asciidoctor.org/asciidoc/latest/
- Some tb.lx repositories using Antora:
  - https://git.t3.daimlertruck.com/DTAGAPI/api-management-docs
  - https://git.t3.daimlertruck.com/DTAGAPI/api-management-portals/tree/develop/docs-ops
  - https://git.t3.daimlertruck.com/tblx/antora-docs-runtime-ui
  - https://git.t3.daimlertruck.com/DaimlerBuses/ecs-documentation-template

### Docusaurus:

- Complex theme customisation: https://docusaurus.io/docs/swizzling
- How versioning works: https://docusaurus.io/docs/versioning#tutorials

### Docsify:

- Advanced theme customisation: https://docsify.js.org/#/themes?id=other-themes
- Versioning plugin: https://github.com/UliGall/docsify-versioned-plugin
- Other plugins: https://docsify.js.org/#/awesome?id=plugins
