import styled from '@emotion/styled';

export const ContentStyled = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing.xs};
    overflow-y: auto;
    position: relative;

    @media only screen and (max-width: ${theme.breakpoints.mq32}px) {
      flex: 1;
      }
    `}
`;
