# Table Package

Table is used to organize and display data efficiently and can be fully customized.

## Table Usage

```jsx
import { Table } from '@dt-dds/react';

export const App = () => {
  const columns = ['Column 1', 'Column 2', 'Column 3', 'Column 4'];
  const fixedColumnCount = 1;
  const fixedEndColumnCount = 2;
  const rows = [
    [
      'Row 1 - content 1',
      'Row 1 - content 2',
      'Row 1 - content 3',
      'Row 1 - Some more content 4',
    ],
    [
      'Row 2 - content 1',
      'Row 2 - content 2',
      'Row 2 - content 3',
      'Row 2 - content 4',
    ],
    [
      'Row 3 - content 1',
      'Row 3 - content 2',
      'Row 3 - content 3',
      'Row 3 - content 4',
    ],
  ];

  return (
    <div>
      <Table
        fixedColumnCount={fixedColumnCount}
        fixedEndColumnCount={fixedEndColumnCount}
      >
        <Table.Head>
          <Table.Row>
            {columns.map((column: string) => (
              <Table.ColumnHeader key={`column-header-${column}`}>
                {column}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row: string[], i: number) => (
            <Table.Row key={row.toString()}>
              {row.map((content: string, i: number) => (
                <Table.DataCell key={`column-${columns[i]}-${content}`}>
                  {content}
                </Table.DataCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
```

## Properties

### Table

| Property              | Type                  | Default | Description                                                                     |
| --------------------- | --------------------- | ------- | ------------------------------------------------------------------------------- |
| `children`            | `ReactNode`           | -       | Child components to be rendered                                                 |
| `isFixed`             | `boolean`             | -       | Define the table layout value. If the value is true, the table-layout is fixed. |
| `dataTestId`          | `string`              | -       | Customizable test identifier                                                    |
| `style`               | `React.CSSProperties` | -       | Gives the Table some specific css properties                                    |
| `fixedColumnCount`    | `number`              | 0       | Number that indicates how many columns should be fixed on the left              |
| `fixedEndColumnCount` | `number`              | 0       | Number that indicates how many columns should be fixed on the right             |

### Table.Head

| Property         | Type                  | Default | Description                                                       |
| ---------------- | --------------------- | ------- | ----------------------------------------------------------------- |
| `children`       | `ReactNode`           | -       | Child components to be rendered                                   |
| `hasFixedHeader` | `boolean`             | false   | Define the column headers sticky when scrolling the table content |
| `dataTestId`     | `string`              | -       | Customizable test identifier                                      |
| `style`          | `React.CSSProperties` | -       | Gives the Table.Head some specific css properties                 |

### Table.ColumnHeader

| Property     | Type                  | Default | Description                                               |
| ------------ | --------------------- | ------- | --------------------------------------------------------- |
| `children`   | `ReactNode`           | -       | Child components to be rendered                           |
| `textAlign`  | `TextAlign`           | `left`  | Defines the text align within the column header           |
| `dataTestId` | `string`              | -       | Customizable test identifier                              |
| `style`      | `React.CSSProperties` | -       | Gives the Table.ColumnHeader some specific css properties |

### Table.Body

| Property     | Type                  | Default | Description                                       |
| ------------ | --------------------- | ------- | ------------------------------------------------- |
| `children`   | `ReactNode`           | -       | Child components to be rendered                   |
| `dataTestId` | `string`              | -       | Customizable test identifier                      |
| `style`      | `React.CSSProperties` | -       | Gives the Table.Body some specific css properties |

### Table.Row

| Property     | Type                                             | Default | Description                                      |
| ------------ | ------------------------------------------------ | ------- | ------------------------------------------------ |
| `children`   | `ReactNode`                                      | -       | Child components to be rendered                  |
| `onClick`    | `(event: React.MouseEvent<HTMLElement>) => void` | -       | The triggered function when clicked on the row   |
| `dataTestId` | `string`                                         | -       | Customizable test identifier                     |
| `style`      | `React.CSSProperties`                            | -       | Gives the Table.Row some specific css properties |

### Table.DataCell

| Property      | Type                  | Default | Description                                                                     |
| ------------- | --------------------- | ------- | ------------------------------------------------------------------------------- |
| `children`    | `ReactNode`           | -       | Child components to be rendered                                                 |
| `columnWidth` | `string`              | -       | Sets a fixed width value for the table column, applies only for desktop screens |
| `textAlign`   | `TextAlign`           | `left`  | Defines the text align within the column                                        |
| `dataLabel`   | `string`              | -       | Column name to be shown in the gallery mode (applied in tablet/mobile screens)  |
| `isVisible`   | `boolean`             | `false` | Change the overflow visibility of the cell                                      |
| `dataTestId`  | `string`              | -       | Customizable test identifier                                                    |
| `style`       | `React.CSSProperties` | -       | Gives the Table.Row some specific css properties                                |

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
- `yarn test` Run all unit tests
- `yarn test:report` - Open the test coverage report
- `yarn test:update:snapshot` - Run all unit tests and update the snapshot

## Compilation

Running `yarn build` from the root of the package will use [tsup](https://tsup.egoist.dev/) to compile the raw TypeScript and React code to plain JavaScript.

The `/dist` folder contains the compiled output.

```bash
table
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
