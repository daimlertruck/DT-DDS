import { CustomTheme as Theme } from '../../types';

export const palette: Theme['palette'] = {
  surface: {
    default: '#e6e6e6',
    light: '#f2f2f2',
    medium: '#c5c5c5',
    dark: '#1d1d1d',
    contrast: '#ffffff',
  },
  content: {
    default: '#252525',
    light: '#a9a9a9',
    medium: '#696969',
    dark: '#1d1d1d',
    contrast: '#ffffff',
  },
  border: {
    default: '#e6e6e6',
    light: '#f2f2f2',
    medium: '#c5c5c5',
    dark: '#1d1d1d',
    contrast: '#ffffff',
  },
  primary: {
    default: '#000000',
    light: '#c5c5c5',
    medium: '#696969',
    dark: '#3e3e3e',
  },
  secondary: {
    default: '#3e3e3e',
    light: '#c5c5c5',
    medium: '#696969',
    dark: '#1d1d1d',
  },
  accent: {
    default: '#00677f',
    light: '#deeff2',
    medium: '#8ab9c4',
    dark: '#003946',
  },
  informative: {
    default: '#00677f',
    light: '#deeff2',
    medium: '#8ab9c4',
    dark: '#003946',
  },
  success: {
    default: '#209242',
    light: '#e9f4ec',
    medium: '#98cda8',
    dark: '#125024',
  },
  warning: {
    default: '#fab700',
    light: '#fff8e6',
    medium: '#fdde8a',
    dark: '#8a6500',
  },
  error: {
    default: '#e80000',
    light: '#ffe6e6',
    medium: '#ff8a8a',
    dark: '#8c0000',
  },
} as const;
