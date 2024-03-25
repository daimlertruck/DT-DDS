import { BaseProps, DRAWER_Z_INDEX } from '@dt-ui/react-core';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface DrawerBaseProps extends BaseProps {
  isVisible: boolean;
}

export const GlobalStyle = css`
  body {
    overflow: hidden;
  }
`;

export const MainContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${DRAWER_Z_INDEX};
`;

export const OverlayStyled = styled.div<DrawerBaseProps>`
  ${({ theme, isVisible }) => `
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: ${theme.palette.base.dark};
    opacity: ${isVisible ? 0.2 : 0};
    transition: opacity ${theme.animations.emphasizedDecelerate.duration}
      ${theme.animations.emphasizedDecelerate.timingFunction};
  `}
`;

export const DrawerStyled = styled.div<DrawerBaseProps>`
  ${({ theme, isVisible }) => `
    display: grid;
    grid-template-rows: auto 1fr;
    padding: ${theme.spacing.xs} 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${theme.palette.base.default};
    transform: ${isVisible ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform ${theme.animations.emphasizedDecelerate.duration}
      ${theme.animations.emphasizedDecelerate.timingFunction};

    @media only screen and (min-width: ${theme.breakpoints.s}) {
      width: 500px;
      border-radius: ${theme.radius['3xs']} ${theme.radius.none}
        ${theme.radius.none} ${theme.radius['3xs']};
      box-shadow: ${theme.shadows.s};
      padding: ${theme.spacing.s} 0;
    }
  `}
`;
