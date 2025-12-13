# Checkbox Package

A checkbox toggles between checked and unchecked states, enabling users to make binary choices in forms and settings.

## Checkbox Usage

```jsx
import { Checkbox } from '@dt-dds/react-checkbox';
import { useState } from 'react';

export const App = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (evt) => {
    setChecked(evt.target.checked);
  };

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      Accept terms and conditions
    </Checkbox>
  );
};
```

## Indeterminate State

```jsx
const [checkedItems, setCheckedItems] = useState([false, false, false]);

const allChecked = checkedItems.every(Boolean);
const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

<Checkbox
  checked={allChecked}
  indeterminate={isIndeterminate}
  onChange={(e) => setCheckedItems([e.target.checked, e.target.checked, e.target.checked])}
>
  Select all
</Checkbox>
```

## Properties

| Property           | Type                                          | Default       | Description                                                                 |
|--------------------|-----------------------------------------------|---------------|-----------------------------------------------------------------------------|
| isChecked          | `boolean`                                     | —             | Controls the checked state                                                  |
| onChange           | `(evt: ChangeEvent<HTMLInputElement>) => void`| —             | Callback fired when the state changes.                                      |
| isDisabled         | `boolean`                                     | `false`       | If `true`, the checkbox is disabled.                                        |
| isIndeterminate    | `boolean`                                     | `false`       | If `true`, the checkbox appears in an indeterminate state.                  |
| hasError           | `boolean`                                     | `false`       | If `true`, the checkbox displays an error state.                            |
| size               | `'small' \| 'large'`                          | `'large'`     | Size of the checkbox.                                                       |
| label              | `ReactNode`                                   | —             | Text or elements to display as the label.                                   |
| children           | `ReactNode`                                   | —             | Alternative way to provide label content.                                   |
| dataTestId         | `string`                                      | `'checkbox'`  | Test identifier for testing libraries.                                      |
| id                 | `string`                                      | —             | HTML `id` attribute for the input element.                                  |
| aria-label         | `string`                                      | —             | Accessibility label (required if no `label` or `children` provided).       |
| style              | `CSSProperties`                               | —             | Inline styles for the wrapper.                                              |
| ref                | `Ref<HTMLInputElement>`                       | —             | Ref forwarded to the input element.                                         |

### Note

In addition to the above properties, this component also accepts all standard props of an `input` element.

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
- `yarn test` Run all unit tests
- `yarn test:report` - Open the test coverage report
- `yarn test:update:snapshot` - Run all unit tests and update the snapshot

## Compilation

Running `yarn build` from the root of the package will use [tsup](https://tsup.egoist.dev/) to compile the raw TypeScript and React code to plain JavaScript.

The `/dist` folder contains the compiled output.

```bash
checkbox
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
