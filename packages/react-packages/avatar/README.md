# Avatar Package

Avatars can be used to display circular user profile in user menu, tables etc.

This component is purely presentational and for Interactivity it can be used with IconButton.

## Avatar Usage

### Default

```jsx
import { Avatar } from '@dt-dds/react';

export const App = () => {
  return (
    <Avatar title='User Name' size='medium' />
  );
};
```

### With photo

```jsx
import { Avatar } from '@dt-dds/react';

export const App = () => {
  return (
    <Avatar type='photo' imageSrc='/profile.png' size='medium' />
  );
};
```

### Collapsed

```jsx
import { Avatar } from '@dt-dds/react';

export const App = () => {
  return (
    <Avatar type='collapsed' collapsedCount='+1' size='medium' />
  );
};
```

### Thumbnail

```jsx
import { Avatar } from '@dt-dds/react';

export const App = () => {
  return (
    <Avatar type='thumbnail' size='medium' />
  );
};
```

### Sizes

```jsx
import { Avatar } from '@dt-dds/react';

export const App = () => {
  return (
    <>
      <Avatar title='User Name' size='small' />
      <Avatar title='User Name' size='medium' />
      <Avatar title='User Name' size='large' />
    </>
  );
};
```

### Types with different sizes

```jsx
import { Avatar } from '@dt-dds/react';

export const App = () => {
  return (
    <>
      <Avatar type='letter' title='John Doe' size='large' />
      <Avatar type='photo' imageSrc='/profile.png' size='small' />
      <Avatar type='thumbnail' size='medium' />
      <Avatar type='collapsed' collapsedCount='+4' size='medium' />
    </>
  );
};
```

## API

### Avatar

This component can contain upto two simple characters by passing a string in prop `title`

| Property          | Type               | Default | Description                                                        |
| ----------------- | ------------------ | ------- | ------------------------------------------------------------------ |
| `title`           | `string`           | -       | Letter characters shown in the avatar                              |
| `type`            | `AvatarType` | `'letter'`  | Selects which visual style the Avatar uses. Accepts: <br/>• `'letter'` – shows initials. <br/>• `'collapsed'` – shows "+N" for group overflow. <br/>• `'thumbnail'` – generic placeholder icon. <br/>• `'photo'` – uses `imageSrc` with automatic fallback to type thumbnail. |
| `size`            | `AvatarSize` | `'medium'`  | Controls the Avatar dimensions. Accepts: <br/>• `'small'` – compact UI. <br/>• `'medium'` – default. <br/>• `'large'` – prominent/profile use. |
| `imageSrc`        | `string`           | -       | Optional image path (will only work with "Photo" type)             |
| `dataTestId`      | `string`           | avatar  | Avatar test identifier                                             |
| `collapsedCount`  | `string`           | '+1'     | Number displayed inside a collapsed avatar (max 3 characters). Defaults to `'+1'` when `type="collapsed"`.  |
| `customInitials`  | `string`           | -       | Custom initials to display (max 2 characters). Replaces `title` if present. |
| `hasTooltip`      | `Boolean`          | false   | Shows tooltip when hovering on the Avatar                          |

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
avatar
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
