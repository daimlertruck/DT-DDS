import styled from '@emotion/styled';

import { StepState, StepVariant } from '../../types';

interface StepIndicatorStyledProps {
  state: StepState;
  isActive?: boolean;
  variant: StepVariant;
}

export const StepIndicatorStyled = styled.div<StepIndicatorStyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  ${({ theme, state, isActive, variant }) => {
    const activeBgColor = isActive
      ? theme.palette.primary.light
      : theme.palette.content.contrast;

    const colorMap: Record<
      string,
      { bg: string; border: string; text?: string }
    > = {
      completed: {
        bg: theme.palette.primary.default,
        border: theme.palette.primary.default,
      },
      warning: {
        bg: theme.palette.warning.default,
        border: 'transparent',
      },
      error: {
        bg: theme.palette.error.default,
        border: 'transparent',
      },
      disabled: {
        bg: theme.palette.content.contrast,
        border: theme.palette.border.medium,
        text: theme.palette.content.light,
      },
      incomplete: {
        bg: activeBgColor,
        border: theme.palette.primary.default,
        text: theme.palette.primary.default,
      },
    };

    const colors = colorMap[state] || colorMap.incomplete;

    const disabledBorderColor =
      state === 'disabled'
        ? theme.palette.border.medium
        : theme.palette.primary.default;

    if (
      variant === 'bullet' &&
      (state === 'incomplete' || state === 'disabled')
    ) {
      return `
        background-color: ${activeBgColor};
        border: 1px solid ${disabledBorderColor};
        
        &::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${
            state === 'disabled'
              ? theme.palette.content.light
              : theme.palette.primary.default
          };
        }
      `;
    }

    if (variant === 'icon' && state === 'disabled') {
      return `
        border: 1px solid ${disabledBorderColor};
        
        > i {
          color: ${theme.palette.content.light};
        }
      `;
    }

    return `
      background-color: ${colors.bg};
      border: 1px solid ${colors.border};
      color: ${colors.text};
      ${theme.fontStyles.bodySmBold}
    `;
  }}
`;
