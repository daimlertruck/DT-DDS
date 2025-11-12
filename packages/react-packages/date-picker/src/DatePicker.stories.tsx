import { DatePicker, DatePickerProps } from './DatePicker';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<DatePickerProps> = {
  title: 'Data Display/DatePicker',
  component: DatePicker,
  argTypes: {},
  render: ({ ...props }) => <DatePicker {...props} />,
};

export default meta;

export const Default: StoryObj<DatePickerProps> = {
  args: {
    initialValue: '2023-02-02',
    required: true,
    label: 'Choose a date',
    min: '2023-03-30',
    max: '2025-03-30',
  },
};
