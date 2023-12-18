import styled from '@emotion/styled';

import { BACKDROP_Z_INDEX } from '../../constants';

import { BackdropType } from './constants';

const opacityType = {
  dark: '0.85',
  light: '0.2',
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
      background-color: ${theme.colors.grey_90};
      opacity: ${opacityType[type]};
      z-index: ${BACKDROP_Z_INDEX};
    `}
`;
