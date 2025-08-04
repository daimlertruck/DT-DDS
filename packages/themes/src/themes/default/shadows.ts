const shadowBase = '16, 20, 40';

export const shadows = {
  none: 'none',
  xs: `0px 1px 2px 0px rgba(${shadowBase}, 0.05)`,
  s: `0px 1px 3px 0px rgba(${shadowBase}, 0.1)`,
  m: `0px 4px 8px -2px rgba(${shadowBase}, 0.1)`,
  l: `0px 12px 16px -4px rgba(${shadowBase}, 0.08)`,
  xl: `0px 20px 24px -4px rgba(${shadowBase}, 0.08)`,
  '2xl': `0px 24px 48px -12px rgba(${shadowBase}, 0.18)`,
  inner: `0px 2px 4px 0px rgba(${shadowBase}, 0.08)`,
  // Legacy
  0: 'none',
  0.5: '1px 1px 3px 1px rgba(0, 0, 0, 0.1)',
  1: '1px 4px 4px rgba(0, 0, 0, 0.2)',
  2: '0px 5px 10px rgba(0, 0, 0, 0.12)',
  3: '0px 8px 30px rgba(0, 0, 0, 0.24)',
  4: '4px 4px 10px rgba(0, 0, 0, 0.2)',
  5: '0px 3px 3px rgba(0, 0, 0, 0.15)',
};
