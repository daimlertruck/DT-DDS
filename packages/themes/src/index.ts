// Theme types
export type {
  CustomTheme,
  Colors,
  Breakpoints,
  PaletteKeys,
} from './types/theme';
export type { FontFace } from './types/fontFace';

// Theme exports
export { theme as defaultTheme } from './themes/default';
export { daimlertruckTheme } from './themes/index';

// Theme utilities
export { getTextStyles } from './utils/typography';
export { getContextualColor } from './utils/getContextualColor';
export { hexToRgba } from './utils/hexToRgba';

// Theme generation utilities (for internal use)
export {
  generateColors,
  generatePalette,
  generateSpacing,
  generateRadius,
  generateShadows,
  generateShape,
  generateBreakpoints,
  generateTypography,
  generateIcons,
  generateAnimations,
} from './utils/theme-generator';
