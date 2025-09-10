# Stepper Package

Steppers convey progress through steps. These steps can be numbered or not. However, they are sequential.

By default, for screens smaller than our `theme.breakpoints.mq3d` the stepper orientation is always vertical.

## Stepper Usage

```jsx
import { Stepper, Step } from '@dt-dds/react';

export const App = () => {
  const options = ['API version definition', 'Specifications', 'Review'];

  const currentStep = 3;
  const completed = [1, 2];

  return (
    <Stepper>
      {options.map((opt, idx) => (
        <Step
          key={option.value}
          isActive={currentStep === idx + 1}
          isCompleted={completed.includes(idx + 1)}
        >
          <Step.Counter>{idx + 1}</Step.Counter>
          <Step.Label>{opt}</Step.Label>
        </Step>
      ))}
    </Stepper>
  );
};
```

## Properties

| Property      | Type                         | Default         | Description                                                                     |
| ------------- | ---------------------------- | --------------- | ------------------------------------------------------------------------------- |
| `children`    | `ReactNode`                  | -               | Child components to be rendered                                                 |
| `dataTestId`  | `string`                     | default-stepper | Customizable test identifier. This id is concatenated with the -stepper string. |
| `orientation` | `"vertical" \| "horizontal"` | vertical        | To specify the direction of the step bar.                                       |

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
stepper
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
