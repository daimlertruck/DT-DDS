# AppHeader Package

AppHeader is a flexible compound component that provides a complete application header with support for multiple layouts, responsive behavior, and customizable sections including logo, app name, navigation, and action buttons.

## AppHeader Usage

```jsx
import { AppHeader } from '@dt-dds/react-app-header';
import { Icon } from '@dt-dds/react-icon';
import { IconButton } from '@dt-dds/react-icon-button';

export const App = () => {
  return (
    <AppHeader type='standard'>
      <AppHeader.Actions position='left'>
        <IconButton ariaLabel='menu' onClick={() => null}>
          <Icon code='menu' />
        </IconButton>
      </AppHeader.Actions>

      <AppHeader.AppName name='My App' />

      <AppHeader.Logo>
        <img src='/logo.svg' alt='Logo' />
      </AppHeader.Logo>

      <AppHeader.Navigation position='center'>
        <ul>
          <li>
            <a href='/home'>Home</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
        </ul>
      </AppHeader.Navigation>

      <AppHeader.Actions position='right'>
        <IconButton ariaLabel='search' onClick={() => null}>
          <Icon code='search' />
        </IconButton>
      </AppHeader.Actions>
    </AppHeader>
  );
};
```

## API

### AppHeader

The main container component that manages layout and state for all child components.

| Property   | Type                      | Default    | Description                                                                                         |
| ---------- | ------------------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `type`     | `'standard' \| 'compact'` | `standard` | Determines the header layout. `standard` shows app name before logo, `compact` shows it after logo. |
| `style`    | `React.CSSProperties`     | -          | Custom CSS properties to apply to the header container                                              |
| `children` | `ReactNode`               | -          | Child components: Logo, AppName, Navigation, and Actions                                            |

### AppHeader.Logo

Container for the application logo. Automatically adjusts positioning based on header type and layout.

| Property   | Type                  | Default | Description                       |
| ---------- | --------------------- | ------- | --------------------------------- |
| `children` | `ReactNode`           | -       | Logo content (typically an image) |
| `style`    | `React.CSSProperties` | -       | Custom CSS properties             |

### AppHeader.AppName

Displays the application name with automatic typography styling based on header type.

| Property   | Type                  | Default | Description                                   |
| ---------- | --------------------- | ------- | --------------------------------------------- |
| `name`     | `string`              | -       | Application name text                         |
| `children` | `ReactNode`           | -       | Alternative to `name` prop for custom content |
| `style`    | `React.CSSProperties` | -       | Custom CSS properties                         |

### AppHeader.Navigation

Container for navigation links. Supports flexible positioning and responsive visibility.

| Property   | Type                            | Default  | Description                                    |
| ---------- | ------------------------------- | -------- | ---------------------------------------------- |
| `children` | `ReactNode`                     | -        | Navigation content (typically a list of links) |
| `position` | `'center' \| 'left' \| 'right'` | `center` | Navigation position within the header          |
| `style`    | `React.CSSProperties`           | -        | Custom CSS properties                          |

### AppHeader.Actions

Container for action buttons and controls (search, menu, user profile, etc.). Supports left and right positioning.

| Property   | Type                  | Default | Description                           |
| ---------- | --------------------- | ------- | ------------------------------------- |
| `children` | `ReactNode`           | -       | Action buttons and controls           |
| `position` | `'left' \| 'right'`   | `right` | Position of actions within the header |
| `style`    | `React.CSSProperties` | -       | Custom CSS properties                 |

#### Responsive Props

All compound components (`Logo`, `AppName`, `Navigation`, `Actions`) support responsive visibility through `hide` and `show` props:

- **`hide`**: Hides the component when the media query matches (e.g., `hide={`(min-width: ${theme.breakpoints.mq3}px)`}` hides on desktop)
- **`show`**: Shows the component only when the media query matches (e.g., `show={`(max-width: ${theme.breakpoints.mq3}px)`}` shows only on mobile)
- If both `hide` and `show` are provided, `hide` takes precedence

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
app-header
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
