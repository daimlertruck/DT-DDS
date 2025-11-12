import styled from '@emotion/styled';

import { LOGO_MAX_HEIGHT } from '../../constants';

export interface LogoContainerProps {
  shouldCenterLogo: boolean;
}

export const LogoContainer = styled.div<LogoContainerProps>`
  ${({ shouldCenterLogo }) => {
    const centerLogoStyles = `
      width: auto;
      min-width: auto;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    `;

    return `
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      min-width: auto;
      height: auto;
      
      img,
      [data-nextjs-image],
      svg,
      > * {
        display: flex;
        max-height: ${LOGO_MAX_HEIGHT}px;
        width: auto;
        height: auto;
        object-fit: contain;
      }

      ${shouldCenterLogo ? centerLogoStyles : ''}
    `;
  }}
`;
