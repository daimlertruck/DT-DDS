import { useTheme } from '@emotion/react';

import { Box } from '@dt-dds/react-box';

import { RadioInputStyled, RadioLabelStyled } from './Radio.styled';
import { RadioProps } from './types';

export const Radio = ({
  onChange,
  label,
  isDefaultChecked,
  isDisabled,
  name = 'radio-group-name',
  value,
  hasError,
}: RadioProps) => {
  const radioId = `${value}-id`;
  const theme = useTheme();

  return (
    <Box
      style={{
        flexDirection: 'row',
        gap: theme.spacing.spacing_30,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      <RadioInputStyled
        data-error={hasError}
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
