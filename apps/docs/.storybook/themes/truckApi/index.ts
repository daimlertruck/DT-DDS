import { Theme, defaultTheme } from '@dt-dds/react';

import { palette } from './palette';
import { shape } from './shape';
import { fontFamily, fontStyles } from './typography';

export const theme: Theme = {
  ...defaultTheme,
  fontFamily,
  fontStyles,
  palette,
  shape,
  icons: 'sharp',
};
