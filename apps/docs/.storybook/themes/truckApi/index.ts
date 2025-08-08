import { CustomTheme as Theme, defaultTheme } from '@dt-ui/themes';
import { theme as defaultTheme } from '@dt-dds/react';
import { Theme } from '@emotion/react';
import { defaultTheme, CustomTheme as Theme } from '@dt-ui/themes';

import { palette } from './palette';
import { shape } from './shape';
import { fontFamily, fontStyles } from './typography';

export const truckAPITheme: Theme = {
  ...defaultTheme,
  fontFamily,
  fontStyles,
  palette,
  shape,
  icons: 'outlined',
};
