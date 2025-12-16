# Box Package

<!-- temp: fix publish version bump, drop comment afterwards -->

This package serves as a wrapper for most of the CSS utility needs.

## Box Usage

```jsx
import { Box } from '@dt-dds/react';

export const App = () => {
  return (
    <Box element='div' style={{ gap: '10px' }}>
      <p>Content 1</p>
      <p>Content 2</p>
    </Box>
  );
};
```

## Properties

| Property     | Type                  | Default | Description                           |
| ------------ | --------------------- | ------- | ------------------------------------- |
| `children`   | `ReactNode`           | -       | Child components to be rendered       |
| `element`    | `React.ElementType`   | `div`   | HTML element to be rendered as parent |
| `dataTestId` | `string`              | -       | Customizable test identifier          |
| `style`      | `React.CSSProperties` | -       | Gives the Box specific css properties |
| `role`       | `AriaRole`            | -       | Gives the Box specific role           |

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
box
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
