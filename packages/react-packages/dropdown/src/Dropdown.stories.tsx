import { ComponentProps } from 'react';

import {
  Dropdown,
  DropdownFill,
  DropdownOptionValue,
  DropdownVariant,
} from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const OPTIONS: DropdownOptionValue[] = [
  { text: 'Option 1', value: '1' },
  { text: 'Option 2', value: '2' },
  { text: 'Option 3 with a large text message label', value: '3' },
  { text: 'Option 4', value: '4' },
];

type CustomDropdownProps = ComponentProps<typeof Dropdown> & {
  isDisabled: boolean;
  hasBorder: boolean;
  hasError: boolean;
  isRequired: boolean;
  message: string;
  options: DropdownOptionValue[];
  variant: DropdownVariant;
  fill: DropdownFill;
  hasDeselect: boolean;
};

const meta: Meta<CustomDropdownProps> = {
  title: 'Data Display/Dropdown',
  component: Dropdown,
  argTypes: {
    variant: {
      options: {
        outlined: 'outlined',
        'bottom-line': 'bottom-line',
      },
      control: { type: 'select' },
    },
    fill: {
      options: {
        default: 'default',
        contrast: 'contrast',
        light: 'light',
      },
      control: { type: 'select' },
    },
  },
  render: ({ options, defaultValue, message, ...props }) => (
    <div
      style={{
        height: '300px',
      }}
    >
      <Dropdown defaultValue={defaultValue}>
        <Dropdown.Container>
          <Dropdown.Select label='Label' {...props}>
            {options.map((option: DropdownOptionValue) => (
              <Dropdown.Option key={option.value} option={option}>
                {option.text ?? option.value}
              </Dropdown.Option>
            ))}
          </Dropdown.Select>
          {message ? (
            <Dropdown.Detail {...props}>{message}</Dropdown.Detail>
          ) : null}
        </Dropdown.Container>
      </Dropdown>
    </div>
  ),
};

export default meta;

export const Default: StoryObj<CustomDropdownProps> = {
  args: {
    options: OPTIONS,
    isDisabled: false,
    hasBorder: true,
    hasError: false,
    isRequired: false,
    hasDeselect: false,
    message: '',
    variant: 'outlined',
    fill: 'default',
  },
};
