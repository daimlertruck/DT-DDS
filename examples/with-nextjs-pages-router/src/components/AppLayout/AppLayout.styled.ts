import styled from '@emotion/styled';

export const MainStyled = styled.main`
  ${({ theme }) => `
    background-color: ${theme.palette.surface.light};
    color: ${theme.palette.content.dark};
    min-height: 100vh;
  `}
`;

export const ContainerStyled = styled.div`
  ${({ theme }) => `
    width: 90%;
    max-width: ${theme.breakpoints.mq5}px;
    margin: 50px auto;
  `}
`;
