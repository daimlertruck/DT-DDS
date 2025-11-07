# Dropdown Package

The Dropdown Menu provides the users with a box that can receive any content. It also provides an Option component.

## Dropdown Usage

```jsx
import { Dropdown } from '@dt-dds/react';

const OPTIONS = [
  { text: 'Option 1', value: '1' },
  { text: 'Option 2', value: '2' },
];

export const App = () => {
  return (
    <Dropdown>
      {options.map((option) => (
        <Dropdown.Option key={option.value}>{option.text}</Dropdown.Option>
      ))}
    </Dropdown>
  );
};
```

## Properties

### Dropdown

| Property     | Type                             | Default    | Description                                                                 |
| ------------ | -------------------------------- | ---------- | --------------------------------------------------------------------------- |
| `children`   | `ReactNode`                      | —          | Child components/content to be rendered inside the dropdown.                |
| `style`      | `React.CSSProperties`            | —          | Inline styles merged **after** computed positioning styles.                 |
| `dataTestId` | `string`                         | `dropdown` | Customizable test identifier applied to the dropdown root element.          |
| `isOpen`     | `boolean`                        | `false`    | Controls visibility. When `false`, the element is hidden via `aria-hidden`. |
| `anchorRef`  | `RefObject<HTMLElement \| null>` | -          | Reference to the anchor element used for positioning.                       |
| `matchWidth` | `boolean`                        | `true`     | If `true`, the dropdown width matches the anchor width.                     |
| `offsetX`    | `number`                         | `4`        | Horizontal offset (px) for `left`/`right` placements.                       |
| `offsetY`    | `number`                         | `4`        | Vertical offset (px) for `top`/`bottom` placements.                         |
| `onClose`    | `() => void`                     | —          | Called when a click is detected outside the dropdown/anchor.                |
| `as`         | `keyof JSX.IntrinsicElements`    | `"div"`    | Underlying HTML element (e.g., `"ul"` for list semantics).                  |
| `placement`  | `DropdownPlacement`              | `bottom`   | Dropdown position.                                                          |

### Dropdown.Option

| Property        | Type                                                  | Default           | Description                                                             |
| --------------- | ----------------------------------------------------- | ----------------- | ----------------------------------------------------------------------- |
| `style`         | `React.CSSProperties`                                 | —                 | Inline styles for the option element.                                   |
| `children`      | `ReactNode`                                           | —                 | Content of the option.                                                  |
| `dataTestId`    | `string`                                              | `dropdown-option` | Customizable test identifier for the option element.                    |
| `isDisabled`    | `boolean`                                             | `false`           | When `true`, sets `aria-disabled` and blocks click/keyboard activation. |
| `isSelected`    | `boolean`                                             | `false`           | Reflects selection state via `aria-selected` and styling.               |
| `isHighlighted` | `boolean`                                             | `false`           | Adds `data-highlighted="true"` for hover/active row styling.            |
| `isMulti`       | `boolean`                                             | `false`           | Optional styling hint for multi-select contexts (no selection logic).   |
| `onClick`       | `(event: MouseEvent<HTMLLIElement>) => void`          | —                 | Click handler.                                                          |
| `...rest`       | `React.LiHTMLAttributes<HTMLLIElement>` & `BaseProps` | —                 | Additional LI attributes (e.g., `role="option"`, `tabIndex`, etc.).     |

## Stack

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [React](https://reactjs.org/) — JavaScript library for user interfaces
- [Emotion](https://emotion.sh/docs/introduction) — for writing css styles with JavaScript
- [Storybook](https://storybook.js.org/) — UI component environment powered by Vite
- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [React Testing Library](https://testing-library.com/) - to test UI components in a user-centric way
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by esbuild
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
dropdown
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
