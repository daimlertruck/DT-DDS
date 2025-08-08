import { CustomTheme as Theme, defaultTheme } from '@dt-dds/themes';
import { palette } from './palette';
import { fontFamily, fontStyles } from './typography';
import { shape } from './shape';

export const theme: Theme = {
  ...defaultTheme,
  fontFamily,
  fontStyles,
  palette,
  shape,
};
