import { Orientation } from '@dt-dds/react-core';

import { Step } from './components/Step';

import { Stepper, StepperProps } from './';

import type { Meta, StoryObj } from '@storybook/react-vite';

const OrientationOptions = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
};

interface StepperStoryProps extends StepperProps {
  currentStep: number;
  orientation: Orientation;
  options: string[];
  completed: number[];
}

const meta: Meta<StepperStoryProps> = {
  title: 'Data Display/Stepper',
  component: Stepper,
  argTypes: {
    currentStep: { control: { type: 'number', min: 1 } },
    orientation: {
      options: OrientationOptions,
      control: { type: 'radio' },
    },
    completed: { control: { type: 'array' } },
    options: { control: { type: 'array' } },
  },
  render: ({ currentStep, orientation, options, completed }) => (
    <Stepper orientation={orientation}>
      {options.map((opt, idx) => (
        <Step
          isActive={currentStep === idx + 1}
          isCompleted={completed.includes(idx + 1)}
          key={opt}
        >
          <Step.Counter>{idx + 1}</Step.Counter>
          <Step.Label>{opt}</Step.Label>
        </Step>
      ))}
      <Step isDisabled key={options.length}>
        <Step.Counter>{options.length + 1}</Step.Counter>
        <Step.Label>Disabled</Step.Label>
      </Step>
      <Step isError key={options.length + 1}>
        <Step.Counter>{options.length + 2}</Step.Counter>
        <Step.Label>Error</Step.Label>
      </Step>
      <Step isActive isError key={options.length + 2}>
        <Step.Counter>{options.length + 3}</Step.Counter>
        <Step.Label>Active Error</Step.Label>
      </Step>
    </Stepper>
  ),
};

export default meta;

export const Default: StoryObj<StepperStoryProps> = {
  args: {
    currentStep: 1,
    completed: [3],
    orientation: 'vertical',
    options: ['Step 1', 'Step 2', 'Step 3'],
  },
};
