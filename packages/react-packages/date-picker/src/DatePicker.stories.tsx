import { ptBR } from 'react-day-picker/locale';

import { DatePicker } from './DatePicker';
import { DatePickerProps } from './types';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<DatePickerProps> = {
  title: 'Data Display/DatePicker',
  component: DatePicker,
  argTypes: {
    scale: {
      options: ['compact', 'standard'],
      control: { type: 'radio' },
    },
    backgroundFill: {
      options: ['default', 'contrast', 'light'],
      control: { type: 'select' },
    },
    mode: {
      options: ['single', 'range'],
      control: { type: 'radio' },
    },
  },
  render: ({ ...props }) => (
    <DatePicker {...props} onDateSelected={(date) => console.log(date)} />
  ),
};

export default meta;

export const Default: StoryObj<DatePickerProps> = {
  args: {
    required: true,
    label: 'Choose a date',
    min: '2023-03-30',
    max: '2028-03-30',
    isMultiMonths: false,
    weekStartDay: 0,
    mode: 'single',
    message: 'This is a message',
    isDisabled: false,
    backgroundFill: 'default',
  },
};

export const DefaultValue: StoryObj<DatePickerProps> = {
  args: {
    isFloatingLabel: false,
    label: 'Default Value',
    mode: 'range',
    initialValue: { from: new Date(2025, 1, 23), to: new Date(2025, 1, 25) },
  },
};

export const Internationalization: StoryObj<DatePickerProps> = {
  args: {
    isFloatingLabel: false,
    label: 'Default Value',
    mode: 'single',
    locale: ptBR,
  },
};
