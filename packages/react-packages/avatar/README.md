# Avatar Package

Avatars can be used to display circular user profile in user menu, tables etc.

## Avatar Usage

```jsx
import { Avatar, AvatarType, AvatarSize } from '@dt-dds/react';

export const App = () => {
  return (
    <div>
      <Avatar
        type={AvatarType.Primary}
        size={AvatarSize.Medium}
        title='User Name'
      />
    </div>
  );
};
```

## API

### Avatar

This component can contain upto two simple characters by passing a string in prop `title`

| Property     | Type               | Default | Description                                                        |
| ------------ | ------------------ | ------- | ------------------------------------------------------------------ |
| `title`      | `ReactNode`        | -       | Letter characters shown in the avatar                              |
| `type`       | `enum<AvatarType>` | primary | You can choose type of the Avatar you want for different use cases |
| `size`       | `enum<AvatarSize>` | medium  | Sets the Avatar size given the available options                   |
| `imageSrc`   | `string`           | -       | Optional profile image path (will only work with "Profile" type)   |
| `dataTestId` | `string`           | avatar  | Avatar test identifier                                             |
| `isActive`   | `Boolean`          | false   | Persist the Avatar active state                                    |

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
