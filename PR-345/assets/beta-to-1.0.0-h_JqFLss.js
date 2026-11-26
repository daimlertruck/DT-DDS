var h=Object.defineProperty;var n=(e,a)=>h(e,"name",{value:a,configurable:!0});import{n as r}from"./rolldown-runtime-CzYk_CEw.js";import{c,l as p,s as m}from"./blocks-BRyGBkbc.js";import{t as u}from"./jsx-runtime-Br4tQxt1.js";import{i as g,r as l}from"./react-2NLqoBuL.js";var s;function d(){return(d=r((()=>{s=`# Upgrading from the beta to 1.0.0

How to move an app from a \`1.0.0-beta.N\` version of DT-DDS to 1.0.0. After that, the
[upgrade playbook](https://github.com/daimlertruck/DT-DDS/blob/main/docs/upgrading/README.md)
covers every later release.

## Before you start

If your app uses a beta older than \`1.0.0-beta.362\`, update to \`@dt-dds/react@1.0.0-beta.362\`
first. The breaking changes up to that beta are in the
[\`@dt-dds/react\` changelog](https://github.com/daimlertruck/DT-DDS/blob/main/packages/dt-dds-react/CHANGELOG.md)
and the changelogs of the packages it lists.

## Version ranges

At 1.0.0, every \`1.0.0-beta.N\` version becomes \`1.0.0\`:

- a caret range such as \`^1.0.0-beta.362\` reaches 1.0.0 with no change;
- an exact pin such as \`1.0.0-beta.362\` does not: change it to \`^1.0.0\`.

\`\`\`jsonc
// before
"@dt-dds/react": "1.0.0-beta.362"

// after
"@dt-dds/react": "^1.0.0"
\`\`\`

If you install \`@dt-dds/*\` packages one by one, change all of them in the same upgrade. DT-DDS
packages pin each other to exact versions, so mixed versions can install duplicate copies of shared
packages.

## React 17

1.0.0 supports React 18 and 19 only
([issue 316](https://github.com/daimlertruck/DT-DDS/issues/316)). If your app runs React 17, stay
on the last beta that supports React 17 until you upgrade React. The change that drops React 17
names that beta here.

## Breaking changes since beta.362

None so far. Checked up to \`@dt-dds/react@1.0.0-beta.373\`.

Each change that breaks an app before 1.0.0 adds its entry here, in the entry format below.

## Entry format

Each major has one migration page in \`docs/upgrading/\`, named after the major, such as \`2.0.0.md\`,
and shown in Storybook under Upgrading. The page has one entry per deprecation and per breaking
change. A deprecation adds its entry in the minor that deprecates the API (a
\`feat: deprecate …\` commit), and the major that removes the API fills in "Removed in". Versions are
those of the umbrella package \`@dt-dds/react\`, which every release bumps (see Reading the release
notes in the
[upgrade playbook](https://github.com/daimlertruck/DT-DDS/blob/main/docs/upgrading/README.md)).

\`\`\`markdown
### <Short name of the change>

- What changes and why: <the old API, the new one and the reason>
- Packages: \`@dt-dds/react-<name>\`
- Deprecated in: \`@dt-dds/react@<version>\` (link to the commit), or "not deprecated" when the
  change has no deprecation step
- Removed in: \`@dt-dds/react@<version>\` (link to the commit), or "not yet" until the major ships
- Before:

  <before code>

- After:

  <after code>

- Steps:
  1. <first step>
  2. <next step>
- Codemod: \`<command>\`, only when one exists
\`\`\`

### Example: Button's isUppercased prop

This beta change predates \`1.0.0-beta.362\`, so apps on that beta already have it; it is here to
show the format.

- What changes and why: \`Button\` drops the \`isUppercased\` prop. The theme's typography sets the
  text case instead.
- Packages: \`@dt-ui/react\` at the time, which held \`Button\`; today \`@dt-dds/react-button\`.
- Deprecated in: not deprecated; the beta removed the prop in one step.
- Removed in: \`@dt-ui/react@0.1.0-beta.52\`
  ([commit 226e1c7d6](https://github.com/daimlertruck/DT-DDS/commit/226e1c7d6c05d79d9e3f6d7f68433aed095a72e2))
- Before:

  \`\`\`tsx
  <Button isUppercased onClick={save}>
    Save
  </Button>
  \`\`\`

- After:

  \`\`\`tsx
  <Button onClick={save}>Save</Button>
  \`\`\`

- Steps:
  1. Search the app for \`isUppercased\`.
  2. Remove the prop from each \`Button\`.
  3. Check the buttons: their text case now comes from the theme.
- Codemod: none; the change predates the codemod workflow
  ([issue 231](https://github.com/daimlertruck/DT-DDS/issues/231)).

## Next

Read the
[upgrade playbook](https://github.com/daimlertruck/DT-DDS/blob/main/docs/upgrading/README.md) to
learn what each release after 1.0.0 means for your app.
`})))()}n(d,"init__1_0_0");function o(e){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c,{title:"Upgrading/Beta to 1.0.0"}),`
`,(0,t.jsx)(m,{children:s})]})}n(o,"_createMdxContent");function v(e={}){const{wrapper:a}={...g(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}n(v,"MDXContent");var t;function i(){return(i=r((()=>{t=u(),l(),p(),d()})))()}n(i,"init_beta_to_1_0_0");i();export{v as default};
