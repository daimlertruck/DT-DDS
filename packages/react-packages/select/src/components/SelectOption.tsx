import { ReactNode } from 'react';

import { BaseProps } from '@dt-dds/react-core';
import { Dropdown } from '@dt-dds/react-dropdown';

import { useSelectContext } from '../context';
import { SelectOptionValue } from '../types';
import { SelectCheckboxStyled } from './SelectOption.styled';

export interface SelectOptionProps extends BaseProps {
  value: string;
  index: number;
  isDisabled?: boolean;
  valueLabel?: ReactNode;
}

export const SelectOption = ({
  dataTestId,
  index,
  children,
  style,
  value,
  isDisabled = false,
}: SelectOptionProps) => {
  const { getItemProps, isItemHighlighted, isItemSelected, isMulti } =
    useSelectContext();

  const item: SelectOptionValue = { value, isDisabled };

  const isSelected = isItemSelected(value);
  const isHighlighted = isItemHighlighted(index);

  return (
    <Dropdown.Option
      dataTestId={dataTestId}
      isDisabled={isDisabled}
      isHighlighted={isHighlighted}
      isSelected={isSelected}
      style={{ ...style, ...(isMulti ? { padding: 0 } : {}) }}
      {...getItemProps({ item, index })}
    >
      {isMulti ? (
        <SelectCheckboxStyled
          checked={isSelected}
          disabled={isDisabled}
          tabIndex={-1}
        >
          {children}
        </SelectCheckboxStyled>
      ) : (
        children
      )}
    </Dropdown.Option>
  );
};
