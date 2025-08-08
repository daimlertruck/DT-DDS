import { CustomTheme as Theme } from '@dt-dds/themes';

import { ButtonSize } from '../constants';

export const buttonSizeStyles = (
  size: ButtonSize,
  theme: Theme,
  isOutline: boolean
) =>
  ({
    large: `
      ${theme.fontStyles.button1}
      padding: ${
        isOutline ? `calc(${theme.spacing['2xs']} - 2px)` : theme.spacing['2xs']
      }  ${theme.spacing.s};
    `,
    medium: `
      ${theme.fontStyles.button2}
      padding: ${
        isOutline ? `calc(${theme.spacing['3xs']} - 2px)` : theme.spacing['3xs']
      } ${theme.spacing.xs};
    `,
    small: `
      ${theme.fontStyles.button3}
      padding: ${
        isOutline ? `calc(${theme.spacing['4xs']} - 2px)` : theme.spacing['4xs']
      } ${theme.spacing['2xs']};
    `,
  }[size]);
