import styled from '@emotion/styled';

export const DrawerContentStyled = styled.section`
  ${({ theme }) => `
    position: relative;
    overflow: auto;
    padding:  ${theme.spacing.spacing_50} ${theme.spacing.xs} 0;
    
    @media only screen and (min-width: ${theme.breakpoints.mq32}px) {
      padding:  ${theme.spacing.spacing_50} ${theme.spacing.s} 0;
    }
  `}
`;

export const ScrollableSectionObserverStyled = styled.div`
  position: absolute;
  margin-top: ${({ theme }) => theme.spacing.spacing_30};
`;
