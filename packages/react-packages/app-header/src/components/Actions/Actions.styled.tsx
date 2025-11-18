import styled from '@emotion/styled';

import { Theme } from '@dt-dds/themes';

import { THIRD_WIDTH } from '../../constants';

import type { BarState } from '../../utils';

export interface ActionsContainerProps {
  state: BarState;
  isMobile: boolean;
  position?: 'left' | 'right';
}

/**
 * Determines the CSS position for Actions based on state.
 */
const getActionsPosition = (
  position: 'left' | 'right',
  state: BarState
): 'fixed' | 'relative' => {
  if (position === 'left') {
    return 'relative';
  }

  if (state.isNavRight) {
    return state.isStandard && state.hasAppName ? 'fixed' : 'relative';
  }

  return 'fixed';
};

/**
 * Determines the right offset for Actions based on state.
 */
const getActionsRight = (
  theme: Theme,
  isMobile: boolean,
  position: 'left' | 'right',
  state: BarState
): string | number => {
  if (position === 'left') {
    return 'auto';
  }

  const defaultRight = isMobile
    ? theme.spacing.spacing_30
    : theme.spacing.spacing_60;

  if (state.isNavRight) {
    return state.isStandard && state.hasAppName ? defaultRight : 0;
  }

  return defaultRight;
};

const getActionsMinWidth = (
  state: BarState,
  position: 'left' | 'right'
): string => {
  if (position === 'left') {
    return 'auto';
  }
  const { isNavLeft, isStandard, hasAppName } = state;
  return isNavLeft && isStandard && !hasAppName ? 'auto' : THIRD_WIDTH;
};

export const ActionsContainer = styled.div<ActionsContainerProps>`
  ${({ theme, state, isMobile, position = 'right' }) => {
    const cssPosition = getActionsPosition(position, state);
    const right = getActionsRight(theme, isMobile, position, state);
    const minWidth = getActionsMinWidth(state, position);
    const gap = isMobile ? theme.spacing.spacing_30 : theme.spacing.spacing_50;

    return `
      display: flex;
      align-items: center;
      position: ${cssPosition};
      right: ${right};
      min-width: ${minWidth};
      flex-direction: row;
      justify-content: ${position === 'left' ? 'flex-start' : 'flex-end'};
      gap: ${gap};
    `;
  }}
`;
