import { Meta, StoryObj } from '@storybook/react';

import { RadioGroupProps, RadioProps, RadioSize } from './types';
import { RadioDirection } from './types';

import { Radio, RadioGroup } from '.';

type RadioStoryProps = RadioProps &
  RadioGroupProps & {
    name: string;
  };

const DIRECTIONS: RadioDirection[] = ['column', 'row'];

const SIZES: RadioSize[] = ['large', 'small'];

const meta: Meta<RadioStoryProps> = {
  component: Radio,
  title: 'Data Display/Radio',
  argTypes: {
    direction: {
      options: DIRECTIONS,
      control: { type: 'select' },
    },
    size: {
      options: SIZES,
      control: { type: 'select' },
    },
  },
  render: ({ direction, name, isDisabled, hasError, size }) => {
    return (
      <RadioGroup
        direction={direction}
        name='radio-group'
        onChange={() => null}
        size={size}
      >
        <Radio
          hasError={hasError}
          isDisabled={isDisabled}
          label='Label 1'
          value='1'
        />
        <Radio label={name} value='2' />
      </RadioGroup>
    );
  },
};

export default meta;

export const Default: StoryObj<RadioStoryProps> = {
  args: {
    direction: 'row',
    name: 'Label 2',
    isDisabled: false,
    hasError: false,
    size: 'large',
  },
};
