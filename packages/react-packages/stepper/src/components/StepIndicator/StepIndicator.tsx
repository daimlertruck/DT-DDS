import { ReactNode } from 'react';

import { useTheme } from '@emotion/react';

import { Code } from '@dt-dds/icons';
import { Icon } from '@dt-dds/react-icon';

import { StepIndicatorStyled } from './StepIndicator.styled';
import { StepState, StepVariant } from '../../types';

interface StepIndicatorProps {
  index: number;
  state: StepState;
  variant: StepVariant;
  isActive?: boolean;
  icon?: ReactNode;
}

export const StepIndicator = ({
  index,
  state,
  variant,
  isActive,
  icon,
}: StepIndicatorProps) => {
  const theme = useTheme();

  const getIndicatorContent = () => {
    const iconMap: Partial<Record<StepState, Code>> = {
      completed: 'check',
      warning: 'warning',
      error: 'error',
    };

    if (iconMap[state]) {
      return (
        <Icon
          code={iconMap[state]}
          color={theme.palette.content.contrast}
          size='small'
        />
      );
    }

    if (variant === 'bullet') {
      return null;
    }

    if (variant === 'icon' && icon) {
      return icon;
    }

    return index + 1;
  };

  return (
    <StepIndicatorStyled
      data-testid='step-indicator'
      isActive={isActive}
      state={state}
      variant={variant}
    >
      {getIndicatorContent()}
    </StepIndicatorStyled>
  );
};
