import {
  AnchorHTMLAttributes,
  ElementType,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
} from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { DropdownOptionStyled } from './DropdownOption.styled';

export interface DropdownOptionProps
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLElement>, 'onClick'> {
  isDisabled?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
  isMulti?: boolean;
  as?: ElementType;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
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

    const handleClick = (e: MouseEvent<HTMLElement>) => {
      if (isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      onClick?.(e);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        onClick?.(e as unknown as MouseEvent<HTMLElement>);
      }
    };

    return (
      <DropdownOptionStyled
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={isDisabled ? -1 : 0}
        {...(!isSelected && { role: 'menuitem' })}
        {...rest}
        aria-disabled={isDisabled}
        aria-selected={isSelected}
        data-highlighted={isHighlighted}
        data-testid={testId}
        ref={ref}
        style={style}
      >
        {children}
      </DropdownOptionStyled>
    );
  }
);
