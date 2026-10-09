# Spinner Package

The spinner package works as a progress indicator to inform users about the status of ongoing processes.

## Usage

```jsx
import { Spinner } from '@dt-dds/react-spinner';

export const App = () => {
  return (
    <Spinner size='small' colorScheme='negative' loadingText='Loading...' />
  );
};
```

## API

### Spinner

| Property      | Type                        | Default    | Description                                                                                                                                                                                     |
| ------------- | --------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`        | `typeof SpinnerSize`        | `medium`   | Determines the size of the spinner                                                                                                                                                              |
| `colorScheme` | `typeof SpinnerColorScheme` | `positive` | Determines the color contrast of the spinner. Positive contrast means the spinner is placed on top of lighter colors, and negative contrast means the spinner is placed on top of darker colors |
| `withText`    | `boolean`                   | `false`    | Determines if the loading indicator will have a `Loading...` helper text below the spinner                                                                                                      |
| `dataTestId`  | `string`                    | `spinner`  | Customizable test identifier                                                                                                                                                                    |
| `style`       | `React.CSSProperties`       | -          | Gives the Spinner some specific css properties                                                                                                                                                  |

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
spinner
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
