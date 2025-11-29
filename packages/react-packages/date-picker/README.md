# DatePicker Package

Date picker enables users to input or choose a particular date or a range of dates.
They typically appear in forms and modal windows.

## DatePicker Usage

```jsx
import { useState } from 'react';
import { DatePicker, format } from '@dt-dds/react';

export const App = () => {
  const [value setValue] = useState<string>('');

  return
    <DatePicker
      label='Choose a date'
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onDateSelected={(date) => setValue(format(date))} />; // format date to specific locale
};
```

## Properties

| Property         | Type              | Default  | Description                                                                                                                                                                                                                                |
| ---------------- | ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children`       | `ReactNode`       | -        | Child components to be rendered inside input field.                                                                                                                                                                                        |
| `label`          | `string`          | -        | A label to help users understand the scope of the date picker.                                                                                                                                                                             |
| `value`          | `string`          | -        | Input value of the date picker. Needs to follow the format of the specific locale                                                                                                                                                          |
| `message`        | `string \| null`  | -        | The message to be displayed below the input field.                                                                                                                                                                                         |
| `hasError`       | `boolean`         | -        | Set error state for text field.                                                                                                                                                                                                            |
| `isDisabled`     | `boolean`         | -        | Determines the disabled state of input field.                                                                                                                                                                                              |
| `name`           | `string`          | -        | The attribute to specify the name of the date picker.                                                                                                                                                                                      |
| `required`       | `boolean`         | -        | Set error state with a message: "This field is required."                                                                                                                                                                                  |
| `style`          | `CSSProperties`   | -        | Add css style directly to the text field.                                                                                                                                                                                                  |
| `onDateSelected` | `function`        | -        | The triggered function when the the user clicked on a day in calendar or when the date is valid when typing.                                                                                                                               |
| `min`            | `string`          | -        | Specifies the minimum date                                                                                                                                                                                                                 |
| `max`            | `string`          | -        | Specifies the maximum date                                                                                                                                                                                                                 |
| `weekStartDay`   | `number`          | `0`      | Specifies the day that the weeks starts on the calendar                                                                                                                                                                                    |
| `isMultiMonth`   | `boolean`         | `false`  | Specifies the number of months appearing when calendar is shown                                                                                                                                                                            |
| `mode`           | `single \| range` | `single` | Specifies the mode of selection of teh date picker                                                                                                                                                                                         |
| `onError`        | `function`        | -        | Triggered when an error is found.                                                                                                                                                                                                          |
| `locale`         | `Locale`          | `enUs`   | Specifies the localization settings used by the date picker, including language, date formatting rules, month names, weekday names, and cultural display preferences. This controls how dates are parsed, formatted and shown to the user. |
| `...rest`        | `TextFieldProps`  | -        | [TextField props](/packages/react-packages/text-field/README.md#properties)                                                                                                                                                                |

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
- [React Day Picker](https://daypicker.dev/) for calendar
- [date-fns](https://date-fns.org/) for date manipulation

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
date-picker
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
