import { TOOLTIP_Z_INDEX } from '@dt-dds/react-core';
import styled from '@emotion/styled';

import {
  TooltipDirection,
  OTooltipDirection,
  TooltipBackground,
  OTooltipBackground,
} from '../../constants';

interface TooltipContentStyledProps {
  direction: TooltipDirection;
  background: TooltipBackground;
  top: number;
  left: number;
}

export const TooltipContentStyled = styled.div<TooltipContentStyledProps>`
  ${({ theme, direction, top, left, background }) => `
    ${theme.fontStyles.bodySmRegular};
    width: max-content;
    max-width: calc(200px + 2 * ${theme.spacing.spacing_30});
    overflow-wrap: break-word;
    padding: ${theme.spacing.spacing_30};
    background-color: ${theme.palette.secondary.dark};
    box-shadow: ${theme.shadows.elevation_200};
    color: ${theme.palette.content.contrast};
    border-radius: ${theme.shape.tooltip};
    text-align: left;
    white-space: initial;
    position: absolute;
    z-index: ${TOOLTIP_Z_INDEX}; 
    top: ${top}px;
    left: ${left}px;
    
    &:after {
      content: "";
      position: absolute;
      border: 0px solid transparent;
    }
    ${background === OTooltipBackground.Opacity && 'opacity: 80%'};
    ${
      direction === OTooltipDirection.Bottom &&
      `
      transform: translateX(-50%);
        &:after {
          bottom: 100%;
          left: 50%;
          margin-left: -7px;
          border-width: 0px 7px 8px 7px;
          border-bottom-color: ${theme.palette.secondary.dark};
        }
      `
    };
    ${
      direction === OTooltipDirection.Top &&
      `
        transform: translate(-50%, -100%);
        &:after {
          top: 100%;
          left: 50%;
          margin-left: -7px;
          border-width: 8px 7px 0px 7px;
          border-top-color: ${theme.palette.secondary.dark};
        }
      `
    };
    ${
      direction === OTooltipDirection.Right &&
      `
        transform: translateY(-50%);
        &:after {
          top: 50%;
          right: 100%;
          margin-top: -7px;
          border-width: 7px 8px 7px 0px;
          border-right-color: ${theme.palette.secondary.dark};
        }
      `
    };
    ${
      direction === OTooltipDirection.Left &&
      `
        transform: translate(-100%, -50%);
        
        &:after {
          top: 50%;
          left: 100%;
          margin-top: -7px;
          border-width: 7px 0px 7px 8px;
          border-left-color: ${theme.palette.secondary.dark};
        }
      `
    }
  `}
`;
