import styled from '@emotion/styled';

export const EmptyStateContainerStyled = styled.div`
  container-type: inline-size;
  width: 100%;
  height: 100%;
`;

export const EmptyStateStyled = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing.spacing_70} ${theme.spacing.spacing_90};
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

    @container (min-width: ${theme.breakpoints.mq3}px) {
      padding: ${theme.spacing.spacing_90} ${theme.spacing.spacing_500};
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

      @container (min-width: ${theme.breakpoints.mq3}px) {
        gap: ${theme.spacing.spacing_40};
      }
  `}
`;
