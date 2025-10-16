import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { IconButton } from '@dt-dds/react-icon-button';
import { LabelField } from '@dt-dds/react-label-field';
import { Typography } from '@dt-dds/react-typography';
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FocusEvent,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from 'react';

import { TextFieldVariant, TextFieldBackgroundFill } from './constants';
import {
  InputExtraPrefixStyled,
  InputExtraSuffixStyled,
  InputFieldStyled,
  InputWrapperStyled,
  ResetInputIconStyled,
  TextFieldMessageStyled,
  TextFieldStyled,
} from './TextField.styled';

export interface ExtraComponent {
  onClick?: (text: string) => void;
  component: ReactNode;
}

export interface TextFieldProps
  extends ComponentPropsWithoutRef<'input'>,
    BaseProps {
  label: string;
  labelIcon?: ReactNode;
  isFloatingLabel?: boolean;
  extraPrefix?: ExtraComponent;
  extraSuffix?: ExtraComponent;
  hasError?: boolean;
  requiredMessage?: string;
  initialValue?: string;
  inputRef?: RefObject<HTMLInputElement>;
  message?: string;
  variant?: TextFieldVariant;
  backgroundFill?: TextFieldBackgroundFill;
  onResetInput?: () => void;
}

export const TextField = ({
  dataTestId,
  hasError = false,
  extraPrefix,
  extraSuffix,
  label,
  labelIcon,
  isFloatingLabel = true,
  name,
  id,
  required,
  requiredMessage,
  style,
  children,
  initialValue,
  inputRef,
  message: messageProp = '',
  type = 'text',
  variant = 'outlined',
  backgroundFill = 'default',
  disabled = false,
  onChange = () => null,
  onResetInput = () => null,
  ...rest
}: TextFieldProps) => {
  const [activeInput, setActiveInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hasRequiredError, setHasRequiredError] = useState(false);
  const textFieldId = id ?? label.replaceAll(' ', '-').toLowerCase();
  const testId =
    dataTestId ?? `${label.replaceAll(' ', '-').toLowerCase()}-text-field`;

  useEffect(() => {
    // Check if there's an initial value coming from props
    if (!!initialValue) {
      setInputValue(initialValue);
      setHasRequiredError(false);
    } else {
      setInputValue('');
    }
  }, [initialValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setHasRequiredError(false);

    if (onChange) {
      onChange(event);
    }
  };

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!rest.readOnly) {
      setActiveInput(true);
    }

    if (rest.onFocus) {
      rest.onFocus(event);
    }
  };

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    const isEmptyOrOnlySpaces = event.currentTarget.value.trim().length === 0;
    if (isEmptyOrOnlySpaces) {
      setActiveInput(false);

      if (required && requiredMessage) {
        setHasRequiredError(true);
      }
    }

    if (rest.onBlur) {
      rest.onBlur(event);
    }
  };

  const handleResetInput = () => {
    setInputValue('');
    setActiveInput(false);

    onResetInput();
  };

  const handleResetIconEnter = (event: React.KeyboardEvent<HTMLInputElement>) =>
    event.code === 'Enter' && handleResetInput();

  const handleExtraPreffixEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) =>
    event.code === 'Enter' &&
    extraPrefix?.onClick &&
    extraPrefix.onClick(inputValue);

  const handleExtraSuffixEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) =>
    event.code === 'Enter' &&
    extraSuffix?.onClick &&
    extraSuffix.onClick(inputValue);

  const messageColor = disabled ? 'content.light' : 'content.medium';
  const showError = hasError || hasRequiredError;
  const message = hasRequiredError
    ? requiredMessage ?? messageProp
    : messageProp;

  const isActiveInput = activeInput || !!inputValue.trim();

  const isSearchType = type === 'search';

  const extraPreffixOnClick = extraPrefix?.onClick ? extraPrefix.onClick : null;
  const extraSuffixOnClick = extraSuffix?.onClick ? extraSuffix.onClick : null;

  return (
    <TextFieldStyled
      hasPrefix={!!extraPrefix}
      isFloatingLabel={isFloatingLabel}
      style={style}
    >
      {!isActiveInput || !isFloatingLabel || !isSearchType ? (
        <LabelField
          hasError={showError}
          htmlFor={textFieldId}
          icon={labelIcon}
          isActive={isActiveInput || type === 'date'}
          isDisabled={disabled}
          isFloating={isFloatingLabel}
          isRequired={required}
        >
          {label}
        </LabelField>
      ) : null}

      <InputWrapperStyled
        backgroundFill={backgroundFill}
        data-testid='input-wrapper'
        hasError={showError}
        isFloatingLabel={isFloatingLabel}
        variant={variant}
      >
        {extraPrefix?.component ? (
          <InputExtraPrefixStyled
            data-testid='extra-preffix'
            {...(!!extraPreffixOnClick && {
              tabIndex: 0,
              onClick: () => extraPreffixOnClick(inputValue),
              onKeyDown: handleExtraPreffixEnter,
            })}
          >
            {extraPrefix.component}
          </InputExtraPrefixStyled>
        ) : null}

        <InputFieldStyled
          data-error={showError}
          data-testid={testId}
          disabled={disabled}
          id={textFieldId}
          isFloatingLabel={isFloatingLabel}
          isSearchType={isSearchType}
          name={name ?? textFieldId}
          ref={inputRef}
          type={type}
          value={inputValue}
          {...rest}
          onBlur={onBlur}
          onChange={handleChange}
          onFocus={onFocus}
        />

        {isSearchType && !!inputValue ? (
          <ResetInputIconStyled
            data-testid='reset-icon'
            onKeyDown={handleResetIconEnter}
            tabIndex={0}
          >
            <IconButton onClick={handleResetInput}>
              <Icon code='close_small' />
            </IconButton>
          </ResetInputIconStyled>
        ) : null}

        {extraSuffix?.component ? (
          <InputExtraSuffixStyled
            data-testid='extra-suffix'
            {...(!!extraSuffixOnClick && {
              tabIndex: 0,
              onClick: () => extraSuffixOnClick(inputValue),
              onKeyDown: handleExtraSuffixEnter,
            })}
          >
            {extraSuffix.component}
          </InputExtraSuffixStyled>
        ) : null}
      </InputWrapperStyled>

      {message ? (
        <TextFieldMessageStyled>
          <Typography
            color={showError ? 'error.default' : messageColor}
            element='span'
            fontStyles='bodySmRegular'
          >
            {message}
          </Typography>
        </TextFieldMessageStyled>
      ) : null}

      {children}
    </TextFieldStyled>
  );
};
