import styled from '@emotion/styled';

import {
  APP_NAME_MAX_HEIGHT,
  APP_NAME_MAX_WIDTH,
  APP_NAME_MAX_WIDTH_DESKTOP,
} from '../../constants';

import type { HeaderState } from '../../utils';

export interface AppNameContainerProps {
  state: HeaderState;
  isMobile: boolean;
}

export const AppNameContainer = styled.div<AppNameContainerProps>`
  ${({ theme, state, isMobile }) => {
    const shouldAlignLeft = isMobile && state.isStandard;

    return `
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      min-width: auto;
      width: auto;
      max-width: ${APP_NAME_MAX_WIDTH}px;
      max-height: ${APP_NAME_MAX_HEIGHT}px;
      
      ${shouldAlignLeft ? 'justify-content: flex-start;' : ''}

      @media screen and (min-width: ${theme.breakpoints.mq3}px) {
        max-width: ${APP_NAME_MAX_WIDTH_DESKTOP}px;
      }
      
      > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
     
    `;
  }}
`;
