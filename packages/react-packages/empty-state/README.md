# EmptyState Package

This package fills the width of the container where is placed and its height varies depending on the content in it.
The usage of this package is to show a message to the user when there is no data to display.
Furthermore, it can be used to show additional information like a button, a link or an image as children.

## Usage

```jsx
import { EmptyState } from '@dt-dds/react';

export const App = () => {
  const title = 'Some Title';
  const description = 'Some Description';

  return (
    <EmptyState>
      <img />
      <EmptyState.Content title={title} description={description} />
      <Button onClick={() => {}} variant='solid'>
        Action
      </Button>
    </EmptyState>
  );
};
```

## API

### EmptyState

| Property     | Type                  | Default         | Description                                       |
| ------------ | --------------------- | --------------- | ------------------------------------------------- |
| `children`   | `ReactNode`           | -               | Child components to be rendered.                  |
| `dataTestId` | `string`              | `'empty-state'` | Customizable test identifier.                     |
| `style`      | `React.CSSProperties` | -               | Gives the EmptyState some specific css properties |

### EmptyState.Content

| Property      | Type                  | Default                 | Description                                                                |
| ------------- | --------------------- | ----------------------- | -------------------------------------------------------------------------- |
| `dataTestId`  | `string`              | `'empty-state-content'` | Customizable test identifier.                                              |
| `style`       | `React.CSSProperties` | -                       | Gives the EmptyState Content some specific css properties                  |
| `title`       | `string`              | -                       | Text to be presented as Title within the Empty State.                      |
| `description` | `ReactNode`           | -                       | Text/Custom element to be presented as Description within the Empty State. |

### Stack

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

### Commands

- `yarn build` - Build the package
- `yarn dev` - Run the package locally
- `yarn lint` - Lint all files within this package
- `yarn test` - Run all unit tests
- `yarn test:report` - Open the test coverage report
- `yarn test:update:snapshot` - Run all unit tests and update the snapshot

### Compilation

Running `yarn build` from the root of the package will use [tsup](https://tsup.egoist.dev/) to compile the raw TypeScript and React code to plain JavaScript.

The `/dist` folder contains the compiled output.

```bash
empty-state
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
    ...
```

### Versioning

Follows [semantic versioning](https://semver.org/)

## &copy; License

Licensed under [MIT License](LICENSE.md)
