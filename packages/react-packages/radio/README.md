# Radio Package

The Radio package allows to select one option from a set.

## Usage

```jsx
import { Radio, RadioGroup } from '@dt-dds/react';

export const App = () => {
  return (
    <RadioGroup onChange={onChange} name='group-name'>
      <Radio value='1' label='Label 1' isDefaultChecked={true} />
      <Radio value='2' label='Label 2' isDisabled={true} />
    </RadioGroup>
  );
};
```

## Properties

### Radio

| Property           | Type                                           | Default            | Description                                                                                                         |
| ------------------ | ---------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `label`            | `string`                                       | -                  | A label to help users understand the scope of the radio.                                                            |
| `onChange`         | `(evt: ChangeEvent<HTMLInputElement>) => void` | -                  | The triggered function when the input change.                                                                       |
| `isDisabled`       | `boolean`                                      | `false`            | Specifies if the element should be disabled.                                                                        |
| `isDefaultChecked` | `boolean`                                      | `false`            | Indicates that this default radio button is selected one in the group.                                              |
| `isChecked`        | `boolean`                                      | `false`            | Indicates that this radio button is selected one in the group. Used when the radio is controlled by another element |
| `name`             | `string`                                       | `radio-group-name` | Should represent the group name                                                                                     |
| `value`            | `string`                                       | -                  | String containing the radio button's value                                                                          |
| `hasError`         | `boolean`                                      | `false`            | Indicates that the radio button has an error                                                                        |

### RadioGroup

| Property     | Type                                           | Default | Description                                   |
| ------------ | ---------------------------------------------- | ------- | --------------------------------------------- |
| `children`   | `ReactNode`                                    | -       | Child components to be rendered               |
| `dataTestId` | `string`                                       | -       | Customizable test identifier                  |
| `direction`  | "row" \| "column"                              | row     | Sets the flex direction of the group          |
| `name`       | `string`                                       | -       | Should represent the group name               |
| `onChange`   | `(evt: ChangeEvent<HTMLInputElement>) => void` | -       | The triggered function when the input change. |
| `size`       | `"small" \| "large"                            | `large` | Sets the dimensions of the radio buttons      |

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
radio
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
    ...
```

## Versioning

Follows [semantic versioning](https://semver.org/)

## &copy; License

Licensed under [MIT License](LICENSE)
