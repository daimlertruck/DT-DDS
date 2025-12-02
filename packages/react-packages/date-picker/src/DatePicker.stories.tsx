import { useState } from 'react';

import { DATE_FORMAT } from './constants';
import { DatePicker as BaseDatePicker } from './DatePicker';
import { DatePickerProps } from './types';

import { DateRange, enUS, ptBR, format } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const DatePicker = (props: DatePickerProps) => {
  const [value, setValue] = useState<string>(props.value ?? '');

  const formatDateToValue = (date: Date | DateRange) => {
    if (date instanceof Date) {
      setValue(format(date, DATE_FORMAT, { locale: props.locale ?? enUS }));
      return;
    }

    const { from, to } = date;

    if (!from) return;

    const formattedFrom = format(from, DATE_FORMAT, {
      locale: props.locale ?? enUS,
    });
    const formattedTo = to
      ? format(to, DATE_FORMAT, { locale: props.locale ?? enUS })
      : '';

    setValue(`${formattedFrom}-${formattedTo}`);
  };

  return (
    <BaseDatePicker
      {...props}
      onChange={(event) => setValue(event.target.value)}
      onDateSelected={(date) => formatDateToValue(date)}
      value={value}
    />
  );
};
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
  render: ({ ...props }) => {
    return <DatePicker {...props} />;
  },
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
    value: '01/23/2025-01/25/2025',
  },
};

export const Internationalization: StoryObj<DatePickerProps> = {
  args: {
    isFloatingLabel: false,
    label: 'Internationalization',
    mode: 'single',
    locale: ptBR,
  },
};
