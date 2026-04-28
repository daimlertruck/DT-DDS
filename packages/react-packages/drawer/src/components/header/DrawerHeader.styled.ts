import styled from '@emotion/styled';

export const HeaderStyled = styled.header`
  ${({ theme }) => `
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 ${theme.spacing.spacing_60} ${theme.spacing.spacing_50};

    @media only screen and (min-width: ${theme.breakpoints.mq3}px) {
      padding: 0 ${theme.spacing.spacing_70} ${theme.spacing.spacing_50};
    }
  `}
`;
