import { CustomTheme as Theme } from '../types/theme';

export const getContextualColor = (
  color: string | undefined,
  theme: Theme
): string | undefined => {
  if (!color) {
    return;
  }

  const parts = color.split('.');

  if (parts.length !== 2) {
    return;
  }

  const [name, shade] = parts;

  const group = theme.palette[name as keyof Theme['palette']];

  if (!group) {
    return;
  }

  const value = group[shade as keyof typeof group];

  if (typeof value === 'string') {
    return value;
  }
};
