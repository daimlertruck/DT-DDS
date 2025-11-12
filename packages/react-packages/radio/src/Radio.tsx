import { Children, cloneElement, ReactElement, useMemo } from 'react';

import { Box } from '@dt-dds/react-box';

import { RadioInputStyled, RadioLabelStyled } from './Radio.styled';
import { RadioGroupProps, RadioProps } from './types';

export const RadioGroup = ({
  children,
  onChange,
  dataTestId,
  direction = 'row',
  name,
}: RadioGroupProps) => {
  const clonedChildren = useMemo(
    () =>
      Children.map(children as ReactElement<RadioGroupProps>, (child) => {
        return (
          child &&
          cloneElement(child, {
            ...child.props,
            onChange,
            name,
          })
        );
      }),
    [children, onChange, name]
  );

  return (
    <Box
      data-testid={dataTestId ?? 'radio-group'}
      style={{ flexDirection: direction, gap: 12 }}
    >
      {clonedChildren}
    </Box>
  );
};

const Radio = ({
  onChange,
  label,
  isDefaultChecked,
  isDisabled,
  name = 'radio-group-name',
  value,
}: RadioProps) => {
  const radioId = `${value}-id`;
  return (
    <Box
      style={{
        flexDirection: 'row',
        gap: 8,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      <RadioInputStyled
        defaultChecked={isDefaultChecked}
        disabled={isDisabled}
        id={radioId}
        name={name}
        onChange={onChange}
        type='radio'
        value={value}
      />
      <RadioLabelStyled htmlFor={radioId}>{label}</RadioLabelStyled>
    </Box>
  );
};

export default Radio;
