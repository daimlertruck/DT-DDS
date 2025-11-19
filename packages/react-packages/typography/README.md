# Typography Package

Typography is an essential aspect of design, influencing how users perceive and interact with content. In digital interfaces, a well-crafted typography component plays a crucial role in enhancing readability, accessibility, and overall user experience.

## Typography Usage

```jsx
import { Typography } from '@dt-dds/react-typography';

export const App = () => {
  return (
    <Typography element='h1' fontStyles='h1' color='grey_200'>
      Some text
    </Typography>
  );
};
```

## Properties

| Property     | Type                                                                        | Default    | Description                                                                |
| ------------ | --------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------- |
| `children`   | `ReactNode`                                                                 | -          | Child components to be rendered                                            |
| `element`    | `Elements`                                                                  | p          | You can set the element tag                                                |
| `color`      | `keyof Theme['colors']` \| `keyof Theme['palette']` \| 'unset' \| 'inherit' | `grey_300` | You can set the color of the element                                       |
| `fontStyles` | `keyof Theme['fontStyles'];`                                                | -          | You can set the font style (weight, line height, font size) of the element |
| `dataTestId` | `string`                                                                    | typography | Customizable test identifier                                               |
| `style`      | `React.CSSProperties`                                                       | -          | Customizable styles                                                        |
| `ref`        | `RefObject`                                                                 | -          | Provides a way to access DOM node or React element reference.              |
| `...rest`    | `ComponentPropsWithoutRef<E>` & `BaseProps`                                 | —          | Additional native HTML attributes for the chosen `element`.                |
|              |

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

## Compilation

Running `yarn build` from the root of the package will use [tsup](https://tsup.egoist.dev/) to compile the raw TypeScript and React code to plain JavaScript.

The `/dist` folder contains the compiled output.

```bash
typography
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
