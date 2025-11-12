import { ComponentPropsWithoutRef } from 'react';

import { css } from '@emotion/react';

import { BaseProps, ComponentSize } from '@dt-dds/react-core';

import { IconButtonVariant } from './constants';
import { IconButtonStyled } from './IconButton.styled';

export interface IconButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    BaseProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  ariaLabel?: string;
  variant?: IconButtonVariant;
  size?: ComponentSize;
  cssOverrides?: ReturnType<typeof css>;
}

export const IconButton = ({
  children,
  dataTestId,
  isDisabled,
  ariaLabel,
  variant,
  size,
  onClick,
  cssOverrides,
  ...props
}: IconButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <IconButtonStyled
      aria-label={ariaLabel}
      cssOverrides={cssOverrides}
      data-testid={dataTestId ? dataTestId : 'icon-button'}
      disabled={isDisabled}
      onClick={handleClick}
      size={size}
      variant={variant}
      {...props}
    >
      {children}
    </IconButtonStyled>
  );
};
