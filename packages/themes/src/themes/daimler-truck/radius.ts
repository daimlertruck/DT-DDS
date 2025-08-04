import { CustomTheme as Theme } from '../../types';

export const radius: Theme['radius'] = {
  none: '0px',
  '6xs': '2px',
  '5xs': '4px',
  '4xs': '8px',
  '3xs': '12px',
  '2xs': '16px',
  xs: '24px',
  s: '32px',
  m: '40px',
  l: '48px',
  xl: '56px',
  full: '100px',
} as const;
