# Message Package

This component fills the width of the container where is placed and its height varies depending on the content in it.
The usage of this component is to show a message to call attention to something, be it useful information or a warning message. They should be used to provide context in proximity to a piece of content.
Furthermore, it can be used to add an action like a link, by passing it as a children.

## Usage

```jsx
import { Message } from '@dt-ui/react';

export const App = () => {
  const title = 'Some Title';
  const description = 'Some Description';
  const type = 'Error';

  return (
    <Message type={type}>
      <Message.Title>{title}</Message.Title>
      <Message.Description>{description}</Message.Description>
      <Message.Action>
        <Link textSize={LinkTextSize.Small} href='/'>
          View action
        </Link>
      </Message.Action>
    </Message>
  );
};
```

## API

### Message

| Property      | Type          | Default     | Description                                                                                                                                                              |
| ------------- | ------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children`    | `ReactNode`   | -           | Child components to be rendered. There is flexibility on what the content can be, but the recommendation is that it should be a link with a character count limit of 25. |
| `dataTestId`  | `string`      | `'message'` | Customizable test identifier.                                                                                                                                            |
| `type`        | `MessageType` | -           | Sets the type of the Message, responsible for the icon and It's color, the background color and color of the dashed border                                               |
| `title`       | `string`      | -           | Optional Text to be presented as Title within the Message.Content, It should have text character count limit: 50.                                                        |
| `description` | `string`      | -           | Text to be presented as Description within the Message.Content, It should have text character count limit: 230.                                                          |

### Message.Title

| Property   | Type        | Default | Description                                                          |
| ---------- | ----------- | ------- | -------------------------------------------------------------------- |
| `children` | `ReactNode` | -       | Child components to be rendered within the action. Text is expected. |

### Message.Description

| Property   | Type        | Default | Description                                                          |
| ---------- | ----------- | ------- | -------------------------------------------------------------------- |
| `children` | `ReactNode` | -       | Child components to be rendered within the action. Text is expected. |

### Message.Action

| Property     | Type        | Default            | Description                                        |
| ------------ | ----------- | ------------------ | -------------------------------------------------- |
| `children`   | `ReactNode` | -                  | Child components to be rendered within the action. |
| `dataTestId` | `string`    | `'message-action'` | Customizable test identifier for the action.       |

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
message
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
    ...
```

## Versioning

Follows [semantic versioning](https://semver.org/)

## &copy; License

Licensed under [Daimler Inner Source License (ISL)](LICENSE.md)

For more info, see [Daimler FOSS](https://git.t3.daimlertruck.com/tbf/daimler-inner-source-license)
