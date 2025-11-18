import styled from '@emotion/styled';

import { TABLE_HEADER_Z_INDEX } from '@dt-dds/react-core';

interface TableHeadStyledProps {
  hasFixedHeader?: boolean;
}

export const TableHeadStyled = styled.thead<TableHeadStyledProps>`
  ${({ theme, hasFixedHeader }) => `
    display: table-header-group;
    ${
      hasFixedHeader &&
      `
        position: sticky;
        top: 0;
        background-color: ${theme.palette.surface.contrast};
        z-index: ${TABLE_HEADER_Z_INDEX};
        box-shadow: ${theme.shadows.xs};
      `
    }
`}
`;
