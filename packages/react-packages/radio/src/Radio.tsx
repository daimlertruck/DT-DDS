import { useTheme } from '@emotion/react';

import { Box } from '@dt-dds/react-box';
import { Typography } from '@dt-dds/react-typography';

import { RadioInputStyled } from './Radio.styled';
import { RadioProps } from './types';

export const Radio = ({
  onChange,
  label,
  isChecked,
  isDefaultChecked,
  isDisabled,
  name = 'radio-group-name',
  value,
  hasError,
  size = 'large',
  dataTestId,
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
        checked={isChecked}
        data-error={hasError}
        data-testid={dataTestId}
        defaultChecked={isDefaultChecked}
        disabled={isDisabled}
        id={radioId}
        name={name}
        onChange={onChange}
        radioSize={size}
        tabIndex={isDisabled ? -1 : 0}
        type='radio'
        value={value}
      />
      {label ? (
        <Typography
          element='label'
          fontStyles={size === 'large' ? 'bodyLgRegular' : 'bodyMdRegular'}
          htmlFor={radioId}
          style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
        >
          {label}
        </Typography>
      ) : null}
    </Box>
  );
};
