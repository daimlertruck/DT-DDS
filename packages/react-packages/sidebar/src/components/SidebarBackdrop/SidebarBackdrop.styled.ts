import styled from '@emotion/styled';

import { BACKDROP_Z_INDEX } from '@dt-dds/react-core';
import { hexToRgba } from '@dt-dds/themes';

export interface SidebarBackdropStyledProps {
  isOpen: boolean;
}

export const SidebarBackdropStyled = styled.div<SidebarBackdropStyledProps>`
  ${({ theme, isOpen }) => {
    if (!isOpen) {
      return 'display: none;';
    }

    return `
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: ${hexToRgba(theme.palette.surface.dark, 0.2)};
      z-index: ${BACKDROP_Z_INDEX};
      overflow: hidden;
    `;
  }}
`;
