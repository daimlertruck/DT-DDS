export const DrawerPosition = {
  Left: 'left',
  Right: 'right',
} as const;

export type DrawerPosition =
  (typeof DrawerPosition)[keyof typeof DrawerPosition];
