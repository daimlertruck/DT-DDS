import { Checkbox } from '@dt-dds/react-checkbox';
import { BaseProps } from '@dt-dds/react-core';

import { useSelectContext } from '../context';
import {
  SelectOptionStyled,
  SelectOptionContentStyled,
} from './SelectOption.styled';

export interface SelectOptionProps extends BaseProps {
  value: string;
  label?: string;
  index: number;
  disabled?: boolean;
}

export const SelectOption = ({
  dataTestId,
  index,
  children,
  style,
  value,
  label,
  disabled,
}: SelectOptionProps) => {
  const { getItemProps, isItemHighlighted, isItemSelected, isMulti } =
    useSelectContext();

  const item = { value: value, label: label, disabled: !!disabled };

  const isSelected = isItemSelected(item);

  const isHighlighted = isItemHighlighted(index);
  const itemProps = getItemProps({ item, index });

  return (
    <SelectOptionStyled
      aria-disabled={itemProps['aria-disabled']}
      data-testid={dataTestId}
      isHighlighted={isHighlighted}
      isMulti={isMulti}
      style={style}
      {...(!isMulti && {
        ...itemProps,
        'aria-selected': isSelected,
      })}
    >
      {isMulti ? (
        <Checkbox
          isChecked={isSelected}
          isDisabled={itemProps['aria-disabled']}
          {...itemProps}
        >
          {children || label || value}
        </Checkbox>
      ) : (
        <SelectOptionContentStyled isSelected={isSelected}>
          {children || label || value}
        </SelectOptionContentStyled>
      )}
    </SelectOptionStyled>
  );
};
