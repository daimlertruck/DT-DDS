import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DRAWER_Z_INDEX } from '@dt-dds/react-core';

import { DrawerPosition } from './constants';

interface DrawerTransientProps {
  $isVisible: boolean;
  $position?: DrawerPosition;
}

export const GlobalStyle = css`
  body {
    overflow: hidden;
  }
`;

export const MainContainerStyled = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${DRAWER_Z_INDEX};
`;

export const OverlayStyled = styled.div<DrawerTransientProps>`
  position: absolute;
  inset: 0;

  ${({ theme, $isVisible }) => `
    background-color: ${theme.palette.surface.dark};
    opacity: ${$isVisible ? 0.2 : 0};
    transition: opacity ${theme.animations.emphasizedDecelerate.duration}
      ${theme.animations.emphasizedDecelerate.timingFunction};
  `}
`;

export const DrawerStyled = styled.div<DrawerTransientProps>`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  ${({ theme, $isVisible, $position }) => {
    const isPositionRight = $position === DrawerPosition.Right;
    const hiddenTranslateX = isPositionRight ? '100%' : '-100%';

    return `
      ${isPositionRight ? 'right: 0;' : 'left: 0;'}
      padding: ${theme.spacing.spacing_70} 0;
      background-color: ${theme.palette.surface.contrast};
      transform: translateX(${$isVisible ? '0' : hiddenTranslateX});
      transition: transform ${theme.animations.emphasizedDecelerate.duration}
        ${theme.animations.emphasizedDecelerate.timingFunction};

      @media only screen and (min-width: ${theme.breakpoints.mq3}px) {
        width: 500px;
        ${isPositionRight ? 'border-left' : 'border-right'}: 1px solid ${
      theme.palette.border.default
    };
      }
    `;
  }}
`;
