import { Theme } from '@emotion/react';

import { TagSize } from '../constants';

export const tagSizeStyles = (theme: Theme, size: TagSize) =>
  ({
    medium: {
      fontSize: '0.75rem',
      fontWeight: '700',
      lineHeight: '1rem',
      padding: `${theme.spacing.spacing_30} ${theme.spacing.spacing_40}`,
      height: '32px',
    },
    small: {
      fontSize: '0.625rem',
      fontWeight: '700',
      lineHeight: '0.875rem',
      padding: `${theme.spacing.spacing_10} ${theme.spacing.spacing_30}`,
      height: '18px',
    },
  }[size]);
