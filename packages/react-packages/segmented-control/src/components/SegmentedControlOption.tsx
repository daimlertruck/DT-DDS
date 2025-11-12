import { Code } from '@dt-dds/icons';
import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { Tooltip } from '@dt-dds/react-tooltip';

import { useSegmentedControlContext } from '../context';
import { SegmentedControlOptionStyled } from './SegmentedControlOption.styled';

export interface SegmentedControlProps extends BaseProps {
  label: string;
  value: string;
  iconCode?: Code;
  disabled?: boolean;
}

export const SegmentedControlOption = ({
  label,
  iconCode,
  value,
  disabled,
}: SegmentedControlProps) => {
  const { setSelectedValue, showLabel, selectedValue } =
    useSegmentedControlContext();

  const isSelected = selectedValue === value;
  const isLabelVisible = showLabel || !iconCode;

  const renderOption = (
    <SegmentedControlOptionStyled
      aria-label={label}
      aria-pressed={isSelected ? 'true' : 'false'}
      disabled={disabled}
      onClick={() => setSelectedValue(value)}
      showLabel={isLabelVisible}
      type='button'
    >
      {iconCode ? <Icon code={iconCode} size='small' /> : null}
      {isLabelVisible ? label : null}
    </SegmentedControlOptionStyled>
  );

  return isLabelVisible ? (
    renderOption
  ) : (
    <Tooltip>
      {renderOption}
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  );
};
