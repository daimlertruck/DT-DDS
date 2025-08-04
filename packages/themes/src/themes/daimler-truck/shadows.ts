import { CustomTheme as Theme } from '../../types';

export const shadows: Theme['shadows'] = {
  '0': '0px 1px 2px 0px #1018280d',
  '1': '0px 1px 3px 0px #1018281a',
  '2': '0px 4px 8px -2px #1018281a',
  '3': '0px 12px 16px -4px #10182814',
  '4': '0px 20px 24px -4px #10182814',
  '5': '0px 24px 48px -12px #1018282e',
  none: 'none',
  '0.5': '0px 1px 2px 0px #1018280d',
  xs: '0px 1px 2px 0px #1018280d',
  s: '0px 1px 3px 0px #1018281a',
  m: '0px 4px 8px -2px #1018281a',
  l: '0px 12px 16px -4px #10182814',
  xl: '0px 20px 24px -4px #10182814',
  '2xl': '0px 24px 48px -12px #1018282e',
  inner: '0px 2px 0px 0px #10182814',
} as const;
