import { BaseProps } from '@dt-dds/react-core';

export type RadioDirection = 'column' | 'row';

export type RadioSize = 'large' | 'small';

export interface RadioGroupProps extends BaseProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  direction?: RadioDirection;
  size?: RadioSize;
}

export interface RadioProps {
  label?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isChecked?: boolean;
  isDisabled?: boolean;
  name?: string;
  hasError?: boolean;
  size?: RadioSize;
  dataTestId?: string;
  isDefaultChecked?: boolean;
}
