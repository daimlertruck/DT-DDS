import { DateRange, Locale } from 'react-day-picker';

import { TextFieldProps } from '@dt-dds/react-text-field';

export type DatePickerProps = {
  isDisabled?: boolean;
  isFloatingLabel?: boolean;
  locale?: Locale;
  onDateSelected?: (date: Date | DateRange) => void;
  isMultiMonths?: boolean;
  weekStartDay?: 0 | 1;
  onError?: (error: string) => void;
  value: string;
  mode: 'single' | 'range';
} & Omit<TextFieldProps, 'type' | 'initialValue' | 'value' | 'onError'>;
