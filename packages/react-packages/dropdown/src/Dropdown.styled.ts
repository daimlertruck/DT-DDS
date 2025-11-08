import styled from '@emotion/styled';

export const DropdownStyled = styled.div`
  list-style-type: none;
  width: 100%;
  overflow: auto;

  ${({ theme }) => `
    padding: ${theme.spacing.spacing_50} ${theme.spacing.spacing_0};
    background-color: ${theme.palette.surface.contrast};
    border-radius: ${theme.shape.dropdown};
    border: 1px solid ${theme.palette.border.medium};
  `}
`;
