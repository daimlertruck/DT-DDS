import styled from '@emotion/styled';

import {
  HEADER_HEIGHT,
  NAVIGATION_HEIGHT,
  APP_HEADER_Z_INDEX,
} from '../../constants';

import type { HeaderState } from '../../utils';

export interface NavigationStyledProps {
  state: HeaderState;
}

const CENTERING_STYLES = {
  absoluteCenter: `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    max-width: calc(100% - 400px); // hardcoded value to avoid layout shift
    min-width: 0;
    overflow: hidden;
  `,
  autoMargins: `
    margin-left: auto;
    margin-right: auto;
  `,
} as const;

const shouldUseAbsoluteCenter = (state: HeaderState): boolean => {
  if (!state.isNavCenter) {
    return false;
  }
  // Use absolute centering for compact mode or standard mode without app name
  return state.isNavCompact || !state.hasAppName;
};

const getNavigationCenteringStyles = (state: HeaderState): string => {
  if (!shouldUseAbsoluteCenter(state)) {
    return state.isNavCenter ? CENTERING_STYLES.autoMargins : '';
  }
  return CENTERING_STYLES.absoluteCenter;
};

const getJustifyContent = (
  isAbsoluteCenter: boolean,
  isNavLeft: boolean,
  isNavRight: boolean
): string => {
  if (isAbsoluteCenter) {
    return 'center';
  }
  if (isNavLeft) {
    return 'flex-start';
  }
  if (isNavRight) {
    return 'flex-end';
  }
  return 'center';
};

export const NavigationStyled = styled.nav<NavigationStyledProps>`
  ${({ theme, state }) => {
    const { isStandard, hasAppName, isNavCompact, isNavLeft, isNavRight } =
      state;

    const isStandardAndHasAppName = isStandard && hasAppName;
    const isAbsoluteCenter = shouldUseAbsoluteCenter(state);

    const basePosition = isStandardAndHasAppName ? 'fixed' : 'relative';
    const baseTop = isNavCompact ? 0 : `${HEADER_HEIGHT}px`;
    const baseWidth = isNavCompact ? 'auto' : '100%';
    const minHeight = isNavCompact ? 'auto' : `${NAVIGATION_HEIGHT}px`;

    const position = isAbsoluteCenter ? 'absolute' : basePosition;
    const top = isAbsoluteCenter ? '50%' : baseTop;
    const left = isAbsoluteCenter ? '50%' : '0';
    const right = isAbsoluteCenter ? 'auto' : '0';
    const width = isAbsoluteCenter ? 'auto' : baseWidth;
    const justifyContent = getJustifyContent(
      isAbsoluteCenter,
      isNavLeft,
      isNavRight
    );

    const centeringStyles = getNavigationCenteringStyles(state);

    return `
      position: ${position};
      top: ${top};
      left: ${left};
      right: ${right};
      z-index: ${APP_HEADER_Z_INDEX};
      width: ${width};
      min-height: ${minHeight};
      height: auto;
      background-color: ${theme.palette.surface.contrast};
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: ${justifyContent};
      padding: 0 ${theme.spacing.spacing_60};

      ${centeringStyles}
    `;
  }}
`;
