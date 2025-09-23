import { Box } from '@dt-dds/react-box';
import { BaseProps } from '@dt-dds/react-core';
import { LabelField } from '@dt-dds/react-label-field';
import { Typography } from '@dt-dds/react-typography';
import { useTheme } from '@emotion/react';
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FocusEvent,
  useEffect,
  useState,
} from 'react';

import {
  TextAreaBackgroundFill,
  TextAreaLabelVariant,
  TextAreaVariant,
} from './constants';
import { TextAreaStyled } from './TextArea.styled';

export interface TextAreaProps
  extends ComponentPropsWithoutRef<'textarea'>,
    BaseProps {
  label: string;
  name?: string;
  maxLength?: number;
  enableResize?: boolean;
  value?: string;
  variant?: TextAreaVariant;
  backgroundFill?: TextAreaBackgroundFill;
  hasError?: boolean;
  message?: string;
  labelVariant?: TextAreaLabelVariant;
  hasLabel?: boolean;
}

export const TextArea = ({
  label,
  dataTestId,
  name,
  value,
  style,
  onChange,
  maxLength,
  variant = 'outlined',
  backgroundFill = 'default',
  enableResize = false,
  disabled = false,
  required = false,
  hasError = false,
  hasLabel = true,
  message: messageProp = '',
  labelVariant = 'default',
  placeholder,
  readOnly,
  ...rest
}: TextAreaProps) => {
  const [chars, setChars] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hasRequiredError, setHasRequiredError] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (!!value) {
      setInputValue(value);
      setChars(value.length);
      setHasRequiredError(false);
    } else {
      setInputValue('');
    }
  }, [value]);

  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(evt.target.value);
    setHasRequiredError(false);
    setChars(evt.target.value.length);

    if (onChange) {
      onChange(evt);
    }
  };

  const onFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsActive(true);

    if (rest.onFocus) {
      rest.onFocus(event);
    }
  };

  const onBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsActive(false);

    const isEmptyOrOnlySpaces = event.currentTarget.value.trim().length === 0;
    if (isEmptyOrOnlySpaces && required) {
      setHasRequiredError(true);
    }

    if (rest.onBlur) {
      rest.onBlur(event);
    }
  };

  const testId =
    dataTestId ?? `${label.replaceAll(' ', '-').toLocaleLowerCase()}-textarea`;

  const messageColor =
    disabled || readOnly ? 'content.light' : 'content.medium';
  const showError = hasError || hasRequiredError;
  const message = messageProp;
  const isFloatingLabel = labelVariant === 'floating';

  return (
    <Box style={{ position: 'relative', alignItems: 'flex-start' }}>
      {hasLabel ? (
        <LabelField
          hasError={showError}
          htmlFor={testId}
          isActive={isActive && !readOnly ? true : false}
          isDisabled={disabled || readOnly}
          isFloating={isFloatingLabel}
          isInputFilled={!!chars}
          isRequired={required}
          style={{ zIndex: 1 }}
        >
          {label}
        </LabelField>
      ) : null}
      <TextAreaStyled
        backgroundFill={backgroundFill}
        data-error={showError}
        data-testid={testId}
        disabled={disabled}
        enableResize={enableResize}
        hasError={showError}
        hasLabel={hasLabel}
        id={testId}
        isFloatingLabel={isFloatingLabel}
        maxLength={maxLength}
        name={name}
        readOnly={readOnly}
        style={style}
        value={inputValue}
        variant={variant}
        {...rest}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
        {...((!isFloatingLabel || !hasLabel) && {
          placeholder: placeholder,
        })}
      />

      <Box
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingInline: theme.spacing.spacing_40,
          gap: theme.spacing.spacing_30,
          marginTop: 4,
        }}
      >
        {message ? (
          <Typography
            color={showError ? 'error.default' : messageColor}
            element='span'
            fontStyles='bodySmRegular'
          >
            {message}
          </Typography>
        ) : null}
        {maxLength ? (
          <Typography
            color={showError ? 'error.default' : messageColor}
            dataTestId='char-counter'
            element='span'
            fontStyles='bodySmRegular'
            id={testId}
            {...(!message && { style: { marginLeft: 'auto' } })}
          >
            {chars} / {maxLength}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};
