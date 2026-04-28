import styled from '@emotion/styled';

export const DrawerContentStyled = styled.section`
  ${({ theme }) => `
    position: relative;
    overflow: auto;
    padding: ${theme.spacing.spacing_50} ${theme.spacing.spacing_60} 0;
    background:
      linear-gradient(white 30%, rgba(255, 255, 255, 0)) center top,
      linear-gradient(rgba(255, 255, 255, 0), white 70%) center bottom,
      linear-gradient(${theme.palette.border.default}, ${theme.palette.border.default}) center top;
    background-size:
      100% 40px,
      100% 40px,
      100% 1px;
    background-repeat: no-repeat;
    background-attachment: local, local, scroll;

    @media only screen and (min-width: ${theme.breakpoints.mq3}px) {
      padding: ${theme.spacing.spacing_50} ${theme.spacing.spacing_70} 0;
    }
  `}
`;
