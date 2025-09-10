import { DROPDOWN_MENU_Z_INDEX } from '@dt-dds/react-core';
import styled from '@emotion/styled';

export const DropdownMenuStyled = styled.ul`
  ${({ theme }) => `
    background: ${theme.palette.surface.contrast};
    border: 1px solid ${theme.palette.border.default};
    border-radius: ${theme.shape.dropdown};
    width: 100%;
    padding:${theme.spacing.spacing_50} ${theme.spacing.spacing_0};
    margin: ${theme.spacing.spacing_20} ${theme.spacing.spacing_0};
    position: absolute;
    right: 0;
    z-index: ${DROPDOWN_MENU_Z_INDEX};
    max-height: 180px;
    overflow: auto;
  `}
`;
