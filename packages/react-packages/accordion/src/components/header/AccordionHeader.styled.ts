import styled from '@emotion/styled';

export const HeaderStyled = styled.header`
  ${({ theme }) => `
    ${theme.fontStyles.h6Bold};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.spacing.spacing_30};
    padding: ${theme.spacing.spacing_50};
    cursor: pointer;
    user-select: none;
    color: ${theme.palette.surface.dark};

    &:focus-visible {
      outline: 2px solid ${theme.palette.primary.default};
    }
  `}
`;
