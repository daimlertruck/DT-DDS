# Stepper Package

Steppers convey progress through numbered, bullet, or icon-based sequential steps. 

They support various states including completed, incomplete, warning, error, and disabled.

## Stepper Usage

```jsx
import { Stepper } from '@dt-dds/react-stepper';

export const App = () => {
  return (
    <Stepper>
      <Stepper.Step 
        title="Completed Step" 
        description="This step is done"
        state="completed" 
      />
      <Stepper.Step 
        title="Current Step" 
        description="Working on this"
        state="incomplete"
        isActive={true}
      />
      <Stepper.Step 
        title="Warning Step" 
        description="Needs attention"
        state="warning" 
      />
      <Stepper.Step 
        title="Error Step" 
        description="Something went wrong"
        state="error" 
      />
      <Stepper.Step 
        title="Disabled Step" 
        description="Not available yet"
        state="disabled" 
      />
    </Stepper>
  );
};
```

## Variants

### Number Variant (Default)

```jsx
<Stepper variant="number">
  <Stepper.Step title="Step 1" />
  <Stepper.Step title="Step 2" />
  <Stepper.Step title="Step 3" />
</Stepper>
```

### Bullet Variant

```jsx
<Stepper variant="bullet">
  <Stepper.Step title="Step 1" />
  <Stepper.Step title="Step 2" />
  <Stepper.Step title="Step 3" />
</Stepper>
```

### Icon Variant

```jsx
import { Icon } from '@dt-dds/react-icon';

<Stepper variant="icon">
  <Stepper.Step 
    title="Upload" 
    icon={<Icon code="upload" size="small" />}
  />
  <Stepper.Step 
    title="Process" 
    icon={<Icon code="settings" size="small" />}
  />
  <Stepper.Step 
    title="Complete" 
    icon={<Icon code="check_circle" size="small" />}
  />
</Stepper>
```

## Using the useStepper Hook

The useStepper hook provides a complete state management solution for steppers, including navigation, completion tracking, and boundary checks.

```jsx
import { useStepper } from '@dt-dds/react-stepper';

export const ControlledStepper = () => {
  const {
    activeStep,
    handleNext,
    handleBack,
    canGoNext,
    canGoBack,
  } = useStepper({
    initialStep: 0,
    totalSteps: 3,
  });

  return (
    <>
      <Stepper activeStep={activeStep}>
        <Stepper.Step title="Step 1" description="First step" />
        <Stepper.Step title="Step 2" description="Second step" />
        <Stepper.Step title="Step 3" description="Third step" />
      </Stepper>
      
      <button onClick={handleBack} disabled={!canGoBack}>
        Back
      </button>
      <button onClick={handleNext} disabled={!canGoNext}>
        Next
      </button>
    </>
  );
};
```

## useStepper Hook API

### Options

| Option          | Type     | Default | Description                           |
|-----------------|----------|---------|---------------------------------------|
| `initialStep`   | `number` | `0`     | The initial active step (0-based)     |
| `totalSteps`    | `number` | —       | Total number of steps (for boundary checks) |

### useStepper Return Values

| Property                     | Type                                  | Description                                      |
|-----------------------------|----------------------------------------|--------------------------------------------------|
| `activeStep`                | `number`                               | Current active step index                        |
| `isFirstStep`               | `boolean`                              | Whether currently on the first step              |
| `isLastStep`                | `boolean`                              | Whether currently on the last step               |
| `canGoNext`                 | `boolean`                              | Whether navigation to the next step is allowed   |
| `canGoBack`                 | `boolean`                              | Whether navigation to the previous step is allowed |
| `completedSteps`            | `Set<number>`                          | Set of completed step indices                    |
| `handleNext`                | `() => void`                           | Navigate to the next step                        |
| `handleBack`                | `() => void`                           | Navigate to the previous step                    |
| `handleChangeStep`          | `(step: number) => void`               | Navigate to a specific step                      |
| `handleReset`               | `() => void`                           | Reset to initial step and clear completed steps  |
| `markStepComplete`          | `(step: number) => void`               | Mark a specific step as completed                |
| `markStepIncomplete`        | `(step: number) => void`               | Mark a specific step as incomplete               |
| `isStepComplete`            | `(step: number) => boolean`            | Check if a specific step is completed            |

## Properties

### Stepper Props

| Property      | Type                             | Default   | Description                              |
| ------------- | -------------------------------- | --------- | ---------------------------------------- |
| `children`    | `ReactNode`                      | —         | Step components to be rendered           |
| `orientation` | `"vertical" \| "horizontal"`     | `vertical`| Direction of the stepper                 |
| `variant`     | `"number" \| "bullet" \| "icon"` | `number`  | Visual style of step indicators          |
| `activeStep`  | `number`                         | —         | Index of the active step (0-based)       |
| `dataTestId`  | `string`                         | `stepper` | Test identifier for the stepper container|

### Step Props

| Property     | Type                                                            | Default        | Description                                  |
|--------------|-----------------------------------------------------------------|----------------|----------------------------------------------|
| `title`      | `string`                                                        | —              | Title text for the step                      |
| `description`| `string`                                                        | —              | Description text for the step                |
| `state`      | `"completed" \| "warning" \| "error" \| "disabled" \| "incomplete"` | `incomplete` | Visual state of the step                     |
| `isActive`   | `boolean`                                                       | `false`        | Whether the step is currently active         |
| `icon`       | `ReactNode`                                                     | —              | Custom icon for the icon variant             |
| `dataTestId` | `string`                                                        | `step-{index}` | Test identifier for the step                 |

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
stepper
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
