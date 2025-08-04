import { PaletteKeys, CustomTheme as Theme } from '../types/theme';

type PaletteKey = keyof Theme['palette'];
type Shade = keyof Theme['palette'][PaletteKey];

export const getContextualColor = (color: PaletteKeys, theme: Theme) => {
  const [name, shade] = color.split('.') as [PaletteKey, Shade];
  return theme.palette[name][shade];
};
