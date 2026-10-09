# Tabs Package

The Tabs component allows different views/information to be switched easily.
If the Tabs run out of space, it will appear horizontal scroll.

## Usage

```jsx
import { Tabs, TabPanel, useTabs } from '@dt-dds/react';
import { Icon } from '@dt-dds/react-icon';

const { activeTab, handleChange } = useTabs(0);

return (
  <>
    <Tabs activeTab={activeTab} handleChange={handleChange}>
      <Tabs.Item icon={<Icon code='menu' />} label='Tab 1' />
      <Tabs.Item label='Tab 2' />
      <Tabs.Item label='Tab 3' isDisabled />
    </Tabs>
  </>
);
```

## API

### Tabs

| Property       | Type                    | Default   | Description                               |
| -------------- | ----------------------- | --------- | ----------------------------------------- |
| `children`     | `ReactNode`             | -         | Child components to be rendered           |
| `dataTestId`   | `string`                | `tabs`    | Customizable test identifier              |
| `style`        | `React.CSSProperties`   | -         | Styles to be used in the Tabs             |
| `activeTab`    | `number`                | -         | Represents the active tab                 |
| `variant`      | `default` / `contained` | `default` | Defines type of tab                       |
| `handleChange` | `function`              | -         | When triggered, it changes the active tab |

### Tabs.Item

| Property     | Type        | Default | Description                              |
| ------------ | ----------- | ------- | ---------------------------------------- |
| `label`      | `string`    | -       | Defines the tab label                    |
| `icon`       | `ReactNode` | -       | Defines the tab icon                     |
| `dataTestId` | `string`    | -       | Customizable test identifier             |
| `isDisabled` | `string`    | -       | Determines the disabled state of the tab |

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
tabs
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
