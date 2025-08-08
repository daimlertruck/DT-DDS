import { CustomTheme as Theme, defaultTheme } from '@dt-ui/themes';

import { colors, palette } from './palette';
import { fontFamily, fontStyles } from './typography';
import { shape } from './shape';

export const theme: Theme = {
  ...defaultTheme,
  colors,
  fontFamily,
  fontStyles,
  palette,
  shape,
  icons: 'rounded',
};
