import { MouseEvent } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { DropdownOptionStyled } from './DropdownOption.styled';
import { useDropdownContext } from '../../context';
import { DropdownFill, DropdownOptionValue } from '../../types';

export interface DropdownOptionProps extends BaseProps {
  fill?: DropdownFill;
  option: DropdownOptionValue;
  isDisabled?: boolean;
  onClick?: (
    option: string,
    name: string | undefined,
    event: MouseEvent<HTMLLIElement>
  ) => void;
}

export const DropdownOption = ({
  dataTestId,
  option,
  children,
  style,
  isDisabled,
  onClick,
}: DropdownOptionProps) => {
  const { state, setState, setIsOpen, name } = useDropdownContext();

  const testId = dataTestId ?? `dropdown-option-${option.value}`;

  const value = {
    text: option.text ?? option.value,
    value: option.value,
  };

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    if (isDisabled) {
      return;
    }

    setIsOpen(false);
    setState(value);
    onClick && onClick(option.value, name, event);
  };

  return (
    <DropdownOptionStyled
      data-testid={testId}
      disabled={isDisabled}
      isSelected={state.value === option.value}
      key={option.value}
      onClick={handleClick}
      role='option'
      style={style}
    >
      {children}
    </DropdownOptionStyled>
  );
};
