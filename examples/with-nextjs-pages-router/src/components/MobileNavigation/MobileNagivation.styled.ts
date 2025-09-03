import styled from '@emotion/styled';

export const MobileNavigationStyled = styled.nav`
  ${({ theme }) => `
    display: flex;

    @media only screen and (min-width: ${theme.breakpoints.mq4}px) {
      display: none;
    }
  `}
`;

interface NavigationMenuStyledProps {
  isOpen: boolean;
}

export const NavigationMenuStyled = styled.div<NavigationMenuStyledProps>`
  ${({ theme, isOpen }) => `
    position: fixed;
    inset: 0;
    z-index: 9;
    background: ${theme.colors.grey_120};
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 0;
    transform: translateY(${isOpen ? '0' : '-100%'});
    transition: transform 0.2s ease-in-out;
    overflow: hidden;

    @media only screen and (min-width: ${theme.breakpoints.mq4}px) {
      display: none;
    }
  `}
`;

export const LinkStyled = styled.div`
  ${({ theme }) => `
    ${theme.fontStyles.body2};
    border-bottom: 1px solid ${theme.colors.grey_40};
    width: 100%;
    
    a {
      display: block;
      padding: 1.5rem;
      color: ${theme.colors.grey_00};
      font-weight: 400;
      width: 100%;
      height: 100%;

      &:hover {
        text-decoration: none;
        color: ${theme.colors.grey_50};
      }

      &[aria-current='page'] {
        font-weight: 700;
      } 
    }

    :last-child {
      border-bottom: none;
    }
  `}
`;
