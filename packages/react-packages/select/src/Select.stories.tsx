import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

import { SelectFill, SelectVariant } from './types';

import { Select, SelectOptionValue } from '.';
const options = [
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
  options: (SelectOptionValue & { label: string })[];
  variant: SelectVariant;
  fill: SelectFill;
  value?: string[] | string;
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
    scale: {
      options: ['standard', 'compact'],
      control: { type: 'select' },
    },
  },
  render: ({ options, ...props }) => {
    const [{ value }, updateArgs] = useArgs();
    const handleChange = (v: string) => updateArgs({ value: v });

    return (
      <Select {...props} isMulti={false} onChange={handleChange} value={value}>
        {options.map((item, index) => (
          <Select.Option
            index={index}
            isDisabled={item.disabled}
            key={item.value}
            value={item.value}
          >
            {item.label}
          </Select.Option>
        ))}
      </Select>
    );
  },
};

export default meta;

export const Default: Story = {
  args: {
    options: options,
    label: 'My label',
    helperText: '',
    isRequired: false,
    hasError: false,
    isDisabled: false,
    value: '',
    isFloatingLabel: true,
    scale: 'standard',
  },
};

export const Multi: StoryObj<CustomSelectProps> = {
  args: {
    options,
    label: 'My multi label',
    helperText: 'Here to help you',
    isRequired: false,
    hasError: false,
    isDisabled: false,
    isFloatingLabel: false,
    variant: 'bottom-line',
    fill: 'contrast',
    scale: 'compact',
    value: [],
  },
  render: ({ options, ...props }: CustomSelectProps) => {
    const [value, setValue] = useState<string[]>(props.value as string[]);

    return (
      <Select {...props} isMulti onChange={setValue} value={value}>
        {options.map((opt, index) => (
          <Select.Option
            index={index}
            isDisabled={opt.disabled}
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </Select.Option>
        ))}
      </Select>
    );
  },
};
