import {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
} from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { DropdownOptionStyled } from './DropdownOption.styled';

export type DropdownOptionBaseProps = BaseProps & {
  isDisabled?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
  isMulti?: boolean;
};

export type DropdownOptionProps<E extends ElementType = 'li'> =
  DropdownOptionBaseProps & {
    as?: E;
  } & ComponentPropsWithoutRef<E>;

export const DropdownOption = forwardRef(
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
    }: DropdownOptionProps<ElementType>,
    ref: ForwardedRef<HTMLLIElement>
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

    const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        onClick?.(e);
      }
    };

    return (
      <DropdownOptionStyled
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={isDisabled ? -1 : 0}
        {...(!isSelected && { role: 'menuitem' })}
        {...(rest as ComponentPropsWithoutRef<'li'>)}
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
