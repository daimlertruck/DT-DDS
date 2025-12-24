# Pagination Package

The Pagination component provides page navigation with optional items-per-page selection and item count information.

## Pagination Usage

```jsx
import { Pagination } from '@dt-dds/react';

const Example = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={20}
      totalItems={200}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
      showItemsPerPage
      showItemsInfo
    />
  );
};
```

## Properties

| Property               | Type                      | Default             | Description                                            |
| ---------------------- | ------------------------- | ------------------- | ------------------------------------------------------ |
| `currentPage`          | `number`                  | —                   | Currently selected page (1-based index)                |
| `totalPages`           | `number`                  | —                   | Total number of available pages                        |
| `totalItems`           | `number`                  | —                   | Total number of items across all pages                 |
| `itemsPerPage`         | `number`                  | `10`                | Number of items displayed per page                     |
| `onPageChange`         | `(page: number) => void`  | —                   | Callback fired when the current page changes           |
| `onItemsPerPageChange` | `(items: number) => void` | —                   | Callback fired when items-per-page value changes       |
| `showItemsPerPage`     | `boolean`                 | `false`             | Controls visibility of the items-per-page selector     |
| `showItemsInfo`        | `boolean`                 | `true`              | Controls visibility of the items information text      |
| `itemsPerPageOptions`  | `number[]`                | `[10, 20, 50, 100]` | Available options for items per page                   |
| `dataTestId`           | `string`                  | `pagination`        | Custom test identifier for the pagination root element |

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
pagination
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
