# Button Package

This component allows the user to take action, by clicking on it.

## Button Usage

```jsx
import { Button } from '@dt-dds/react-button';

export const App = () => {
  const handleClick = () => null; //Some action here

  return <Button onClick={handleClick}>Click me</Button>;
};
```

## Properties

| Property     | Type                                                        | Default | Description                                                                                                                                                              |
| ------------ | ----------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children`   | `ReactNode`                                                 | -       | Child components to be rendered                                                                                                                                          |
| `onClick`    | `function`                                                  | -       | The triggered function when clicked on the button                                                                                                                        |
| `dataTestId` | `string`                                                    | button  | Customizable test identifier                                                                                                                                             |
| `isDisabled` | `boolean`                                                   | false   | Determines the disabled state of the button                                                                                                                              |
| `variant`    | `'solid' \| 'outlined' \| 'text'`                           | solid   | Determines the variant of the button. `solid` button are for high-emphasys actions. `outlined` represent medium-emphasys actions. `text` represent low-emphasys actions. |
| `color`      | `'primary' \| 'error' \| 'secondary'\| 'contrast' 'accent'` | primary | Determines the color of the button. It is dependent on the variant.                                                                                                      |
| `style`      | `React.CSSProperties`                                       | -       | Gives the button some specific css properties                                                                                                                            |
| `isLoading`  | `boolean`                                                   | -       | If set to true, the button is disabled and a spinner is showed next to the label                                                                                         |

#### Variant and Colors

As mentioned in the props table, the colors are dependent on the variant. Here is the list of available colors for each available variant:

| Color\Variant | Solid | Outlined | Text |
| ------------- | ----- | -------- | ---- |
| `primary`     | yes   | yes      | yes  |
| `secondary`   | yes   | yes      | yes  |
| `contrast`    | yes   | -        | -    |
| `accent`      | yes   | yes      | yes  |
| `error`       | yes   | yes      | yes  |

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
button
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
