import { CustomTheme as Theme } from '@dt-dds/themes';

import { ButtonSize } from '../constants';

export const buttonSizeStyles = (
  size: ButtonSize,
  theme: Theme,
  isOutline: boolean
) =>
  ({
    large: `
      ${theme.fontStyles.buttonLg}
      padding: ${
        isOutline
          ? `calc(${theme.spacing.spacing_50} - 2px)`
          : theme.spacing.spacing_50
      }  ${theme.spacing.s};
    `,
    medium: `
      ${theme.fontStyles.buttonMd}
      padding: ${
        isOutline
          ? `calc(${theme.spacing.spacing_40} - 2px)`
          : theme.spacing.spacing_40
      } ${theme.spacing.xs};
    `,
    small: `
      ${theme.fontStyles.buttonSm}
      padding: ${
        isOutline
          ? `calc(${theme.spacing.spacing_30} - 2px)`
          : theme.spacing.spacing_30
      } ${theme.spacing.spacing_50};
    `,
  }[size]);
