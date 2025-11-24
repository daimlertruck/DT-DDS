import { ReactNode } from 'react';

export type SelectOptionValue = {
  value: string;
  isDisabled?: boolean;
  label?: ReactNode;
};

export type SelectVariant = 'outlined' | 'bottom-line';

export type SelectFill = 'default' | 'contrast' | 'light';
