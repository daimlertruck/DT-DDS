import { CustomTheme, defaultTheme } from '@dt-dds/react';

const { palette: defaultPalette, colors } = defaultTheme;

export const palette: CustomTheme['palette'] = {
  ...defaultPalette,
  primary: {
    default: colors.blue,
    light: colors.blue_20,
    medium: colors.blue_60,
    dark: colors.blue_80,
  },
};
