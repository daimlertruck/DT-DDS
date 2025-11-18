import styled from '@emotion/styled';

import type { BarState } from '../../utils';

export interface AppNameContainerProps {
  state: BarState;
  hasAppNameAsSibling: boolean;
  isMobile: boolean;
}

export const AppNameContainer = styled.div<AppNameContainerProps>`
  ${({ state, hasAppNameAsSibling, isMobile }) => {
    const shouldUseAutoWidth = hasAppNameAsSibling && state.isCompact;

    const shouldAlignLeft = isMobile && state.isStandard;

    return `
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      ${shouldUseAutoWidth ? 'width: auto; min-width: auto;' : ''}
      ${shouldAlignLeft ? 'justify-content: flex-start;' : ''}
    `;
  }}
`;
