import React, {
  useState,
  useEffect,
  useRef,
  ComponentPropsWithoutRef,
} from 'react';

import { TextField, TextFieldProps } from '@dt-dds/react-text-field';

export interface DatePickerProps
  extends Omit<TextFieldProps, 'type'>,
    ComponentPropsWithoutRef<'input'> {
  isDisabled?: boolean;
}

export const DatePicker = ({
  hasError: hasErrorProp = false,
  isDisabled,
  label,
  name,
  required,
  children,
  initialValue,
  message: messageProp = '',
  onChange,
  max,
  min,
  ...rest
}: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(hasErrorProp);
  const [message, setMessage] = useState(messageProp);
  const id = label.replaceAll(' ', '-');

  useEffect(() => {
    if (!!initialValue) {
      setInputValue(initialValue);
    } else {
      setInputValue('');
    }
  }, [initialValue]);

  useEffect(() => {
    setHasError(hasErrorProp);
    setMessage(messageProp);
  }, [hasErrorProp, messageProp]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const handleFocus = () => {
    if (inputRef?.current?.showPicker) {
      inputRef?.current?.showPicker();
    }
  };

  const handleBlur = () => {
    if (!inputRef?.current?.validity.valid && inputRef?.current?.value) {
      setHasError(true);
      setMessage('Please enter a valid date');
      return;
    }

    setHasError(false);
    setMessage('');
  };

  return (
    <>
      <TextField
        disabled={isDisabled}
        hasError={hasError}
        id={id}
        inputRef={inputRef}
        isFloatingLabel
        label={label}
        max={max}
        message={message}
        min={min}
        name={name || id}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        required={required}
        requiredMessage='This field is required.'
        type='date'
        value={inputValue}
        variant='outlined'
        {...rest}
      />
      {children}
    </>
  );
};
