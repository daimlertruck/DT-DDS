import { BaseProps } from '@dt-dds/react-core';
import React, { forwardRef, MouseEvent } from 'react';

import { DropdownOptionStyled } from './DropdownOption.styled';
export interface DropdownOptionProps
  extends BaseProps,
    React.LiHTMLAttributes<HTMLLIElement> {
  isDisabled?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
  isMulti?: boolean;
}

export const DropdownOption = forwardRef<HTMLLIElement, DropdownOptionProps>(
  (
    {
      dataTestId,
      children,
      style,
      isDisabled,
      isSelected = false,
      isHighlighted = false,
      onClick,
      ...rest
    },
    ref
  ) => {
    const testId = dataTestId ?? 'dropdown-option';

    const handleClick = (e: MouseEvent<HTMLLIElement>) => {
      if (isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      onClick?.(e);
    };

    return (
      <DropdownOptionStyled
        {...rest}
        aria-disabled={isDisabled}
        aria-selected={isSelected}
        data-highlighted={isHighlighted}
        data-testid={testId}
        onClick={handleClick}
        ref={ref}
        style={style}
      >
        {children}
      </DropdownOptionStyled>
    );
  }
);
