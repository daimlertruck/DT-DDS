import styled from '@emotion/styled';

interface RowStyledProps {
  selectableRow: boolean;
}

export const RowStyled = styled.tr<RowStyledProps>`
  ${({ theme, selectableRow }) => `
    display: table-row;
    border-radius: ${theme.radius.radius_0};
    box-shadow: ${theme.shadows.none};
    padding: ${theme.spacing.spacing_0};
    width: 100%;
    background-color: ${theme.palette.surface.contrast};
    cursor: ${selectableRow ? 'pointer' : 'auto'};
  `}
`;
