# AGENTS.md — packages/react-packages

Component packages `@dt-dds/react-<name>`. The root `AGENTS.md` applies; this file adds component rules.

## Package anatomy

- `index.ts` barrel (with the `declare module '@emotion/react'` theme augmentation), `src/index.ts`
  public exports, `src/<Component>.tsx|.styled.ts|.test.tsx|.stories.tsx`, `README.md` (= component
  spec), `tsup.config.ts` (esm + cjs + dts), `jest.config.js` (`require('jest-config/jest.config.js')`).
- Every `@dt-dds/*` runtime import is declared with the exact workspace version (plus
  `@dt-dds/themes`); run `yarn check-pkg-deps`. message/modal/toast import `react-box` undeclared
  today — don't copy that.
- Export public prop and union types from `src/index.ts`; they ship through the umbrella's `export *`.
- `Portal` (core) renders `null` until its own effect runs: a ref to portalled content is `null` in
  the owner's first (layout) effect. Hold a callback ref in state instead.

## Spec (README.md)

- Template: `turbo/generators/new-component-package/templates/README.md.hbs` (only accordion conforms).
- The API table matches TS: name, required, default. Keyboard/ARIA tables are the a11y contract.
- The component's RFC chain (`docs/rfcs/*-<component>*.md`) is the design record; implementation that
  deviates from the approved RFC is flagged, never shipped silently.
- The first RFC-driven change to a legacy README migrates the whole README to the template.
- Legacy READMEs drift from the code (dropdown `offsetX`: README 4, code 0). The TS wins; drift older
  than your branch is one follow-up line in your report, outside this change.

## Styling

Emotion; `$`-prefixed styling-only props + `shouldForwardProp`; component tokens first, semantic
fallback (`packages/themes/AGENTS.md`); no hex/px literals; responsive via `theme.breakpoints`.

## Stories

CSF3 `StoryObj` (`Meta`, `StoryObj` from `@storybook/react-vite`); one story per States & Variants
row; keep the title prefix consistent with siblings (`Data Display/` is the current catch-all); no
`.stories.mdx`. Stories render through `apps/docs`.

- A story's `render` runs outside the theme `Provider` (the theme decorator calls it before the
  Provider renders), so `useTheme()` there returns `{}` and the story throws. Read the theme inside a
  named component that `render` returns as JSX (`SidebarDemo` in `sidebar/src/Sidebar.stories.tsx`).
- A new or changed story passes the render check before it is committed:
  `yarn workspace @dt-dds/docs test-storybook <Name>.stories` (root AGENTS.md → Stack & commands).
- Story inputs: icon names `packages/icons/src/codes.ts`; theme keys
  `packages/themes/src/types/theme.ts`, values `packages/themes/src/themes/daimler-truck/`;
  `Provider` `core/src/components/Provider.tsx`.

## Tests

- Colocated `src/<Component>.test.tsx`; role queries + `user-event`; each keyboard row.
- Run through turbo (tests import siblings from `dist/`):
  `yarn turbo run lint test build --filter=@dt-dds/react-<name>`; dependents `--filter=...@dt-dds/react-<name>`.
- Snapshots only via `yarn workspace @dt-dds/react-<name> test:update:snapshot` (core: `test -u`), reviewed.
- Global mocks (`packages/jest-config/jest-mock-globals.ts`: `ResizeObserver`, `IntersectionObserver`,
  `matchMedia`) are writable, not configurable: replace one by assignment and restore it in
  `afterEach` (`Object.defineProperty` throws). Their `observe` never calls back; a resize test
  installs its own capturing fake.
