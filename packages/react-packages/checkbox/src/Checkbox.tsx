import { ChangeEvent, ComponentPropsWithRef, forwardRef } from 'react';

import { useTheme } from '@emotion/react';

import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';

import {
  CheckboxStyled,
  CheckboxInputStyled,
  CheckboxLabelStyled,
  CheckBoxInputWrapper,
} from './Checkbox.styled';

export interface CheckBoxProps
  extends BaseProps,
    ComponentPropsWithRef<'input'> {
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    {
      dataTestId = 'checkbox-id',
      onChange,
      children,
      isChecked = false,
      isDisabled = false,
      style,
      className,
      ...rest
    }: CheckBoxProps,
    ref
  ) => {
    const theme = useTheme();

    const handleOnChangeTrigger = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (isDisabled) {
        return;
      }

      onChange?.(event);
    };

    return (
      <CheckboxStyled
        className={className}
        data-testid={dataTestId}
        isChecked={isChecked}
        isDisabled={isDisabled}
        style={style}
      >
        <CheckBoxInputWrapper>
          <CheckboxInputStyled
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleOnChangeTrigger}
            ref={ref}
            type='checkbox'
            {...rest}
          />
          {isChecked ? (
            <Icon
              code='check'
              color={theme.palette.content.contrast}
              size='medium'
            />
          ) : null}
        </CheckBoxInputWrapper>
        {children ? (
          <CheckboxLabelStyled isChecked={isChecked} isDisabled={isDisabled}>
            {children}
          </CheckboxLabelStyled>
        ) : null}
      </CheckboxStyled>
    );
  }
);
