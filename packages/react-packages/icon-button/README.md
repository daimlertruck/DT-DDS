# IconButton

This component allows the user to take action by clicking on an Icon. It is a flexible button component that renders an icon and can be composed with any child element through CSS overrides for advanced styling customization.

## Usage

### With Icon

```jsx
import { IconButton } from '@dt-dds/react';
import { Icon } from '@dt-dds/react-icon';

export const App = () => {
  const handleClick = () => console.log('Edit clicked');

  return (
    <IconButton 
      onClick={handleClick}
      ariaLabel="Edit profile"
    >
      <Icon code='edit' />
    </IconButton>
  );
};
```

### With Avatar

```jsx
import { IconButton } from '@dt-dds/react-icon-button';
import { Avatar } from '@dt-dds/react-avatar';

export const AvatarButton = () => {
  return (
    <IconButton
      ariaLabel="User profile"
      onClick={() => console.log('Avatar clicked')}
    >
      <Avatar
        title="John Doe"
        type="letter"
        size="medium"
      />
    </IconButton>
  );
};
```

### CSS Overrides

The cssOverrides prop allows you to apply custom CSS styles to the IconButton and its children. This enables full styling flexibility while keeping IconButton agnostic of its child components.

#### Example: Custom Icon Button Styling

```jsx
import { IconButton } from '@dt-dds/react-icon-button';
import { Icon } from '@dt-dds/react-icon';
import { css } from '@emotion/react';

export const CustomButton = () => {
  const customStyles = css`
    &:hover:not(:disabled) {
      background-color: #ff5733;
    }
  `;

  return (
    <IconButton cssOverrides={customStyles}>
      <Icon code='star' />
    </IconButton>
  );
};
```

## API

### IconButton

| Property     | Type                | Default   | Description                                       |
| ------------ | ------------------- | --------- | ------------------------------------------------- |
| `children`   | `ReactNode`         | -         | Icon component to be rendered                     |
| `onClick`    | `function`          | -         | The triggered function when clicked on the button |
| `dataTestId` | `string`            | button    | Customizable test identifier                      |
| `isDisabled` | `boolean`           | false     | Determines the disabled state of the button       |
| `variant`    | `IconButtonVariant` | `default` | Determines the variant of the icon                |
| `size`       | `ComponentSize`     | `large`   | Determines the size of the icon                   |
| `cssOverrides`| `ReturnType<typeof css>`| -   | Emotion CSS to apply custom styles to the button and its children |

### Accessibility

- Always provide ariaLabel when the button doesn't contain readable text (e.g., icon-only buttons)
- Focus outline is automatically visible with keyboard navigation
- Disabled buttons are properly marked and keyboard-inaccessible
- Supports screen readers through semantic button element

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
iconButton
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
