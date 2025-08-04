import { CustomTheme as Theme } from '../../types';

export const palette: Theme['palette'] = {
  surface: {
    default: '#f3f3f5',
    light: '#fafafa',
    medium: '#dedede',
    dark: '#131313',
    contrast: '#ffffff',
  },
  content: {
    default: '#292929',
    light: '#a3a3a3',
    medium: '#636363',
    dark: '#131313',
    contrast: '#ffffff',
  },
  border: {
    default: '#dedede',
    light: '#f3f3f5',
    medium: '#c1c1c1',
    dark: '#131313',
    contrast: '#ffffff',
  },
  primary: {
    default: '#000000',
    light: '#dedede',
    medium: '#838383',
    dark: '#454545',
  },
  secondary: {
    default: '#454545',
    light: '#c1c1c1',
    medium: '#838383',
    dark: '#131313',
  },
  accent: {
    default: '#00677f',
    light: '#cce3eb',
    medium: '#73aec2',
    dark: '#003041',
  },
  informative: {
    default: '#008dfc',
    light: '#e8f4ff',
    medium: '#8ec6ff',
    dark: '#0060cb',
  },
  success: {
    default: '#6ea046',
    light: '#eff5eb',
    medium: '#afcc9b',
    dark: '#437211',
  },
  warning: {
    default: '#e69123',
    light: '#fbf1e7',
    medium: '#e7b787',
    dark: '#bb6f00',
  },
  error: {
    default: '#a00000',
    light: '#ffcbc0',
    medium: '#ff9c8b',
    dark: '#6d0000',
  },
} as const;
