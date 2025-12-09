# Sidebar Package

A compound component for building navigation sidebars with collapsible sections, nested items, and responsive behavior.

## Usage

```jsx
import { useTheme } from '@emotion/react';
import { Sidebar, useSidebar } from '@dt-dds/react-sidebar';
import { Icon } from '@dt-dds/react-icon';

export const App = () => {
  const theme = useTheme();

  const { isExpanded, toggleSidebar } = useSidebar({ isExpanded: true });

  return (
    <Sidebar isExpanded={isExpanded} onToggle={toggleSidebar}>
      <Sidebar.Header show={`(max-width: ${theme.breakpoints.mq3}px)`}>
        <Sidebar.Item>
          <Sidebar.Toggle />
          <span>App Name</span>
        </Sidebar.Item>
      </Sidebar.Header>

      <Sidebar.Divider show={`(max-width: ${theme.breakpoints.mq3}px)`} />

      <Sidebar.Content>
        <Sidebar.Section title='Section One'>
          <Sidebar.Item href='/'>
            <Icon code='dashboard' />
            Menu Item
          </Sidebar.Item>
          <Sidebar.Item href='/'>
            <Icon code='analytics' />
            Menu Item
            <Sidebar.SubList>
              <Sidebar.Item href='/'>Nested Menu Item</Sidebar.Item>
              <Sidebar.Item href='/'>Nested Menu Item</Sidebar.Item>
            </Sidebar.SubList>
          </Sidebar.Item>
        </Sidebar.Section>
      </Sidebar.Content>

      <Sidebar.Divider />

      <Sidebar.Footer>
        <Sidebar.Item href='/settings'>
          <Icon code='settings' />
          Settings
        </Sidebar.Item>
      </Sidebar.Footer>

      <Sidebar.Divider hide={`(max-width: ${theme.breakpoints.mq3}px)`} />

      <Sidebar.Footer hide={`(max-width: ${theme.breakpoints.mq3}px)`}>
        <Sidebar.Item>
          <Sidebar.Toggle />
          <span>Collapse</span>
        </Sidebar.Item>
      </Sidebar.Footer>
    </Sidebar>
  );
};
```

## API

### Sidebar

| Property     | Type                          | Default  | Description                       |
| ------------ | ----------------------------- | -------- | --------------------------------- |
| `isExpanded` | `boolean`                     | required | Controls expanded/collapsed state |
| `onToggle`   | `(expanded: boolean) => void` | -        | Callback when toggle is triggered |
| `placement`  | `'left' \| 'right'`           | `'left'` | Desktop sidebar position          |
| `offsetTop`  | `number`                      | `0`      | Top offset in pixels              |
| `ariaLabel`  | `string`                      | -        | Accessibility label               |

### Sidebar.Item

| Property          | Type                          | Default | Description                       |
| ----------------- | ----------------------------- | ------- | --------------------------------- |
| `href`            | `string`                      | -       | Navigation URL                    |
| `defaultExpanded` | `boolean`                     | `false` | Initial expanded state (SubList)  |
| `expanded`        | `boolean`                     | -       | Controlled expanded state         |
| `onToggle`        | `(expanded: boolean) => void` | -       | Callback when item is toggled     |
| `children`        | `ReactNode`                   | -       | Item content and optional SubList |

### Sidebar.Section

| Property   | Type        | Default | Description   |
| ---------- | ----------- | ------- | ------------- |
| `title`    | `string`    | -       | Section title |
| `children` | `ReactNode` | -       | Section items |

### Sidebar.SubList

Wrapper for nested `Sidebar.Item` elements. Auto-expands when a child item is active.

### Sidebar.Header / Sidebar.Footer

Fixed position sections at top/bottom of the sidebar.

### Sidebar.Content

Scrollable content area between header and footer.

### Sidebar.Toggle

Button that triggers `onToggle`.

### Sidebar.Divider

Visual separator between sections.

## Hooks

### useSidebar

Standalone state management hook.

```jsx
const { isExpanded, setIsExpanded, toggleSidebar } = useSidebar({
  isExpanded: true,
});
```

## Custom Link Components

Supports custom link components (React Router, Next.js, etc.):

```jsx
<Sidebar.Item>
  <Link to='/dashboard'>
    <Icon code='dashboard' />
    Dashboard
  </Link>
</Sidebar.Item>
```

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
sidebar
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
