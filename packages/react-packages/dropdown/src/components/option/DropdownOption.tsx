import {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactElement,
  Ref,
} from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { DropdownOptionStyled } from './DropdownOption.styled';

type DropdownOptionBaseProps = BaseProps & {
  isDisabled?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
  isMulti?: boolean;
};

type DropdownOptionProps<E extends ElementType = 'li'> =
  DropdownOptionBaseProps & {
    as?: E;
  } & ComponentPropsWithoutRef<E>;

type DropdownOptionComponent = <E extends ElementType = 'li'>(
  props: DropdownOptionProps<E> & { ref?: Ref<Element> }
) => ReactElement | null;

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

    return (
      <DropdownOptionStyled
        tabIndex={isDisabled ? -1 : 0}
        {...(rest as ComponentPropsWithoutRef<'li'>)}
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
) as DropdownOptionComponent;
