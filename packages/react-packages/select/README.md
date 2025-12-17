# Select Package

A Select is designed to gather input from users by offering a selection from a predefined list of choices, allowing for single selection and multiple selections.

## Select Usage

```jsx
import { Select } from '@dt-dds/react-select';

const items = [
  { value: 'value1', label: 'Value 1' },
  { value: 'value2', label: 'Value 2' },
  { value: 'value3', label: 'Value 3', disabled: true },
];

export const App = () => {
  const [value, setValue] = useState < string > '';

  return (
    <Select
      label='Choose a value'
      helperText='you need to make a selection'
      isMulti={false}
      value={value}
      onChange={setValue}
      variant='outlined'
      fill='default'
    >
      {items.map((item, index) => (
        <Select.Option
          key={item.value}
          index={index}
          value={item.value}
          disabled={item.disabled}
        >
          {item.label}
        </Select.Option>
      ))}
    </Select>
  );
};
```

## Select

| Property          | Type                       | Default                     | Description                                                                         |
| ----------------- | -------------------------- | --------------------------- | ----------------------------------------------------------------------------------- |
| `label`           | `string`                   | —                           | A label to help users understand the scope of the select field.                     |
| `placeholder`     | `string`                   | —                           | A placeholder to help users understand the scope of the select field.               |
| `value`           | `string`                   | `string[]`                  | Controlled value. A string for single-select; an array of strings for multi-select. |
| `onChange`        | `(value: string) => void`  | `(value: string[]) => void` | Called when the selection changes (string in single mode; array in multi mode).     |
| `isMulti`         | `boolean`                  | `false`                     | Toggles between single and multiple selection.                                      |
| `helperText`      | `ReactNode`                | -                           | Helper text displayed below the field; associated via `aria-describedby`.           |
| `hasError`        | `boolean`                  | `false`                     | Error state (applies `aria-invalid` and error styles).                              |
| `isDisabled`      | `boolean`                  | `false`                     | Disables user interaction.                                                          |
| `isRequired`      | `boolean`                  | —                           | Marks the field as required.                                                        |
| `isFloatingLabel` | `boolean`                  | `true`                      | Controls the “floating label” behavior.                                             |
| `scale`           | `LabelFieldProps['scale']` | `'standard'`                | Visual scale/size for label/field.                                                  |
| `labelIcon`       | `ReactNode`                | —                           | Optional icon rendered next to the label.                                           |
| `variant`         | `SelectVariant`            | `'outlined'`                | Border/line variant of the field.                                                   |
| `fill`            | `SelectFill`               | `'default'`                 | Background fill style of the field.                                                 |
| `style`           | `React.CSSProperties`      | —                           | Inline styles applied to the Select wrapper.                                        |
| `dataTestId`      | `string`                   | `'select'`                  | Test identifier applied to the component container.                                 |
| `children`        | `ReactNode`                | —                           | Typically a list of `Select.Option`.                                                |
| `...rest`         | `HTMLAttributes`           | —                           | Standard HTML attributes.                                                           |

### Select.Option

| Property     | Type                  | Default | Description                                                  |
| ------------ | --------------------- | ------- | ------------------------------------------------------------ |
| `children`   | `ReactNode`           | —       | Visible content of the option (the label shown to the user). |
| `value`      | `string`              | —       | Option value.                                                |
| `valueLabel` | `ReactNode`           | —       | This is a customizable option label on the input.            |
| `index`      | `number`              | —       | Option index in the list (used internally by Downshift).     |
| `isDisabled` | `boolean`             | `false` | Disables the option.                                         |
| `style`      | `React.CSSProperties` | —       | Inline styles for the option.                                |
| `dataTestId` | `string`              | —       | Test identifier for the option.                              |

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
- [Downshift](https://www.downshift-js.com/) managing accessibility

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
select
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
