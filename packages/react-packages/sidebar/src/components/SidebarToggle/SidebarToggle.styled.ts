import styled from '@emotion/styled';

import { IconButton } from '@dt-dds/react-icon-button';

interface SidebarToggleStyledProps {
  isSidebarCollapsed: boolean;
}

export const SidebarToggleStyled = styled(IconButton)<SidebarToggleStyledProps>`
  ${({ isSidebarCollapsed }) => `
    display: flex;
    align-items: center;
    justify-content: center;

    > i {
      transform: ${isSidebarCollapsed ? 'rotate(180deg)' : ''};
    }
  `}
`;
