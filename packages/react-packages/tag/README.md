# Tag Package

Tags can be used to display states (Active, Cancelled...) in lists, tables, etc.

## Tag Usage

```jsx
import { Tag } from '@dt-dds/react-tag';

export const App = () => {
  return <Tag>Active</Tag>;
};
```

## Properties

### Tag

| Property      | Type         | Default | Description                                                                                                                                                  |
| ------------- | ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children`    | `ReactNode`  | -       | Child components to be rendered                                                                                                                              |
| `dataTestId`  | `string`     | tag     | Customizable test identifier                                                                                                                                 |
| `variant`     | `TagVariant` | solid   | Determines the variant of the tag                                                                                                                            |
| `color`       | `TagColor`   | primary | Determines the color of the tag                                                                                                                              |
| `size`        | `TagSize`    | small   | Determines the size of the tag                                                                                                                               |
| `border`      | `TagBorder`  | squared | Determines the border style of the tag                                                                                                                       |
| `isDisabled`  | `boolean`    | false   | Specifies if the element should be disabled                                                                                                                  |
| `isClickable` | `boolean`    | false   | Specifies if the element should have the clickable styles                                                                                                    |
| `onClick`     | `function`   | -       | The triggered function when the tag is clicked. This also applies the clickable styles. If the component has the onClose property this will not be triggered |
| `onClose`     | `function`   | -       | The triggered function when closing the tag                                                                                                                  |

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
tag
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
