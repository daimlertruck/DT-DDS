import styled from '@emotion/styled';

import { Orientation } from '@dt-dds/react-core';

import {
  VERTICAL_TRAIL_LINE_MIN_HEIGHT,
  HORIZONTAL_TRAIL_LINE_MIN_WIDTH,
  HORIZONTAL_TRAIL_LINE_START_OFFSET,
  VERTICAL_TRAIL_LINE_TOP_OFFSET,
  VERTICAL_TRAIL_LINE_LEFT_OFFSET,
} from '../../constants';
import { StepState } from '../../types';

interface TrailLineProps {
  state: StepState;
  orientation?: Orientation;
}

export const TrailLineStyled = styled.span<TrailLineProps>`
  position: absolute;
  transition: background-color 0.3s ease;

  ${({ state, orientation, theme }) => {
    const color =
      state === 'completed'
        ? `${theme.palette.primary.default}`
        : `${theme.palette.primary.light}`;

    if (orientation === 'horizontal') {
      return `
        top: 50%;
        transform: translateY(-50%);
        left: calc(50% + ${HORIZONTAL_TRAIL_LINE_START_OFFSET}px);
        right: calc(-50% + ${HORIZONTAL_TRAIL_LINE_START_OFFSET}px);
        min-width: ${HORIZONTAL_TRAIL_LINE_MIN_WIDTH}px;
        height: ${state === 'completed' ? '2px' : '1px'};
        background-color: ${color};
      `;
    }

    return `
      top: ${VERTICAL_TRAIL_LINE_TOP_OFFSET}px;
      left: ${VERTICAL_TRAIL_LINE_LEFT_OFFSET}px;
      width: ${state === 'completed' ? '2px' : '1px'};
      min-height: ${VERTICAL_TRAIL_LINE_MIN_HEIGHT}px;
      background-color: ${color};
    `;
  }}
`;
