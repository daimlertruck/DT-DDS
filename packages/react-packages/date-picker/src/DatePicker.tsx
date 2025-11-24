import { Dropdown } from '@dt-dds/react-dropdown';
import { Icon } from '@dt-dds/react-icon';
import { TextField } from '@dt-dds/react-text-field';
import { format, isValid, parse } from 'date-fns';
import { FocusTrap } from 'focus-trap-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DateRange, DayPickerProps, Matcher } from 'react-day-picker';
import { enUS } from 'react-day-picker/locale';

import 'react-day-picker/style.css';
import { Chevron } from './components';
import {
  DATE_FORMAT,
  INVALID_FORMAT_MESSAGE,
  INVALID_RANGE_MESSAGE,
  RANGE_SEPARATOR,
} from './constants';
import { DatePickerStyled } from './DatePicker.styled';
import { DatePickerProps } from './types';
import { validateDateInRange } from './utils';

export const DatePicker = ({
  max,
  min,
  name,
  label,
  onChange,
  required,
  isDisabled,
  weekStartDay,
  initialValue,
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

  const [month, setMonth] = useState(new Date());
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | DateRange | null>(
    null
  );

  const minDate = min ? new Date(min) : undefined;
  const maxDate = max ? new Date(max) : undefined;

  const isDateInvalid = !selectedDate && inputValue.length > 0;
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
    locale: locale,
    month,
    navLayout: 'around',
    numberOfMonths: isMultiMonths ? 2 : 1,
    onMonthChange: setMonth,
    role: 'dialog',
    weekStartsOn: weekStartDay,
    startMonth: minDate,
    endMonth: maxDate,
  };

  const formatDate = useCallback(
    (date: Date) =>
      format(date, DATE_FORMAT, {
        locale,
      }),
    [locale]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    onChange?.(e);

    if (!value) {
      setSelectedDate(null);
      return;
    }

    isSingleMode ? handleChangeSingleMode(value) : handleChangeRangeMode(value);
  };

  const handleChangeSingleMode = (value: string) => {
    const parsedDate = parse(value, DATE_FORMAT, new Date(), { locale });

    if (!isValid(parsedDate)) {
      setSelectedDate(null);
      setMessage(INVALID_FORMAT_MESSAGE);
      return;
    }

    const validation = validateDateInRange({
      date: parsedDate,
      locale,
      minDate,
      maxDate,
    });

    if (!validation.valid) {
      setSelectedDate(null);
      setMessage(validation.message);
      return;
    }

    setSelectedDate(parsedDate);
    setMonth(parsedDate);
  };

  const handleChangeRangeMode = (value: string) => {
    const [inputFrom, inputTo] = value.split(RANGE_SEPARATOR);

    const parsedFrom =
      !!inputFrom &&
      parse(inputFrom.trim(), DATE_FORMAT, new Date(), { locale });

    const parsedTo =
      !!inputTo && parse(inputTo.trim(), DATE_FORMAT, new Date(), { locale });

    if (!isValid(parsedFrom) || !isValid(parsedTo)) {
      setSelectedDate(null);
      setMessage(INVALID_FORMAT_MESSAGE);
      return;
    }

    if (parsedTo < parsedFrom) {
      setSelectedDate(null);
      setMessage(INVALID_RANGE_MESSAGE);
      return;
    }

    const fromValidation = validateDateInRange({
      date: parsedFrom as Date,
      locale,
      minDate,
      maxDate,
    });

    if (!fromValidation.valid) {
      setSelectedDate(null);
      setMessage(fromValidation.message);
      return;
    }

    const toValidation = validateDateInRange({
      date: parsedTo as Date,
      locale,
      minDate,
      maxDate,
    });

    if (!toValidation.valid) {
      setSelectedDate(null);
      setMessage(toValidation.message);
      return;
    }

    const rangeDate = { from: parsedFrom as Date, to: parsedTo as Date };

    setSelectedDate(rangeDate);
    onDateSelected?.(rangeDate);
    setMonth(parsedFrom as Date);
  };

  const handleSingleDaySelected = (date: Date) => {
    setIsDatePickerVisible(false);

    setSelectedDate(date);
    setMonth(date);
    setInputValue(formatDate(date));
    onDateSelected?.(date);
  };

  const handleRangeSelected = (date: DateRange) => {
    const { to, from } = date;

    if (!to || !from) {
      setInputValue('');
      setSelectedDate(null);
      return;
    }

    const { from: selectedFrom, to: selectedTo } =
      (selectedDate as DateRange) ?? {};

    if (!selectedDate || (!selectedFrom && !selectedTo)) {
      setSelectedDate({ from });
      return;
    }

    if (selectedFrom && selectedTo) {
      setSelectedDate({
        from: selectedFrom !== from ? from : to,
      });
      return;
    }

    if (selectedFrom && !selectedTo) {
      setSelectedDate(() => ({
        from,
        to,
      }));
      setInputValue(`${formatDate(from)} - ${formatDate(to)}`);
      setIsDatePickerVisible(false);
      onDateSelected?.(date);

      return;
    }
  };

  const handleClick = () => {
    setIsDatePickerVisible(false);
    setTimeout(() => {
      const input = anchorRef.current?.querySelector(
        'input'
      ) as HTMLInputElement | null;
      input?.focus();
    }, 10);
  };

  useEffect(() => {
    if (!hasError) {
      setMessage(messageProp);
    }
  }, [setMessage, hasError, messageProp]);

  useEffect(() => {
    if (isSingleMode && initialValue instanceof Date) {
      setInputValue(formatDate(initialValue));
      setSelectedDate(initialValue);
      setMonth(initialValue);
      return;
    }

    const range = initialValue as DateRange;

    if (!!range && !!range.from && !!range.to) {
      const { from, to } = range;

      setSelectedDate(range);
      setInputValue(`${formatDate(from)} - ${formatDate(to)}`);
      setMonth(from);
    }
  }, [formatDate, initialValue, isSingleMode, locale]);

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
        initialValue={inputValue}
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

      <FocusTrap
        active={isDatePickerVisible}
        focusTrapOptions={{
          fallbackFocus: () => document.body,
          escapeDeactivates: true,
          onDeactivate: () => setIsDatePickerVisible(false),
          allowOutsideClick: true,
        }}
      >
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
              selected={selectedDate as Date}
            />
          ) : (
            <DatePickerStyled
              {...sharedProps}
              mode='range'
              onSelect={handleRangeSelected}
              required
              selected={selectedDate as DateRange}
            />
          )}
        </Dropdown>
      </FocusTrap>
    </>
  );
};
