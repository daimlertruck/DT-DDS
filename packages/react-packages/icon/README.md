# Icon Package

This package provides a customizable and stylized Icon component for use in React applications.

## Icon Usage

```jsx
import { Icon } from '@dt-dds/react-icon';

export const App = () => {
  return <Icon code='warning' />;
};
```

## Properties

| Property     | Type                   | Default    | Description                                                                                |
| ------------ | ---------------------- | ---------- | ------------------------------------------------------------------------------------------ |
| `code`       | `Code`                 | -          | Specifies the icon code for the desired symbol.                                            |
| `color`      | `string`               | -          | Sets the color of the icon.                                                                |
| `size`       | `ComponentSize`        | 'large'    | Specifies the predefined icon sizes. Custom font-sizes are allowed through the style prop. |
| `variant`    | 'outlined' \| 'filled' | 'outlined' | Specifies the icon filling variant.                                                        |
| `dataTestId` | `string`               | 'icon'     | Customizable test identifier.                                                              |
| `style`      | `React.CSSProperties`  | -          | Additional styles to apply to the icon.                                                    |

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
icon
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
