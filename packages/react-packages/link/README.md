# Link Package

The link component is used as a navigational element to navigate users to another location and it allows to easily customize anchor elements.

## Link Usage

```jsx
import { Link } from '@dt-dds/react-link';

export const App = () => {
  return <Link href='/'>Some text</Link>;
};
```

## Properties

| Property     | Type          | Default      | Description                                     |
| ------------ | ------------- | ------------ | ----------------------------------------------- |
| `children`   | `ReactNode`   | -            | Child components to be rendered                 |
| `dataTestId` | `string`      | tag          | Customizable test identifier                    |
| `onClick`    | `function`    | -            | The triggered function when the Link is clicked |
| `isDisabled` | `boolean`     | `false`      | Specifies if the element should be disabled     |
| `size`       | `LinkSize`    | `medium`     | Specifies the text size of the element          |
| `variant`    | `LinkVariant` | `standalone` | Specifies the type of link                      |
| `color`      | `LinkColor`   | `accent`     | Specifies the color of the link                 |

This component inherits all native anchor properties. [Learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).

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
link
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
