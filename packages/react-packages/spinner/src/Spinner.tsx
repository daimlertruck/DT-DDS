import { Box } from '@dt-dds/react-box';
import { BaseProps } from '@dt-dds/react-core';
import { Typography } from '@dt-dds/react-typography';
import { CustomTheme as Theme, PaletteKeys } from '@dt-dds/themes';
import { useTheme } from '@emotion/react';

import { SpinnerStyled } from './Spinner.styled';
import { SpinnerColorScheme, SpinnerSize } from './types';

export interface SpinnerProps extends Omit<BaseProps, 'children'> {
  size?: SpinnerSize;
  colorScheme?: SpinnerColorScheme;
  loadingText?: string;
}

const spinnerTextColor: Record<SpinnerColorScheme, PaletteKeys> = {
  positive: 'content.default',
  negative: 'content.contrast',
};

const spinnerTextSize: Record<SpinnerSize, keyof Theme['fontStyles']> = {
  'extra-small': 'body4',
  small: 'body4',
  medium: 'body3',
  large: 'body3',
  'extra-large': 'body2',
};

export const Spinner = ({
  style,
  dataTestId = 'spinner',
  size = 'medium',
  colorScheme = 'positive',
  loadingText,
}: SpinnerProps) => {
  const theme = useTheme();
  return (
    <Box dataTestId={dataTestId} style={{ ...style }}>
      <SpinnerStyled colorScheme={colorScheme} size={size} />
      {loadingText ? (
        <Typography
          color={spinnerTextColor[colorScheme]}
          fontStyles={spinnerTextSize[size]}
          style={{ marginTop: theme.spacing['3xs'] }}
        >
          {loadingText}
        </Typography>
      ) : null}
    </Box>
  );
};
