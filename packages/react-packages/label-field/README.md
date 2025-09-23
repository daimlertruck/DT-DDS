# LabelField Package

The `<label>` represents a caption for an item in a user interface.

## LabelField Usage

```jsx
import { LabelField } from '@dt-dds/react';

export const App = () => {
  const INPUT_ID = 'input-id';
  return (
    <>
      <LabelField forId={INPUT_ID} label='My Awesome Input' isActive={true} />
      <input id={INPUT_ID} />
    </>
  );
};
```

## Properties

### LabelField

The component that displays the caption for the user.

| Property        | Type            | Default     | Description                                                                                                                           |
| --------------- | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `children`      | `ReactNode`     | -           | Child components to be rendered                                                                                                       |
| `forId`         | `string`        | -           | It refers to the input control that this label is for. Its value must be the same as the value of the input control’s “id” attribute. |
| `isActive`      | `boolean`       | false       | Apply styles to change the label behaviour                                                                                            |
| `isDisabled`    | `boolean`       | false       | Apply different styles based on this value                                                                                            |
| `dataTestId`    | `string`        | label-field | Textarea test identifier                                                                                                              |
| `style`         | `CSSProperties` | -           | Styles to apply to the label field                                                                                                    |
| `isRequired`    | `boolean`       | false       | Apply required state to the label field                                                                                               |
| `hasError`      | `boolean`       | false       | Apply error styles to the label field                                                                                                 |
| `isInputFilled` | `boolean`       | false       | Apply styles on the floating label field                                                                                              |

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

Licensed under [MIT License](LICENSE.md)
