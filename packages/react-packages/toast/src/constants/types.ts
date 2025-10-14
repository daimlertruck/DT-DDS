import { BaseProps } from '@dt-dds/react-core';
import { TooltipBackground } from '@dt-dds/react-tooltip';

export interface Action extends Pick<BaseProps, 'dataTestId'> {
  onClick: () => void;
  label: string;
  tooltip?: {
    message: string;
    background?: TooltipBackground;
  };
}
