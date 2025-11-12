import styled from '@emotion/styled';

import { THIRD_WIDTH, LOGO_MAX_HEIGHT } from '../../constants';

import type { BarState } from '../../utils';

export interface LogoContainerProps {
  state: BarState;
  shouldCenterLogo: boolean;
  hasAppNameAsSibling: boolean;
}

const getLogoMinWidth = (
  state: BarState,
  hasAppNameAsSibling: boolean
): string => {
  const { isNavLeft, isCompact, isStandard, hasAppName } = state;

  if (hasAppNameAsSibling && isCompact) {
    return 'auto';
  }

  if ((isNavLeft && isCompact) || (isNavLeft && isStandard && !hasAppName)) {
    return 'auto';
  }

  return THIRD_WIDTH;
};

export const LogoContainer = styled.div<LogoContainerProps>`
  ${({ state, shouldCenterLogo, hasAppNameAsSibling }) => {
    const minWidth = getLogoMinWidth(state, hasAppNameAsSibling);

    const commonStyles = `
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      height: auto;
    `;

    const imageStyles = `
      img,
      [data-nextjs-image],
      svg,
      > * {
        display: flex;
        max-height: ${LOGO_MAX_HEIGHT};
        width: auto;
        height: auto;
        object-fit: contain;
      }
    `;

    if (shouldCenterLogo) {
      return `
        ${commonStyles}
        width: auto;
        min-width: auto;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        ${imageStyles}
      `;
    }

    return `
      ${commonStyles}
      min-width: ${minWidth};
      ${imageStyles}
    `;
  }}
`;
