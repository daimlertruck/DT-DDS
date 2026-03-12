# Tooltip Package

This package displays information when the user moves the mouse pointer over a trigger element.

## Tooltip Usage

```jsx
import { Tooltip } from './Tooltip';

export const App = () => {
  return (
    <Tooltip>
      Hover over me
      <Tooltip.Content direction='top' background='full'>
        Some content
      </Tooltip.Content>
    </Tooltip>
  );
};
```

## Properties

### Tooltip

| Property     | Type                  | Default             | Description                                                 |
| ------------ | --------------------- | ------------------- | ----------------------------------------------------------- |
| `children`   | `ReactNode`           | -                   | Child components to be rendered                             |
| `style`      | `React.CSSProperties` | -                   | Gives the Tooltip container css properties                 |
| `dataTestId` | `string`              | `tooltip-container` | Customizable test identifier                                |
| `hideDelay`  | `number`              | `0ms`               | Delay to hide tooltip when mouse leaving the target element |

### Tooltip.Content

| Property     | Type                  | Default           | Description                                                                           |
| ------------ | --------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| `children`   | `ReactNode`           | -                 | Content showed on the Tooltip. When content is empty, the tooltip will not be showed. |
| `direction`  | `TooltipDirection`    | `top`             | Determines the direction of the tooltip                                               |
| `background` | `TooltipBackground`   | `full`            | Determines the background type of the tooltip                                         |
| `style`      | `React.CSSProperties` | -                 | Gives the Tooltip Content css properties                                              |
| `dataTestId` | `string`              | `tooltip-content` | Customizable test identifier                                                          |

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
tooltip
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
