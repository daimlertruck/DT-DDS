import { ChangeEvent, ComponentPropsWithRef, ReactNode } from 'react';

import { BaseProps, ComponentSize } from '@dt-dds/react-core';

export type CheckboxSize = Extract<ComponentSize, 'small' | 'large'>;

export interface CheckboxProps
  extends BaseProps,
    Omit<ComponentPropsWithRef<'input'>, 'size' | 'onChange'> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  hasError?: boolean;
  size?: CheckboxSize;
  label?: ReactNode;
  'aria-label'?: string;
}
