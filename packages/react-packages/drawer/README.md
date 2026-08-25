# Drawer Package

A drawer is a component that slides in from the side of the screen. It is typically used to display additional content, such as a detail view or a list of options.

## Usage

```jsx
import { Drawer } from '@dt-dds/react';

export const App = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(props.isVisible);

  const toggleDrawer = () => {
    setIsDrawerVisible((prevState) => !prevState);
  };

  return (
    <>
      <button onClick={toggleDrawer} type='button'>
        Open Drawer
      </button>

      <Drawer isVisible={isDrawerVisible} setIsVisible={setIsDrawerVisible}>
        <Drawer.Header>
          <Drawer.Title title='Drawer title' />
          <div>Drawer header content here.</div>
        </Drawer.Header>
        <Drawer.Body>
          <div>Drawer body content here.</div>
        </Drawer.Body>
      </Drawer>
    </>
  );
};
```

## API

### Drawer

| Property       | Type             | Default | Description                                                                  |
| -------------- | ---------------- | ------- | ---------------------------------------------------------------------------- |
| `isVisible`    | `boolean`        | false   | State function boolean value to define if the drawer is being shown or not   |
| `setIsVisible` | `function`       | -       | State function set to handle the drawer open and close via its boolean value |
| `position`     | `DrawerPosition` | right   | Property that sets the opening position of the Drawer                        |
| `children`     | `ReactNode`      | -       | Child component to be rendered on the drawer body                            |
| `dataTestId`   | `string`         | drawer  | Drawer test identifier                                                       |

### Drawer.Title

| Property | Type     | Default | Description              |
| -------- | -------- | ------- | ------------------------ |
| `title`  | `string` | -       | Defines the drawer title |

### Drawer.Header

A Drawer header displays header content and includes a close button. It should wrap the `Drawer.Title`.

| Property   | Type        | Default | Description                     |
| ---------- | ----------- | ------- | ------------------------------- |
| `children` | `ReactNode` | -       | Child components to be rendered |

### Drawer.Body

| Property   | Type        | Default | Description                     |
| ---------- | ----------- | ------- | ------------------------------- |
| `children` | `ReactNode` | -       | Child components to be rendered |

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
drawer
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
