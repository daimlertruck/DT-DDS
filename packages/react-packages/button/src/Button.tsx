import { ComponentPropsWithoutRef } from 'react';

import { BaseProps } from '@dt-dds/react-core';
import { Spinner } from '@dt-dds/react-spinner';

import { ButtonStyled } from './Button.styled';
import { ButtonAppearance, ButtonSize, ButtonVariant } from './constants';

export interface ButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    BaseProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonAppearance;
}

export const Button = ({
  style,
  children,
  onClick,
  dataTestId,
  isLoading,
  isDisabled = false,
  size = 'medium',
  variant = 'solid',
  color = 'primary',
  type = 'button',
  ...props
}: ButtonProps) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled || isLoading) {
      return;
    }
    onClick?.(event);
  };
  return (
    <ButtonStyled
      {...props}
      color={color}
      data-testid={`${dataTestId}-button`}
      disabled={isDisabled || isLoading}
      onClick={handleButtonClick}
      size={size}
      style={style}
      type={type}
      variant={variant}
    >
      {children}
      {isLoading ? (
        <Spinner
          colorScheme={variant !== 'solid' ? 'positive' : 'negative'}
          size='extra-small'
        />
      ) : null}
    </ButtonStyled>
  );
};
