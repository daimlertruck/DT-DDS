import { BaseProps } from '@dt-dds/react-core';
import { Dropdown } from '@dt-dds/react-dropdown';

import { useSelectContext } from '../context';

import { SelectCheckboxStyled } from './SelectOption.styled';

export interface SelectOptionProps extends BaseProps {
  value: string;
  index: number;
  isDisabled?: boolean;
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

  const item = { value, isDisabled };

  const isSelected = isItemSelected(item);
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
          aria-hidden='true'
          isChecked={isSelected}
          isDisabled={isDisabled}
          role='presentation'
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
