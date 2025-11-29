import { format, isMatch } from 'date-fns';
import { Locale } from 'react-day-picker';

import { DATE_FORMAT } from '../constants';

type Validation = { valid: true } | { valid: false; message: string };

interface ValidateDateInRangeProps {
  date: Date;
  locale: Locale;
  minDate?: Date;
  maxDate?: Date;
}

const getInvalidMinDateMessage = (minDate: Date, locale: Locale) =>
  `Please choose a date on or after ${format(minDate!, DATE_FORMAT, {
    locale,
  })}.`;

const getInvalidMaxDateMessage = (maxDate: Date, locale: Locale) =>
  `Please choose a date on or before ${format(maxDate, DATE_FORMAT, {
    locale,
  })}.`;

const toDayTimestamp = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

export const validateDateInRange = ({
  date,
  locale,
  maxDate,
  minDate,
}: ValidateDateInRangeProps): Validation => {
  const ts = toDayTimestamp(date);
  const min = minDate ? toDayTimestamp(minDate) : null;
  const max = maxDate ? toDayTimestamp(maxDate) : null;

  const aboveMin = !min || ts >= min;
  const belowMax = !max || ts <= max;

  if (!aboveMin) {
    return {
      valid: false,
      message: getInvalidMinDateMessage(minDate!, locale),
    };
  }

  if (!belowMax)
    return {
      valid: false,
      message: getInvalidMaxDateMessage(maxDate!, locale),
    };

  return { valid: true };
};

export const isDateMatchingFormat = (value: string, dateFormat: string) => {
  return isMatch(value, dateFormat) && value.length === dateFormat.length;
};
