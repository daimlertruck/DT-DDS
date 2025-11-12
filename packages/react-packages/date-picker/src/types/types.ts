import { DateRange, Locale } from 'react-day-picker';

import { TextFieldProps } from '@dt-dds/react-text-field';

type BaseDatePickerProps = {
  isDisabled?: boolean;
  isFloatingLabel?: boolean;
  locale?: Locale;
  onDateSelected?: (date: Date | DateRange) => void;
  isMultiMonths?: boolean;
  weekStartDay?: 0 | 1;
  onError?: (error: string) => void;
} & Omit<TextFieldProps, 'type' | 'initialValue'>;

type SingleModeProps = {
  mode: 'single';
  initialValue?: Date;
};

type RangeModeProps = {
  mode: 'range';
  initialValue?: DateRange;
};

export type DatePickerProps = BaseDatePickerProps &
  (SingleModeProps | RangeModeProps);
