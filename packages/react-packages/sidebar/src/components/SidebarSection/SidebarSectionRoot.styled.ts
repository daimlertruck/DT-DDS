import styled from '@emotion/styled';

import {
  SIDEBAR_HEADER_HEIGHT,
  SIDEBAR_HEADER_HEIGHT_MOBILE,
} from '../../constants';

import type { SectionVariant } from '../../types';

export const SidebarSectionRoot = styled.section<{
  variant: SectionVariant;
  firstItemHasIcon: boolean;
  isSidebarCollapsed: boolean;
}>`
  ${({ theme, variant, isSidebarCollapsed, firstItemHasIcon }) => {
    const shouldHide = isSidebarCollapsed && !firstItemHasIcon;

    return `
      display: ${shouldHide ? 'none' : 'flex'};
      flex-direction: column;
      margin: 0;
      padding: ${theme.spacing.spacing_50} ${theme.spacing.spacing_0};
      
      ul {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      ${
        variant === 'header' &&
        `
        height: ${SIDEBAR_HEADER_HEIGHT}px;
        justify-content: center;
        overflow: hidden;

        @media (min-width: ${theme.breakpoints.mq3}px) {
          height: ${SIDEBAR_HEADER_HEIGHT_MOBILE}px;
        }
      `
      }
    `;
  }}
`;
