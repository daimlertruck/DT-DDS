import { animations } from './animations';
import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { components } from './components';
import { iconSizes } from './icons';
import { palette } from './palette';
import { radius } from './radius';
import { shadows } from './shadows';
import { shape } from './shape';
import { spacing } from './spacing';
import { fontFamily, fontStyles, responsiveFontStyles } from './typography';
import { CustomTheme } from '../../types';

export const theme: CustomTheme = {
  animations,
  breakpoints,
  components,
  palette,
  colors,
  radius,
  shadows,
  spacing,
  fontFamily,
  fontStyles,
  responsiveFontStyles,
  shape,
  iconSizes,
  icons: 'outlined',
};

export default theme;
