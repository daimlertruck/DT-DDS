import styled from '@emotion/styled';

export const SidebarDividerStyled = styled.hr`
  ${({ theme }) => `
    height: 1px;
    margin: ${theme.spacing.spacing_0};
    border: none;
    background-color: ${theme.palette.border.default};
  `}
`;
