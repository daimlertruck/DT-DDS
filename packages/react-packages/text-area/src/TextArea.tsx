import { BaseProps } from '@dt-dds/react-core';
import { LabelField } from '@dt-dds/react-label-field';
import { Typography } from '@dt-dds/react-typography';
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FocusEvent,
  useEffect,
  useState,
} from 'react';

import { TextAreaVariant, TextAreaBackgroundFill } from './constants';
import {
  TextAreaStyled,
  TextAreaWrapper,
  TextAreaMessageStyled,
  TextAreaMessages,
  ContainerStyled,
} from './TextArea.styled';

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
}

export const TextArea = ({
  label,
  dataTestId,
  name,
  value,
  style,
  variant = 'outlined',
  backgroundFill = 'default',
  maxLength,
  enableResize = false,
  disabled = false,
  required = false,
  hasError = false,
  message: messageProp = '',
  onChange = () => {},
  ...rest
}: TextAreaProps) => {
  const [chars, setChars] = useState(0);
  const [activeInput, setActiveInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hasRequiredError, setHasRequiredError] = useState(false);

  useEffect(() => {
    if (!!value) {
      setInputValue(value);
      setActiveInput(true);
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
    setActiveInput(true);

    if (rest.onFocus) {
      rest.onFocus(event);
    }
  };

  const onBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    const isEmptyOrOnlySpaces = event.currentTarget.value.trim().length === 0;
    if (isEmptyOrOnlySpaces) {
      setActiveInput(false);

      if (required) {
        setHasRequiredError(true);
      }
    }

    if (rest.onBlur) {
      rest.onBlur(event);
    }
  };

  const testId =
    dataTestId ?? `${label.replaceAll(' ', '-').toLocaleLowerCase()}-textarea`;

  const messageColor = disabled ? 'content.light' : 'content.medium';
  const showError = hasError || hasRequiredError;
  const message = messageProp;

  return (
    <TextAreaWrapper>
      <LabelField
        hasError={showError}
        htmlFor={testId}
        isActive={activeInput}
        isDisabled={disabled}
        isRequired={required}
        style={{ zIndex: 1 }}
      >
        {label}
      </LabelField>
      <ContainerStyled
        backgroundFill={backgroundFill}
        data-testid='textarea-container'
        hasError={showError}
        variant={variant}
      >
        <TextAreaStyled
          backgroundFill={backgroundFill}
          data-error={showError}
          disabled={disabled}
          enableResize={enableResize}
          id={testId}
          maxLength={maxLength}
          name={name}
          style={style}
          value={inputValue}
          {...rest}
          onBlur={onBlur}
          onChange={handleChange}
          onFocus={onFocus}
        />
      </ContainerStyled>

      <TextAreaMessages>
        {message ? (
          <TextAreaMessageStyled>
            <Typography
              color={showError ? 'error.default' : messageColor}
              element='span'
              fontStyles='bodySmRegular'
            >
              {message}
            </Typography>
          </TextAreaMessageStyled>
        ) : null}
        {maxLength ? (
          <Typography
            color='content.medium'
            element='span'
            fontStyles='bodyMdRegular'
            id={testId}
            style={{ marginLeft: 'auto' }}
          >
            {chars} / {maxLength}
          </Typography>
        ) : null}
      </TextAreaMessages>
    </TextAreaWrapper>
  );
};
