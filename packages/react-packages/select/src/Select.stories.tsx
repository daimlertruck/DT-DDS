import { ComponentProps } from 'react';

import { SelectFill, SelectVariant } from './types';

import { Select, SelectOptionValue } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const options: SelectOptionValue[] = [
  { value: 'opt1', label: 'Option 1', disabled: false },
  { value: 'opt2', label: 'Option 2', disabled: false },
  {
    value: 'opt3',
    label: 'A text message to see how big labels will be handled',
    disabled: false,
  },
  { value: 'opt4', label: 'Option 3', disabled: true },
  { value: 'opt5', label: 'Option 4', disabled: false },
];

type Story = StoryObj<CustomSelectProps>;

type CustomSelectProps = ComponentProps<typeof Select> & {
  options: SelectOptionValue[];
  variant: SelectVariant;
  fill: SelectFill;
};

const meta: Meta<CustomSelectProps> = {
  title: 'Data Display/Select',
  component: Select,
  argTypes: {
    helperText: { control: 'text' },
    variant: {
      options: ['outlined', 'bottom-line'],
      control: { type: 'select' },
    },
    fill: {
      options: ['default', 'contrast', 'light'],
      control: { type: 'select' },
    },
  },
  render: ({ options, ...props }) => (
    <div style={{ height: '500px', padding: '10px' }}>
      <Select {...props}>
        {options.map((item, index) => (
          <Select.Option
            disabled={item.disabled}
            index={index}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Select>
    </div>
  ),
};

export default meta;

export const Default: Story = {
  args: {
    options: options,
    label: 'My label',
    helperText: '',
    errorMessage: '',
    isMulti: false,
    isRequired: false,
    hasError: false,
    isDisabled: false,
    initialValue: '',
  },
};
