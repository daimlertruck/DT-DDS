import { ComponentPropsWithoutRef } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { SegmentedControlOption } from './components/SegmentedControlOption';
import { SegmentedControlProvider } from './context';
import { SegmentedControlStyled } from './SegmentedControl.styled';

export interface SegmentedControlProps
  extends ComponentPropsWithoutRef<'div'>,
    BaseProps {
  selectedValue?: string | undefined;
  showLabel?: boolean;
  onChangeControl?: (value: string) => void;
}

const SegmentedControl = ({
  dataTestId,
  children,
  showLabel = false,
  selectedValue,
  onChangeControl = () => null,
  ...props
}: SegmentedControlProps) => {
  return (
    <SegmentedControlProvider
      onChange={onChangeControl}
      selectedValue={selectedValue}
      showLabel={showLabel}
    >
      <SegmentedControlStyled data-testid={dataTestId} role='group' {...props}>
        {children}
      </SegmentedControlStyled>
    </SegmentedControlProvider>
  );
};

SegmentedControl.Option = SegmentedControlOption;

export { SegmentedControl };
