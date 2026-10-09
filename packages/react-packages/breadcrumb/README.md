# Breadcrumb Package

This component allows the user to configure its history navigation using breadcrumbs

## Usage

```jsx
import { Breadcrumb } from '@dt-dds/react';

export const App = () => {
  const breadcrumbs = [
    { name: 'Name 1', showIcon: true },
    { name: 'Name 2' },
    { disabled: true, name: 'Name 3' },
    { name: 'Name 4' },
  ];

  return (
    <Breadcrumb separator='slash'>
      {breadcrumbs.map((breadcrumb, i) => (
        <Breadcrumb.Item
          key={`${i}-${breadcrumb.name}`}
          disabled={breadcrumb.disabled}
        >
          {breadcrumb.showIcon && <ViewAgendaIcon />}
          <a href='/'>{breadcrumb.name}</a>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
```

## API

### Breadcrumb

#### Props

| Property    | Type                  | Default | Description                                                        |
| ----------- | --------------------- | ------- | ------------------------------------------------------------------ |
| `children`  | `ReactNode`           | -       | To achieve the desired behaviour use the Breadcrumb.Item as child. |
| `separator` | `BreadcrumbSeparator` | `slash` | Defines the breadcrumbs separator                                  |

### Breadcrumb.Item

#### Props

| Property   | Type        | Default | Description                                                                                                                                                                                     |
| ---------- | ----------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children` | `ReactNode` | -       | Child components to be rendered, the breadcrumb doesn't provide a anchor, if you want navigation you need to provide your own navigation component, as well as icons as follows in the example. |
| `disabled` | `boolean`   | `false` | Disables the breadcrumb                                                                                                                                                                         |

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
breadcrumb
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
