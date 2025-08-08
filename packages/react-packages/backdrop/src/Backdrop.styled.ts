import { BACKDROP_Z_INDEX } from '@dt-dds/react-core';
import { hexToRgba } from '@dt-dds/themes';
import styled from '@emotion/styled';

import { BackdropType } from './constants';

const opacityType = {
  dark: 0.85,
  light: 0.2,
};

export interface BackdropStyledProps {
  type: BackdropType;
}

export const BackdropStyled = styled.div<BackdropStyledProps>`
  ${({ theme, type }) =>
    `
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${hexToRgba(theme.palette.surface.dark, opacityType[type])};
      z-index: ${BACKDROP_Z_INDEX};
    `}
`;
