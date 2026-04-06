import { Theme, defaultTheme } from '@dt-dds/react';

import { colors, palette } from './palette';
import { shape } from './shape';
import { fontFamily, fontStyles } from './typography';

export const theme: Theme = {
  ...defaultTheme,
  colors,
  fontFamily,
  fontStyles,
  palette,
  shape,
};
