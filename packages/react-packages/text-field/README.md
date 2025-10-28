# TextField Package

TextField allows users to enter and edit text. They typically appear in forms and modal windows.

## TextField Usage

```jsx
import { TextField } from '@dt-dds/react-text-field';

export const App = () => {
  return <TextField label='My Field' message='Helpful hint' maxLength={40} />;
};
```

## Properties

| Property          | Type                         | Default    | Description                                                                                           |
| ----------------- | ---------------------------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| `children`        | `ReactNode`                  | -          | Child components to be rendered inside input field.                                                   |
| `label`           | `string`                     | -          | A label to help users understand the scope of the text field.                                         |
| `labelIcon`       | `ReactNode`                  | -          | Sets icon for label to provide guidance about the scope of the field.                            |
| `initialValue`    | `string`                     | -          | Sets the initial value of the text field.                                                             |
| `message`         | `string`                     | -          | The message to be displayed below the input field. Useful for hints or to display errors.             |
| `hasError`        | `boolean`                    | -          | Set error state for text field.                                                                       |
| `disabled`        | `boolean`                    | -          | Determines the disabled state of input field.                                                         |
| `name`            | `string`                     | -          | The attribute to specify the name of the text field.                                                  |
| `required`        | `boolean`                    | -          | Set error state with a message defined in `requiredMessage`                                           |
| `requiredMessage` | `string`                     | -          | The error message to show when the required validation is triggered                                   |
| `style`           | `CSSProperties`              | -          | Add css style directly to the text field.                                                             |
| `inputRef`        | `RefObject`                  | -          | Provides a way to access DOM node or React element reference.                                         |
| `maxLength`       | `number`                     | -          | The maximum number of characters that user can enter.                                                 |
| `type`            | `HTMLInputTypeAttribute`     | `text`     | Used to specify the type of element to display.                                                       |
| `onChange`        | `function`                   | -          | The triggered function when the input change.                                                         |
| `onResetInput`    | `function`                   | -          | The triggered function when clicked on the cross icon, when type is search                            |
| `variant`         | `[outlined, bottomLine]`     | `outlined` | Styles the input with outlined or with bottom line                                                    |
| `scale`           | `[compact, standard]`        | `standard` | Sets the spacing and size of the text field                                                               |
| `backgroundFill`  | `[default, contrast, light]` | `default`  | Styles the input with background color                                                                |
| `isFloatingLabel` | `boolean`                    | `false`    | Sets the label floating or traditional on top of the input                                            |
| `extraPrefix`     | `ExtraComponent`             | -          | Component to be rendered on the left side inside the input field                                      |
| `extraSuffix`     | `ExtraComponent`             | -          | Component to be rendered on the right side inside the input field                                     |
| `id`              | `string`                     | -          | The unique identifier used to link the element to the corresponding element via the htmlFor attribute |
| `dataTestId`      | `string`                     | `label`-text-field | Customizable test identifier                                                                  |
| `...`             | `InputHTMLAttributes`        | -          | All available attributes from native html input                                                       |

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
text-field
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
