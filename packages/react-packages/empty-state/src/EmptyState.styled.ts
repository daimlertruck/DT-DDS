import styled from '@emotion/styled';

export const EmptyStateStyled = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing.l} ${theme.spacing.s};
    background-color: ${theme.palette.surface.light};
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${theme.shape.emptyState};
    border: 1px dashed ${theme.palette.border.default};
    width: 100%;
    height: 100%;
    gap: ${theme.spacing.xs};
    
    @media only screen and (min-width: ${theme.breakpoints.mq32}px) {
      padding: ${theme.spacing.spacing_200} ${theme.spacing.spacing_500};
    }
  `}
`;

export const EmptyStateContentStyled = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${({ theme }) => `
      gap: ${theme.spacing.spacing_30};

      @media only screen and (min-width: ${theme.breakpoints.mq32}px) {
        gap: ${theme.spacing.spacing_40};
      }
  `}
`;
