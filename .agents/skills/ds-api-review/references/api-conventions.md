# DT-DDS component API conventions and baseline

## Written rules (blocking-capable)

The rules are AGENTS.md → Coding conventions and Definition of Done #5/#6 (breaking subjects in
detail: `packages/changeset-conventional-commits/AGENTS.md`). House examples:

- `as const` object + same-named type: `DrawerPosition`.
- Compound components: `Drawer.Header`, `Drawer.Title`, `Drawer.Body`.
- Public types include `as const` objects used in props; they reach consumers through the umbrella's
  `export *`.

## Library baseline (rebuild before an `audit all`)

- `BaseProps` (`packages/react-packages/core/src/types/baseProps.ts`): `id`, `children`,
  `dataTestId`, `style`. Many components also take `className`.
- Booleans: `is*` is the majority (`isDisabled` in 17 packages vs `disabled` in 3), then `has*`,
  `should*`, `show*`. Deviations: `disabled`, `open`, `expanded`, `active`, `fixed`, `dismissible`,
  `matchWidth`, `enableResize`.
- Callbacks: `on*` is the majority (`onClick` 10, `onClose` 5, `onChange` 4, `onToggle` 2). The only
  root component with a public setter prop is drawer (`setIsVisible`, typed
  `React.Dispatch<SetStateAction<boolean>>`). Other `set*` names are context or hook internals
  (segmented-control and tooltip providers, sidebar `useSidebar`, table), not props.
- Controlled open state: accordion `isOpen` / `defaultIsOpen` / `onToggle` with a discriminated
  union (the newest, RFC-0001); sidebar `isExpanded` + `onToggle(expanded)` (`controlledExpanded` /
  `defaultExpanded` live only in `SidebarItem`'s hook); dropdown and backdrop `isOpen` (+ `onClose`);
  drawer `isVisible` / `setIsVisible` is the outlier.
- Props types defined but missing from `src/index.ts`: box (`BoxProps`), drawer (`DrawerProps`,
  `DrawerTitleProps`; also the `DrawerPosition` const/type), segmented-control, table (5 types),
  toast (`EmitToastProps`).
- `$` transient props: `shouldForwardProp` is used in 4 packages (checkbox, link, pagination,
  select). About 25 packages type styled props without `$` (legacy; new code must follow the rule).
- Scanning tip: grep `<Component>Props` interfaces, not every `set*:`/`on*:` line, or context and
  hook internals get counted as public props.
- `forwardRef` in 9 source files. React peer range: each package's `package.json` →
  `peerDependencies`.

Rebuild commands (read-only):

```bash
rg -n "^export" packages/react-packages/<pkg>/src/index.ts
rg -n "export (interface|type) \w+Props" packages/react-packages/*/src -g '!*.test.tsx' -g '!*.stories.tsx'
rg -o -N "^\s+(\w+)\??: boolean" -r '$1' packages/react-packages/*/src -g '!*.test.tsx' -g '!*.stories.tsx' | sort | uniq -c | sort -rn
rg -o -N "^\s+((on|set|handle)[A-Z]\w*)\??:" -r '$1' packages/react-packages/*/src -g '!*.test.tsx' -g '!*.stories.tsx' | sort | uniq -c | sort -rn
rg -l "shouldForwardProp" packages/react-packages/*/src
```

## External guidance (suggestions only; DT-DDS rules win)

Vendored, unmodified, Apache-2.0 (`references/vendor/vercel-components.build/`): `state.mdx`
(controlled, uncontrolled, merged), `composition.mdx` (compound parts, naming), `types.mdx` (exported
`<Name>Props`, extending attributes, prop-name conflicts), `as-child.mdx`, `polymorphism.mdx`,
`data-attributes.mdx`. Where they conflict with DT-DDS, DT-DDS wins: they use `type` (DT-DDS uses
`interface`), Tailwind (DT-DDS uses Emotion `$` props), and suggest `npm install @radix-ui/*` (a new
dependency or pattern such as `asChild` needs an ADR here; never recommend one as a fix).

Vercel composition rules: **link only** (the repo has no licence): cite by URL, copy no text.

| Rule | URL |
|---|---|
| Avoid boolean props | https://github.com/vercel-labs/agent-skills/blob/a5343bd997c4cc4d8bf2ca61021bdc74b4d6c9d5/skills/composition-patterns/rules/architecture-avoid-boolean-props.md |
| Compound components | https://github.com/vercel-labs/agent-skills/blob/a5343bd997c4cc4d8bf2ca61021bdc74b4d6c9d5/skills/composition-patterns/rules/architecture-compound-components.md |
| Children over render props | https://github.com/vercel-labs/agent-skills/blob/a5343bd997c4cc4d8bf2ca61021bdc74b4d6c9d5/skills/composition-patterns/rules/patterns-children-over-render-props.md |
| Explicit variants | https://github.com/vercel-labs/agent-skills/blob/a5343bd997c4cc4d8bf2ca61021bdc74b4d6c9d5/skills/composition-patterns/rules/patterns-explicit-variants.md |
| Context interface | https://github.com/vercel-labs/agent-skills/blob/a5343bd997c4cc4d8bf2ca61021bdc74b4d6c9d5/skills/composition-patterns/rules/state-context-interface.md |
| Decouple state implementation | https://github.com/vercel-labs/agent-skills/blob/a5343bd997c4cc4d8bf2ca61021bdc74b4d6c9d5/skills/composition-patterns/rules/state-decouple-implementation.md |
| Lift state | https://github.com/vercel-labs/agent-skills/blob/a5343bd997c4cc4d8bf2ca61021bdc74b4d6c9d5/skills/composition-patterns/rules/state-lift-state.md |

Excluded: `react19-no-forwardref`, while the packages' React peer range admits versions that need
`forwardRef`.
