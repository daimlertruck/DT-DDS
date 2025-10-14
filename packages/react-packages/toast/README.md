# Toast Package

Toast is a pop-up message used to display relevant information to our users.

## Usage

```jsx
import { Toaster, ToastType, emitToast } from '@dt-dds/react';

const notify = () =>
  emitToast({
    title: 'success',
    message: 'myMEssage' + count,
    type: ToastType.Success,
  });

const App = () => {
  return (
    <div>
      <button onClick={notify}>Click me</button>
      <Toaster />
    </div>
  );
};
```

### Customizable

It's a very customizable component. We are using [react-hot-toast](https://react-hot-toast.com/) for control our provider. You can check the `react-hot-toast` documentation for more knowledge on this. However, you can create your provider if you wish. For example, let's say you want to create a new prop called `autoHide`. If this prop isn't true, you want to have the toast indefinitely on the screen.

```tsx
interface CallToastArgs {
  title: string;
  message: string;
  type: ToastType;
  autoHide: boolean;
}

export const ToasterContext = createContext({
  callToast: (args: CallToastArgs) => null,
});

const Toaster = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<
    Partial<ToastProps> & { autoHide: boolean }
  >(null);

  const callToast = ({ title, message, type, autoHide }: CallToastArgs) =>
    setToast({
      id: Date.now().toString(),
      title,
      message,
      type,
      autoHide,
    });

  const close = () =>
    setToast((prevState) => ({ ...prevState, isVisible: false }));

  useEffect(() => {
    if (toast && toast.autoHide) {
      const timer = setTimeout(() => close(), 1000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToasterContext.Provider value={{ callToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: 10, left: 10 }}>
        {toast && (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            isVisible={toast.isVisible}
            onClose={close}
          />
        )}
      </div>
    </ToasterContext.Provider>
  );
};

const App = () => {
  return (
    <Toaster>
      <MyComponent />
    </Toaster>
  );
};

const MyComponent = () => {
  const { callToast } = useContext(ToasterContext);

  return (
    <Button
      onClick={() =>
        callToast({
          message: 'myMEssage' + count,
          type: ToastType.Success,
          title: 'success',
          autoHide: false,
        })
      }
    >
      Clicked Me
    </Button>
  );
};
```

## API

### Toaster

| Property             | Type                  | Default   | Description                                                                                                             |
| -------------------- | :-------------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------- |
| `toastOptions`       | `DefaultToastOptions` | -         | These will act as default options for all toasts. See the documentation [here](https://react-hot-toast.com/docs/toast). |
| `reverseOrder`       | `boolean`             | -         | Toasts spawn at top by default. Set to true if you want new toasts at the end.                                          |
| `gutter`             | `number`              | 8         | Changes the gap between each toast.                                                                                     |
| `containerStyle`     | `React.CSSProperties` | -         | Customize the style of toaster div. This can be used to change the offset of all toasts                                 |
| `containerClassName` | `string`              | undefined | Add a custom CSS class name to toaster div.                                                                             |
| `actions`            | `Action`              | -         | An array of 2 actions                                                                                                   |

### emitToast

| Property      | Type              | Default | Description                                                               |
| ------------- | :---------------- | :------ | :------------------------------------------------------------------------ |
| `type`        | `enum<ToastType>` | -       | Sets the variant toast ("success", ..., "N")                              |
| `title`       | `string`          | -       | The title to be displayed                                                 |
| `message`     | `string`          | -       | The message to be displayed                                               |
| `dismissable` | `boolean`         | true    | Sets the visibility of a close button that will fire the onClose callback |
| `actions`     | `Action`          | -       | List of 2 actions that will be rendered on the bottom                     |

The emitToast extends from ToastOptions. They will overwrite all options received from `<Toaster />`. For example:

| Property   | Type            | Default                            | Description                         |
| ---------- | :-------------- | :--------------------------------- | :---------------------------------- |
| `duration` | `number`        | For success: 4000, error: Infinity | Show the toast for a duration in ms |
| `style`    | `CSSProperties` | -                                  | Add css directly to the toast.      |

You can check all ToastOptions [here](https://react-hot-toast.com/docs/toast).
The Toast position is fixed, on small screens it will be on the bottom center and on large screens it will be on the bottom right.
The default duration for any type of toast is 4000ms. For the error type, the duration is infinite.

### dismissToast

| Property  | Type     | Default | Description                |
| --------- | :------- | :------ | :------------------------- |
| `toastId` | `string` | -       | ID of the toast to dismiss |

### Toast

| Property      | Type              | Default | Description                                                                                                   |
| ------------- | :---------------- | :------ | :------------------------------------------------------------------------------------------------------------ |
| `id`          | `string`          | -       | Toast identifier                                                                                              |
| `dataTest`    | `string`          | -       | Defines a value for the data test                                                                             |
| `title`       | `string`          | -       | The title to be displayed                                                                                     |
| `message`     | `string`          | -       | The message to be displayed                                                                                   |
| `onClose`     | `string`          | -       | The callback when the close button is fired.                                                                  |
| `type`        | `enum<ToastType>` | -       | Sets the variant toast ("success", ..., "N")                                                                  |
| `isVisible`   | `boolean`         | true    | Sets the visibility of the toast and triggers the fade out effect                                             |
| `dismissable` | `boolean`         | true    | Sets the visibility of a close button that will fire the onClose callback                                     |
| `children`    | `ReactNode`       | -       | Child components to be rendered at the end of the content section, this can be used to receive action buttons |

### Stack

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

### Commands

- `yarn build` - Build the package
- `yarn dev` - Run the package locally
- `yarn lint` - Lint all files within this package
- `yarn test` - Run all unit tests
- `yarn test:report` - Open the test coverage report
- `yarn test:update:snapshot` - Run all unit tests and update the snapshot

### Compilation

Running `yarn build` from the root of the package will use [tsup](https://tsup.egoist.dev/) to compile the raw TypeScript and React code to plain JavaScript.

The `/dist` folder contains the compiled output.

```bash
toast
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
    ...
```

### Versioning

Follows [semantic versioning](https://semver.org/)

## &copy; License

Licensed under [MIT License](LICENSE.md)
