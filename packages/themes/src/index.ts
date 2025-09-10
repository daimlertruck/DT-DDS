// Theme types
export type {
  CustomTheme,
  Colors,
  Breakpoints,
  PaletteKeys,
} from './types/theme';
export type { FontFace } from './types/fontFace';

// Theme exports
export { defaultTheme } from './themes';

// Offers Backward compatibility
export type { CustomTheme as Theme } from './types/theme';
export { defaultTheme as theme } from './themes';

// Theme utilities
export { getTextStyles } from './utils/typography';
export { getContextualColor } from './utils/getContextualColor';
export { hexToRgba } from './utils/hexToRgba';

// Theme generation utilities are for internal use only and not exported
