import styled from '@emotion/styled';

export const SidebarContentStyled = styled.div<{ isSidebarCollapsed: boolean }>`
  ${({ theme, isSidebarCollapsed }) => {
    return `
      position: relative;
      display: block;
      flex: 1 1 auto;
      overflow-x: hidden;
      overflow-y: overlay;
      scrollbar-width: ${isSidebarCollapsed ? 'none' : 'thin'};
      scrollbar-color: ${theme.palette.border.default} transparent;
    `;
  }}
`;
