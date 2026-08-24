# Accordion

A collapsible content section that lets users show or hide related information while keeping pages scannable.

## Overview

The Accordion component displays a header that expands or collapses an associated body section. It is useful for grouping secondary or detailed content while preserving vertical space. It supports uncontrolled usage for simple cases and controlled usage when a parent component needs to coordinate open and closed state.

## Figma Reference

[Figma](https://www.figma.com/design/kMk36nv0ZT4AHhBbw9jq0S/%E2%86%B3-1.-Daimler-Truck-DDS--Beta-?node-id=3500-62929&p=f&t=UkGgOHRtujZlgYM4-0)

## Anatomy

```text
Accordion
├── Header
│   ├── Header content
│   └── Open / closed indicator
└── Body
    └── Collapsible content
```

## States & Variants

| State / Variant | Description                                                                         |
| --------------- | ----------------------------------------------------------------------------------- |
| `default`       | The accordion is enabled and collapsed unless opened by internal or external state. |
| `open`          | The accordion body is visible and the header icon communicates the expanded state.  |
| `hover`         | The accordion surface uses hover styling when the component is enabled.             |
| `disabled`      | User interaction is disabled and the accordion cannot be toggled.                   |
| `transparent`   | Background variant with a transparent surface.                                      |
| `light`         | Background variant using the light surface token.                                   |
| `contrast`      | Background variant using the contrast surface token.                                |
| `borderBottom`  | Optional bottom border.                                                             |

## API

### Props

| Prop              | Type                                     | Default               | Required | Description                                                                                     |
| ----------------- | ---------------------------------------- | --------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `headerContent`   | `ReactNode`                              | -                     | Yes      | Content rendered inside the accordion header.                                                   |
| `children`        | `ReactNode`                              | -                     | No       | Content rendered inside the accordion body.                                                     |
| `isOpen`          | `boolean`                                | -                     | No       | Controls whether the accordion is expanded. When provided, the component behaves as controlled. |
| `defaultIsOpen`   | `boolean`                                | `false`               | No       | Defines the initial open state when the accordion is uncontrolled.                              |
| `onToggle`        | `(isOpen: boolean) => void`              | -                     | No       | Called with the next open state when the user toggles the accordion.                            |
| `background`      | `'transparent' \| 'light' \| 'contrast'` | `'light'`             | No       | Sets the accordion background color variant.                                                    |
| `isDisabled`      | `boolean`                                | `false`               | No       | Disables user interaction with the accordion.                                                   |
| `hasBorderBottom` | `boolean`                                | `false`               | No       | Adds a bottom border to the accordion container.                                                |
| `dataTestId`      | `string`                                 | `accordion-container` | No       | Test identifier applied to the accordion container.                                             |
| `style`           | `React.CSSProperties`                    | -                     | No       | Inline styles applied to the accordion container.                                               |
| `className`       | `string`                                 | -                     | No       | CSS class applied to the accordion container.                                                   |

### Events

| Event      | Signature                   | Description                                                                                                                                       |
| ---------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onToggle` | `(isOpen: boolean) => void` | Called when the user requests the accordion to open or close. In controlled mode, the parent must update `isOpen` for the visual state to change. |

### Types

```tsx
export type Background = 'transparent' | 'light' | 'contrast';

export interface AccordionBaseProps extends BaseProps {
  headerContent: ReactNode;
  background?: Background;
  isDisabled?: boolean;
  hasBorderBottom?: boolean;
  className?: string;
}
```

## Usage

### Uncontrolled

```tsx
import { Accordion } from '@dt-dds/react-accordion';

export const App = () => {
  return (
    <Accordion defaultIsOpen headerContent='Vehicle details'>
      Body content here.
    </Accordion>
  );
};
```

### Controlled

```tsx
import { useState } from 'react';

import { Accordion } from '@dt-dds/react-accordion';

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion
      isOpen={isOpen}
      onToggle={setIsOpen}
      headerContent='Vehicle details'
    >
      Body content here.
    </Accordion>
  );
};
```

### Integration notes

- Use uncontrolled mode when the accordion can own its own open and closed state.
- Use controlled mode when a parent component needs to coordinate multiple accordions, such as Expand All or Collapse All actions.
- In controlled mode, `onToggle` reports the requested next state, but the accordion only changes visually when the parent updates `isOpen`.
- The component expects the DT DDS theme provider to be available through the application provider setup.

## Behavior

### Interaction patterns

- **Mouse / Touch:** Selecting the header toggles the accordion unless it is disabled.
- **Keyboard:** Pressing `Enter` on the focused header toggles the accordion unless it is disabled.
- **Focus management:** Focus remains on the header when the accordion opens or closes.

### State transitions

| Current state | User action | Result                                                                      |
| ------------- | ----------- | --------------------------------------------------------------------------- |
| Closed        | Toggle      | Opens in uncontrolled mode, or calls `onToggle(true)` in controlled mode.   |
| Open          | Toggle      | Closes in uncontrolled mode, or calls `onToggle(false)` in controlled mode. |
| Disabled      | Toggle      | No state change and `onToggle` is not called.                               |

### Responsive behavior

The accordion takes the available width of its container. Its layout and state behavior do not change across viewport sizes.

## Accessibility

### Keyboard navigation

| Key          | Action                                             |
| ------------ | -------------------------------------------------- |
| `Tab`        | Moves focus to and away from the accordion header. |
| `Enter`      | Toggles the accordion when the header is focused.  |
| `Space`      | No default toggle behavior.                        |
| `Arrow keys` | No default behavior.                               |
| `Escape`     | No default behavior.                               |

### Screen reader

The header exposes `role='button'`, `aria-expanded`, and `aria-disabled`. Screen readers can announce whether the accordion is expanded or collapsed based on the current state.

## Dependencies

### Depends on

| Component / Token    | How it's used                                                          |
| -------------------- | ---------------------------------------------------------------------- |
| `@dt-dds/react-core` | Provides shared base props and provider utilities used by the package. |
| `@dt-dds/react-icon` | Renders the open and closed indicator icon.                            |
| `@dt-dds/themes`     | Provides color, typography, spacing, border, and shadow tokens.        |
| Emotion              | Provides styled component support.                                     |

### Related components

| Component | Relationship                                                                     |
| --------- | -------------------------------------------------------------------------------- |
| `Box`     | Can be used to arrange multiple accordions in a layout.                          |
| `Button`  | Can trigger parent-owned Expand All or Collapse All behavior in controlled mode. |

---

## Stack

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [React](https://reactjs.org/) - JavaScript library for user interfaces
- [Emotion](https://emotion.sh/docs/introduction) - for writing css styles with JavaScript
- [Storybook](https://storybook.js.org/) - UI component environment powered by Vite
- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [React Testing Library](https://testing-library.com/) - to test UI components in a user-centric way
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Tsup](https://github.com/egoist/tsup) - TypeScript bundler powered by esbuild
- [Yarn](https://yarnpkg.com/) from managing packages

## Commands

- `yarn build` - Build the package
- `yarn dev` - Run the package locally
- `yarn lint` - Lint all files within this package
- `yarn test` - Run all unit tests
- `yarn test:report` - Open the test coverage report
- `yarn test:update:snapshot` - Run all unit tests and update the snapshot

## Compilation

Running `yarn build` from the root of the package will use [tsup](https://tsup.egoist.dev/) to compile the raw TypeScript and React code to plain JavaScript.

The `/dist` folder contains the compiled output.

```bash
accordion
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
    ...
```

## Versioning

Follows [semantic versioning](https://semver.org/)

## &copy; License

Licensed under [MIT License](LICENSE.md)
