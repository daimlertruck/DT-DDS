# SegmentedControl Package

Segmented Control is frequently used to let users toggle between different formatting or to filter, like a grid view and a table view.

## SegmentedControl Usage

```jsx
import { SegmentedControl } from '@dt-dds/react-segmented-control';

export const App = () => {
  return (
    <SegmentedControl
      selectedValue='list'
      showLabel={false}
      onChangeControl={handleChanges}
    >
      <SegmentedControl.Option label='List' value='list' iconCode='list' />
      <SegmentedControl.Option
        label='Gallery'
        value='gallery'
        iconCode='grid_view'
        disabled
      />
    </SegmentedControl>
  );
};
```

## SegmentedControl Properties

| Property          | Type       | Default | Description                                                  |
| ----------------- | ---------- | ------- | ------------------------------------------------------------ |
| `selectedValue`   | `string`   | -       | sets the selected value, useful to fulfill the initial value |
| `showLabel`       | `boolean`  | false   | makes the labels visible or not for all options              |
| `onChangeControl` | `function` | -       | callback function to receive the control value changed       |
| `dataTestId`      | `string`   | -       | sets the id for testing purposes                             |

## SegmentedControl.Option Properties

| Property   | Type      | Default | Description                                                                   |
| ---------- | --------- | ------- | ----------------------------------------------------------------------------- |
| `label`    | `string`  | -       | sets the option label, visible when showLabel is true or the icon is missing  |
| `value`    | `string`  | false   | value to control the option                                                   |
| `iconCode` | `Code`    | -       | sets the code for the icon to be used, check the package from `@dt-dds/icons` |
| `disabled` | `boolean` | false   | disables the option                                                           |

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
segmented-control
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
