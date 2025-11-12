import styled from '@emotion/styled';

import { Theme } from '@dt-dds/themes';

import { THIRD_WIDTH } from '../../constants';

import type { HeaderState } from '../../utils';

export interface ActionsContainerProps {
  state: HeaderState;
  isMobile: boolean;
  position?: 'left' | 'right';
}

/**
 * Determines the CSS position for Actions based on state.
 */
const getActionsPosition = (
  position: 'left' | 'right',
  state: HeaderState
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
  position: 'left' | 'right',
  state: HeaderState
): string | number => {
  if (position === 'left') {
    return 'auto';
  }

  const defaultRight = theme.spacing.spacing_60;

  if (state.isNavRight) {
    return state.isStandard && state.hasAppName ? defaultRight : 0;
  }

  return defaultRight;
};

const getActionsMinWidth = (
  state: HeaderState,
  position: 'left' | 'right'
): string => {
  if (position === 'left') {
    return 'auto';
  }
  const { isNavLeft, isStandard, hasAppName } = state;
  return isNavLeft && isStandard && !hasAppName ? 'auto' : THIRD_WIDTH;
};

export const ActionsContainer = styled.div<ActionsContainerProps>`
  ${({ theme, state, position = 'right' }) => {
    const cssPosition = getActionsPosition(position, state);
    const right = getActionsRight(theme, position, state);
    const minWidth = getActionsMinWidth(state, position);

    return `
      display: flex;
      align-items: center;
      position: ${cssPosition};
      right: ${right};
      min-width: ${minWidth};
      flex-direction: row;
      justify-content: ${position === 'left' ? 'flex-start' : 'flex-end'};
      gap: ${theme.spacing.spacing_50};
    `;
  }}
`;
