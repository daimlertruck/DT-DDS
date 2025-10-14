import { BaseProps } from '@dt-dds/react-core';

export interface Action extends Pick<BaseProps, 'dataTestId'> {
  onClick: () => void;
  label: string;
}
