import { ReactNode } from 'react';

import { BaseProps, Orientation } from '@dt-dds/react-core';

export type StepVariant = 'number' | 'bullet' | 'icon';
export type StepState =
  | 'completed'
  | 'warning'
  | 'error'
  | 'disabled'
  | 'incomplete';

export interface StepperProps extends BaseProps {
  orientation?: Orientation;
  variant?: StepVariant;
  activeStep?: number;
}

export interface StepProps extends BaseProps {
  index?: number;
  title?: string;
  description?: string;
  state?: StepState;
  isActive?: boolean;
  variant?: StepVariant;
  icon?: ReactNode;
  isLast?: boolean;
  orientation?: Orientation;
}
