import { Orientation } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';

import { useStepper } from './hooks';

import { Stepper, StepperProps, StepState, StepVariant } from './';

import type { Meta, StoryObj } from '@storybook/react';

const OrientationOptions: Record<string, Orientation> = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
};

const VariantOptions: Record<string, StepVariant> = {
  Number: 'number',
  Bullet: 'bullet',
  Icon: 'icon',
};

interface StepperStoryProps extends StepperProps {
  currentStep: number;
  completedSteps: number[];
  steps: Array<{ title: string; description?: string }>;
}

const meta: Meta<StepperStoryProps> = {
  title: 'Data Display/Stepper',
  component: Stepper,
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0 },
      description: 'Current active step index (0-based)',
    },
    orientation: {
      options: Object.keys(OrientationOptions),
      mapping: OrientationOptions,
      control: { type: 'radio' },
      description: 'Stepper orientation',
    },
    variant: {
      options: Object.keys(VariantOptions),
      mapping: VariantOptions,
      control: { type: 'radio' },
      description: 'Stepper variant',
    },
    completedSteps: {
      control: { type: 'object' },
      description: 'Array of completed step indices',
    },
    steps: {
      control: { type: 'object' },
      description: 'Array of step configurations',
    },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<StepperStoryProps>;

export const Default: Story = {
  args: {
    currentStep: 1,
    completedSteps: [0],
    orientation: 'vertical',
    variant: 'number',
    steps: [
      {
        title: 'Personal Information',
        description: 'Enter your basic',
      },
      { title: 'Address Details', description: 'Provide your address' },
      { title: 'Review & Submit', description: 'Check all information' },
    ],
  },
  render: ({ currentStep, completedSteps, orientation, variant, steps }) => (
    <Stepper
      activeStep={currentStep}
      orientation={orientation}
      variant={variant}
    >
      {steps.map((step, idx) => {
        let state: StepState = 'incomplete';
        if (completedSteps.includes(idx)) state = 'completed';

        return (
          <Stepper.Step
            description={step.description}
            key={idx}
            state={state}
            title={step.title}
          />
        );
      })}
    </Stepper>
  ),
};

export const AllStates: Story = {
  args: {
    orientation: 'vertical',
    variant: 'number',
  },
  render: ({ orientation, variant }) => (
    <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step
        description='This step is done'
        state='completed'
        title='Completed'
      />
      <Stepper.Step
        description='Currently on this step'
        isActive
        state='incomplete'
        title='Active'
      />
      <Stepper.Step
        description='Not yet started'
        state='incomplete'
        title='Incomplete'
      />
      <Stepper.Step
        description='Requires attention'
        state='warning'
        title='Warning'
      />
      <Stepper.Step
        description='Something went wrong'
        state='error'
        title='Error'
      />
      <Stepper.Step
        description='Cannot access yet'
        state='disabled'
        title='Disabled'
      />
      <Stepper.Step
        description='Bold title with light background'
        isActive
        state='completed'
        title='Completed Active'
      />
      <Stepper.Step
        description='Bold title with warning colors'
        isActive
        state='warning'
        title='Warning Active'
      />
      <Stepper.Step
        description='Bold title with error colors'
        isActive
        state='error'
        title='Error Active'
      />
    </Stepper>
  ),
};

export const BulletVariant: Story = {
  args: {
    variant: 'bullet',
    orientation: 'horizontal',
  },
  render: ({ orientation, variant }) => (
    <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step state='completed' />
      <Stepper.Step isActive state='incomplete' />
      <Stepper.Step state='incomplete' />
      <Stepper.Step state='disabled' />
      <Stepper.Step state='warning' />
      <Stepper.Step state='error' />
    </Stepper>
  ),
};

export const IconVariant: Story = {
  args: {
    variant: 'icon',
    orientation: 'vertical',
  },
  render: ({ orientation, variant }) => (
    <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step
        description='Payment processed successfully'
        icon={<Icon code='credit_card' size='small' />}
        state='completed'
        title='Payment'
      />
      <Stepper.Step
        description='Verify your email address'
        icon={<Icon code='mail' size='small' />}
        isActive
        state='incomplete'
        title='Verification'
      />
      <Stepper.Step
        description='Complete your profile'
        icon={<Icon code='edit' size='small' />}
        state='incomplete'
        title='Profile Setup'
      />
      <Stepper.Step
        description='Action required on your order'
        icon={<Icon code='shopping_cart' size='small' />}
        state='warning'
        title='Order Review'
      />
      <Stepper.Step
        description='Shipping address validation failed'
        icon={<Icon code='local_shipping' size='small' />}
        state='error'
        title='Shipping'
      />
      <Stepper.Step
        description='Delivery is not available yet'
        icon={<Icon code='home' size='small' />}
        state='disabled'
        title='Delivery'
      />
    </Stepper>
  ),
};

export const WithLongText: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'number',
  },
  render: ({ orientation, variant }) => (
    <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step
        description='This is a very long description that will be truncated after two lines and show a tooltip when you hover over it'
        state='completed'
        title='Very Long Step Title That Exceeds Maximum Width'
      />
      <Stepper.Step
        description='Short description'
        isActive
        state='incomplete'
        title='Normal Title'
      />
      <Stepper.Step
        description='Another long description that demonstrates the tooltip functionality when text overflows'
        state='incomplete'
        title='Another Step With A Really Long Title'
      />
    </Stepper>
  ),
};

export const WithoutDescriptions: Story = {
  args: {
    orientation: 'vertical',
    variant: 'number',
  },
  render: ({ orientation, variant }) => (
    <Stepper orientation={orientation} variant={variant}>
      <Stepper.Step state='completed' title='Step 1' />
      <Stepper.Step isActive state='incomplete' title='Step 2' />
      <Stepper.Step state='incomplete' title='Step 3' />
      <Stepper.Step state='incomplete' title='Step 4' />
    </Stepper>
  ),
};

export const InteractiveWithHook: Story = {
  render: () => {
    const {
      activeStep,
      isFirstStep,
      isLastStep,
      handleNext,
      handleBack,
      markStepComplete,
      isStepComplete,
    } = useStepper({ initialStep: 0, totalSteps: 4 });

    const steps = [
      { title: 'Personal Info', description: 'Enter your details' },
      { title: 'Contact', description: 'Provide contact info' },
      { title: 'Address', description: 'Enter your address' },
      { title: 'Review', description: 'Review and submit' },
    ];

    const getStepState = (idx: number): StepState => {
      if (isStepComplete(idx)) return 'completed';
      return 'incomplete';
    };

    const handleNextWithComplete = () => {
      markStepComplete(activeStep);
      handleNext();
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Stepper
          activeStep={activeStep}
          orientation='horizontal'
          variant='number'
        >
          {steps.map((step, idx) => (
            <Stepper.Step
              description={step.description}
              key={idx}
              state={getStepState(idx)}
              title={step.title}
            />
          ))}
        </Stepper>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            disabled={isFirstStep}
            onClick={handleBack}
            style={{
              padding: '8px 16px',
              cursor: isFirstStep ? 'not-allowed' : 'pointer',
              opacity: isFirstStep ? 0.5 : 1,
            }}
            type='button'
          >
            Back
          </button>
          <button
            disabled={isLastStep}
            onClick={handleNextWithComplete}
            style={{
              padding: '8px 16px',
              cursor: isLastStep ? 'not-allowed' : 'pointer',
              opacity: isLastStep ? 0.5 : 1,
            }}
            type='button'
          >
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
          Step {activeStep + 1} of {steps.length}
        </div>
      </div>
    );
  },
};
