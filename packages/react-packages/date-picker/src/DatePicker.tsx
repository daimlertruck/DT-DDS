import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { isValid, parse } from 'date-fns';
import { DateRange, DayPickerProps, Matcher } from 'react-day-picker';
import { enUS } from 'react-day-picker/locale';
import 'react-day-picker/style.css';

import { Dropdown } from '@dt-dds/react-dropdown';
import { Icon } from '@dt-dds/react-icon';
import { TextField } from '@dt-dds/react-text-field';

import { Chevron } from './components';
import {
  DATE_FORMAT,
  INVALID_FORMAT_MESSAGE,
  INVALID_RANGE_MESSAGE,
  RANGE_SEPARATOR,
} from './constants';
import { DatePickerStyled } from './DatePicker.styled';
import { DatePickerProps } from './types';
import { isDateMatchingFormat, validateDateInRange } from './utils';

export const DatePicker = ({
  max,
  min,
  name,
  label,
  onError,
  onChange,
  required,
  isDisabled,
  weekStartDay,
  value,
  isMultiMonths,
  onDateSelected,
  locale = enUS,
  mode = 'single',
  id = 'date-picker',
  isFloatingLabel = false,
  message: messageProp = '',
  hasError: hasErrorProp = false,
  ...rest
}: DatePickerProps) => {
  const anchorRef = useRef<HTMLInputElement | null>(null);

  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);
  const [message, setMessage] = useState<string>(messageProp);
  const [isDateInvalid, setIsDateInvalid] = useState(false);

  const [month, setMonth] = useState(new Date());

  const { minDate, maxDate } = useMemo(() => {
    return {
      minDate: min ? new Date(min) : undefined,
      maxDate: max ? new Date(max) : undefined,
    };
  }, [min, max]);

  const hasError = hasErrorProp || isDateInvalid;

  const dateFormat = locale.formatLong.date({ width: 'short' });

  const isSingleMode = mode === 'single';

  const fallbackPlaceholder = isSingleMode
    ? dateFormat
    : `${dateFormat} - ${dateFormat}`;
  const placeholder = rest.placeholder ?? fallbackPlaceholder;

  const sharedProps: DayPickerProps = {
    'aria-label': 'Choose a date',
    components: {
      Chevron,
    },
    disabled: { before: minDate, after: maxDate } as Matcher,
    locale,
    month,
    navLayout: 'around',
    numberOfMonths: isMultiMonths ? 2 : 1,
    onMonthChange: setMonth,
    role: 'dialog',
    weekStartsOn: weekStartDay,
    startMonth: minDate,
    endMonth: maxDate,
  };

  const dryParse = useCallback(
    (valueToParse: string) => {
      return parse(valueToParse, DATE_FORMAT, new Date(), { locale });
    },
    [locale]
  );

  const parseValueToDate = () => {
    if (!value) return null;

    if (isSingleMode) {
      return dryParse(value);
    }

    const [from, to] = value.split(RANGE_SEPARATOR).map((s) => s.trim());

    if (!from) return null;

    if (!to) {
      return { from: dryParse(from) };
    }

    return {
      from: dryParse(from),
      to: dryParse(to),
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const handleChangeSingleMode = useCallback(() => {
    const trimmedValue = value.trim();

    if (!isDateMatchingFormat(trimmedValue, dateFormat)) {
      setMessage(INVALID_FORMAT_MESSAGE);
      setIsDateInvalid(true);
      onError?.(INVALID_FORMAT_MESSAGE);
      return;
    }

    const parsedDate = dryParse(trimmedValue);

    if (!isValid(parsedDate)) {
      setMessage(INVALID_FORMAT_MESSAGE);
      setIsDateInvalid(true);
      onError?.(INVALID_FORMAT_MESSAGE);
      return;
    }

    const validation = validateDateInRange({
      date: parsedDate,
      locale,
      minDate,
      maxDate,
    });

    if (!validation.valid) {
      setMessage(validation.message);
      setIsDateInvalid(true);
      onError?.(validation.message);
      return;
    }

    onDateSelected?.(parsedDate);
    setMonth(parsedDate);
    setIsDateInvalid(false);
    onError?.('');
  }, [
    value,
    dateFormat,
    dryParse,
    locale,
    minDate,
    maxDate,
    onDateSelected,
    onError,
  ]);

  const handleChangeRangeMode = useCallback(() => {
    const [inputFrom, inputTo] = value.split(RANGE_SEPARATOR);

    if (!inputFrom || !inputTo) {
      setMessage(INVALID_FORMAT_MESSAGE);
      setIsDateInvalid(true);
      onError?.(INVALID_FORMAT_MESSAGE);
      return;
    }

    const trimmedTo = inputTo.trim();
    const trimmedFrom = inputFrom.trim();

    const isFromNotMatching = !isDateMatchingFormat(trimmedFrom, dateFormat);
    const isToNotMatching = !isDateMatchingFormat(trimmedTo, dateFormat);

    if (isFromNotMatching || isToNotMatching) {
      setMessage(INVALID_FORMAT_MESSAGE);
      setIsDateInvalid(true);
      onError?.(INVALID_FORMAT_MESSAGE);
      return;
    }

    const parsedFrom = !!trimmedFrom && dryParse(trimmedFrom);
    const parsedTo = !!trimmedTo && dryParse(trimmedTo);

    if (!isValid(parsedFrom) || !isValid(parsedTo)) {
      setMessage(INVALID_FORMAT_MESSAGE);
      setIsDateInvalid(true);
      onError?.(INVALID_RANGE_MESSAGE);
      return;
    }

    if (parsedTo < parsedFrom) {
      setMessage(INVALID_RANGE_MESSAGE);
      setIsDateInvalid(true);
      onError?.(INVALID_RANGE_MESSAGE);
      return;
    }

    const fromValidation = validateDateInRange({
      date: parsedFrom as Date,
      locale,
      minDate,
      maxDate,
    });

    if (!fromValidation.valid) {
      setMessage(fromValidation.message);
      setIsDateInvalid(true);
      onError?.(fromValidation.message);
      return;
    }

    const toValidation = validateDateInRange({
      date: parsedTo as Date,
      locale,
      minDate,
      maxDate,
    });

    if (!toValidation.valid) {
      setMessage(toValidation.message);
      setIsDateInvalid(true);
      onError?.(toValidation.message);
      return;
    }

    const rangeDate = { from: parsedFrom as Date, to: parsedTo as Date };

    onDateSelected?.(rangeDate);
    setMonth(parsedFrom as Date);
    setIsDateInvalid(false);
    onError?.('');
  }, [
    value,
    dateFormat,
    dryParse,
    locale,
    minDate,
    maxDate,
    onDateSelected,
    onError,
  ]);

  const handleSingleDaySelected = (date: Date) => {
    setIsDatePickerVisible(false);
    setMonth(date);
    onDateSelected?.(date);
    setIsDateInvalid(false);
    onError?.('');
  };

  const handleRangeSelected = (date: DateRange) => {
    const { to, from } = date;

    if (!to || !from) {
      return;
    }

    if (!value) {
      onDateSelected?.({ from });
      return;
    }

    const { from: selectedFrom, to: selectedTo } =
      parseValueToDate() as DateRange;

    if (selectedFrom && selectedTo) {
      onDateSelected?.({
        from: selectedFrom.getTime() !== from.getTime() ? from : to,
      });
      return;
    }

    if (selectedFrom && !selectedTo) {
      onDateSelected?.({
        from,
        to,
      });

      setIsDatePickerVisible(false);
      onDateSelected?.(date);
      setIsDateInvalid(false);
      onError?.('');
      return;
    }
  };

  const handleClick = () => {
    setIsDatePickerVisible(false);
  };

  useEffect(() => {
    if (!hasError) {
      setMessage(messageProp);
    }
  }, [setMessage, hasError, messageProp]);

  useEffect(() => {
    if (!value) {
      onError?.('');
      setIsDateInvalid(false);
      return;
    }

    isSingleMode ? handleChangeSingleMode() : handleChangeRangeMode();
  }, [minDate, maxDate, isSingleMode, value]);

  return (
    <>
      <TextField
        disabled={isDisabled}
        extraSuffix={{
          component: <Icon code='calendar_today' />,
          onClick: () => setIsDatePickerVisible((prevState) => !prevState),
        }}
        hasError={hasError}
        id={id}
        initialValue={value}
        isFloatingLabel={isFloatingLabel}
        isInputFocused={isDatePickerVisible}
        label={label}
        max={max}
        min={min}
        name={name || id}
        onChange={handleChange}
        onClick={handleClick}
        placeholder={placeholder}
        ref={anchorRef}
        required={required}
        requiredMessage='This field is required.'
        type='text'
        variant='outlined'
        {...((hasError || messageProp) && { message })}
        {...rest}
      />

      <Dropdown
        anchorRef={anchorRef}
        dataTestId='calendar'
        isOpen={isDatePickerVisible}
        matchWidth={false}
        onClose={() => setIsDatePickerVisible(false)}
        style={{
          padding: 0,
          border: 0,
          width: 'fit-content',
          maxWidth: 'fit-content',
        }}
      >
        {isSingleMode ? (
          <DatePickerStyled
            {...sharedProps}
            mode='single'
            onSelect={handleSingleDaySelected}
            required
            selected={parseValueToDate() as Date}
          />
        ) : (
          <DatePickerStyled
            {...sharedProps}
            mode='range'
            onSelect={handleRangeSelected}
            required
            selected={parseValueToDate() as DateRange}
          />
        )}
      </Dropdown>
    </>
  );
};
