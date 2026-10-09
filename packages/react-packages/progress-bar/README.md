# ProgressBar Package

The progress bar works as a progress indicator to inform users about the status of ongoing processes.

## ProgressBar Usage

```jsx
import { ProgressBar } from '@dt-dds/react-progress-bar';

export const App = () => {
  return (
    <ProgressBar
      label='State of Charge'
      value={55}
      state='error'
      size='small'
    />
  );
};
```

### Properties

| Property     | Type                      | Default  | Description                                                               |
| ------------ | ------------------------- | -------- | ------------------------------------------------------------------------- |
| `value`      | `number`                  | `0`      | Percentage of the progress. Positive integer between 0-100                |
| `state`      | `typeof ProgressBarState` | `active` | Status of the action, could be active, success, or error                  |
| `size`       | `typeof ProgressBarSize`  | `small`  | Determines the size of the progress bar                                   |
| `label`      | `string`                  | -        | A label to describe the progress bar                                      |
| `helperText` | `string`                  | -        | A text to complement the label                                            |
| `info`       | `typeof ProgressBarInfo`  | -`       | Determines which indicator to display, could be none, text, icon, or both |

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
progress-bar
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
