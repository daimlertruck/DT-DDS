import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { BaseProps, DRAWER_Z_INDEX } from '@dt-dds/react-core';

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
    background-color: ${theme.palette.surface.dark};
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
    background-color: ${theme.palette.surface.contrast};
    transform: ${isVisible ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform ${theme.animations.emphasizedDecelerate.duration}
      ${theme.animations.emphasizedDecelerate.timingFunction};

    @media only screen and (min-width: ${theme.breakpoints.mq2}px) {
      width: 500px;
      border-radius: ${theme.radius.radius_40} ${theme.radius.radius_0}
        ${theme.radius.radius_0} ${theme.radius.radius_40};
      box-shadow: ${theme.shadows.elevation_200};
      padding: ${theme.spacing.s} 0;
    }
  `}
`;
