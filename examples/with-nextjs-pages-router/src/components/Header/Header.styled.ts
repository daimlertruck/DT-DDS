import styled from '@emotion/styled';
import { Link } from '@dt-dds/react';

export const HeaderStyled = styled.header`
  ${({ theme }) => `
    background: ${theme.colors.grey_00};
    padding: 0 1.5rem;
    z-index: 9;
  `}
`;

export const HeaderStyledLayout = styled.div`
  ${({ theme }) => `
    display: grid;
    align-items: center;
    grid-template-columns: auto;
    grid-template-rows: 1fr;
    
    @media only screen and (min-width: ${theme.breakpoints.mq3}px) {
      grid-template-columns: 1fr 1.5fr 1fr;
      grid-template-rows: 1fr;
      align-items: center;
    }
  `}
`;

export const LogoStyled = styled.div`
  ${({ theme }) => `
    display: none;
    text-align: center;

    a {
      display: flex;
      justify-content: center;
    }

    @media only screen and (min-width: ${theme.breakpoints.mq4}px) {
      img {
        width: 261px;
        height: 20px;
      }
    }

    @media only screen and (min-width: ${theme.breakpoints.mq3}px) {
      display: block;
    }
  `}
`;

export const BrandStyled = styled(Link)`
  &:hover > span {
    text-decoration: none;
  }
`;

export const NavigationStyled = styled.nav`
  ${({ theme }) => `
    display: none;

    @media only screen and (min-width: ${theme.breakpoints.mq4}px) {
      display: flex;
      gap: 1rem;
      grid-area: 2 / 2;
      justify-content: center;
      align-items: center;
      padding: 1rem 0;

      a {
        text-transform: capitalize;
        color: ${theme.palette.content.medium};
        ${theme.fontStyles.bodyLgRegular};
        
        &:hover {
          text-decoration: none;
          color: ${theme.palette.content.dark};
        }

        &[aria-current='page'] {
          color: ${theme.palette.content.dark};
          ${theme.fontStyles.bodyLgBold};
        } 
      }
    }
  `}
`;
