import { keyframes, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { SpinnerColorScheme, SpinnerSize } from './types';

interface StyledSpinnerProps {
  size: SpinnerSize;
  colorScheme: SpinnerColorScheme;
}

interface SpinnerColors {
  main: string;
  background: string;
}

const spinnerAnimation = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinnerSizes: Record<SpinnerSize, string> = {
  'extra-small': '14px',
  small: '28px',
  medium: '42px',
  large: '50px',
  'extra-large': '58px',
};

const spinnerBorderSizes: Record<SpinnerSize, string> = {
  'extra-small': '2px',
  small: '4px',
  medium: '4px',
  large: '4px',
  'extra-large': '4px',
};

const spinnerColors = (
  theme: Theme
): Record<SpinnerColorScheme, SpinnerColors> => ({
  positive: {
    main: theme.palette.primary.default,
    background: theme.palette.border.default,
  },
  negative: {
    main: theme.palette.border.light,
    background: theme.palette.primary.dark,
  },
});

export const SpinnerStyled = styled.div<StyledSpinnerProps>`
  ${({ theme, size, colorScheme }) => `
    width: ${spinnerSizes[size]};
    height: ${spinnerSizes[size]};
    border: ${spinnerBorderSizes[size]} solid ${
    spinnerColors(theme)[colorScheme].background
  };
    border-radius: 50%;
    border-top: ${spinnerBorderSizes[size]} solid ${
    spinnerColors(theme)[colorScheme].main
  };
  `};
  animation: ${spinnerAnimation} 1s cubic-bezier(0.3, 0.1, 0.25, 0.65) 0s
    infinite normal none;
`;
