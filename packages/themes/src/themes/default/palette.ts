import { CustomTheme as Theme } from '../../types';

import { blue, grey, green, orange, red, petrol } from './colors';

export const colors: Theme['colors'] = {
  ...grey,
  ...petrol,
  ...blue,
  ...green,
  ...orange,
  ...red,
};

export const palette: Theme['palette'] = {
  surface: {
    default: colors.grey_20,
    light: colors.grey_10,
    medium: colors.grey_30,
    dark: colors.grey_100,
    contrast: colors.grey_00,
  },
  content: {
    default: colors.grey_90,
    light: colors.grey_50,
    medium: colors.grey_60,
    dark: colors.grey_100,
    contrast: colors.grey_00,
  },
  border: {
    default: colors.grey_30,
    light: colors.grey_20,
    medium: colors.grey_40,
    dark: colors.grey_100,
    contrast: colors.grey_00,
  },
  primary: {
    default: colors.grey_120,
    light: colors.grey_30,
    medium: colors.grey_60,
    dark: colors.grey_80,
  },
  secondary: {
    default: colors.grey_80,
    light: colors.grey_40,
    medium: colors.grey_60,
    dark: colors.grey_100,
  },
  accent: {
    default: colors.petrol_00,
    light: colors.petrol_30,
    medium: colors.petrol_50,
    dark: colors.petrol_90,
  },
  informative: {
    default: colors.blue_00,
    light: colors.blue_20,
    medium: colors.blue_40,
    dark: colors.blue_70,
  },
  success: {
    default: colors.green_00,
    light: colors.green_20,
    medium: colors.green_40,
    dark: colors.green_70,
  },
  warning: {
    default: colors.orange_00,
    light: colors.orange_20,
    medium: colors.orange_40,
    dark: colors.orange_60,
  },
  error: {
    default: colors.red_80,
    light: colors.red_30,
    medium: colors.red_40,
    dark: colors.red_90,
  },
};
