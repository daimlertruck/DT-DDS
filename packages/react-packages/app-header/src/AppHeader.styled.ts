import styled from '@emotion/styled';

import {
  APP_HEADER_Z_INDEX,
  HEADER_HEIGHT,
  HEADER_HEIGHT_MOBILE,
} from './constants';

export interface AppHeaderStyledProps {
  isMobile: boolean;
}

export const AppHeaderStyled = styled.header<AppHeaderStyledProps>`
  ${({ theme, isMobile }) => {
    const paddingHorizontal = theme.spacing.spacing_60;
    const gap = theme.spacing.spacing_50;

    return `
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${gap};
      width: 100%;
      height: ${isMobile ? `${HEADER_HEIGHT_MOBILE}px` : `${HEADER_HEIGHT}px`};
      overflow: hidden;
      padding: 0 ${paddingHorizontal};
      position: fixed;
      top: 0;
      z-index: ${APP_HEADER_Z_INDEX};
      background: ${theme.palette.surface.contrast};
    `;
  }}
`;
