import { CustomTheme, defaultTheme } from '@dt-dds/themes';

const { colors: defaultColors, palette: defaultPalette } = defaultTheme;

export const colors = {
  ...defaultColors,
  goGreen: '#00CC02',
  goGreen_05: '#F5FCF4',
  goGreen_10: '#E8F8E6',
  goGreen_20: '#C2ECBE',
  goGreen_30: '#8AD884',
  goGreen_40: '#4CC046',
  goGreen_50: '#00A300',
  goGreen_60: '#008100',
  goGreen_70: '#005D00',
  goGreen_80: '#003B00',
  goGreen_90: '#001F00',
  goGreen_100: '#000900',

  darkGreen: '#0D291A',
  darkGreen_05: '#F9FAF9',
  darkGreen_10: '#F0F4F1',
  darkGreen_20: '#D7E1DB',
  darkGreen_30: '#B5C7BB',
  darkGreen_40: '#93AB9B',
  darkGreen_50: '#6F8B7A',
  darkGreen_60: '#4E6B59',
  darkGreen_70: '#314C3C',
  darkGreen_80: '#1A2F23',
  darkGreen_90: '#13231A',
  darkGreen_100: '#09170F',
};

export const palette: CustomTheme['palette'] = {
  ...defaultPalette,
  accent: {
    default: colors.goGreen,
    light: colors.goGreen_20,
    medium: colors.goGreen_30,
    dark: colors.goGreen_60,
  },
  primary: {
    default: colors.darkGreen,
    light: colors.darkGreen_30,
    medium: colors.darkGreen_60,
    dark: colors.darkGreen_80,
  },
};
