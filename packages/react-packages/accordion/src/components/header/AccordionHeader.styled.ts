import styled from '@emotion/styled';

export const HeaderStyled = styled.header`
  ${({ theme }) => `
    ${theme.fontStyles.h6Bold};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.spacing['4xs']};
    padding: ${theme.spacing['2xs']};
    cursor: pointer;
    user-select: none;
    color: ${theme.palette.surface.dark};

    &:focus-visible {
      outline: 2px solid ${theme.palette.primary.default};
    }
  `}
`;
