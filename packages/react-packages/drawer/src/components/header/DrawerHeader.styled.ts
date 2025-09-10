import styled from '@emotion/styled';

export const HeaderStyled = styled.header`
  ${({ theme }) => `
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 ${theme.spacing.spacing_60} ${theme.spacing.spacing_50};

    &:has(+.hasScroll) {
      box-shadow: ${theme.shadows.elevation_100};
    }

    @media only screen and (min-width: ${theme.breakpoints.mq2}px) {
      padding: 0 ${theme.spacing.spacing_80} ${theme.spacing.spacing_50};
    }
  `}
`;
