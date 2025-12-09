import styled from '@emotion/styled';

import {
  SIDEBAR_DEFAULT_OFFSET_TOP,
  SIDEBAR_DEFAULT_TRANSITION,
} from './constants';
import { calculateSidebarPosition, calculateSidebarWidth } from './utils';

import type { SidebarPlacement } from './types';

export interface SidebarStyledProps {
  isMobile: boolean;
  isExpanded: boolean;
  offsetTop: number;
  placement: SidebarPlacement;
}

export const SidebarStyled = styled.aside<SidebarStyledProps>`
  ${({ theme, isExpanded, isMobile, offsetTop, placement }) => {
    const height = isMobile ? SIDEBAR_DEFAULT_OFFSET_TOP : offsetTop;

    const width = calculateSidebarWidth(isMobile, isExpanded);

    const sidebarPositionValue = calculateSidebarPosition(isMobile, isExpanded);

    const transitionAnimation = SIDEBAR_DEFAULT_TRANSITION;

    return `
      position: fixed;
      display: flex;
      flex-direction: column;
      height: calc(100% - ${height}px);
      width: ${width}px;
      background-color: ${theme.palette.surface.contrast};
      overflow: hidden;
      top: ${offsetTop}px;
      transition: ${transitionAnimation};
      ${placement}: ${sidebarPositionValue}px;

      ${
        placement === 'right'
          ? `border-left: 1px solid ${theme.palette.border.default};`
          : `border-right: 1px solid ${theme.palette.border.default};`
      }
    `;
  }}
`;
