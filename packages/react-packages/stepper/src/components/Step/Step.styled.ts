import styled from '@emotion/styled';

import { Orientation } from '@dt-dds/react-core';

import {
  STEP_MIN_WIDTH,
  VERTICAL_STEP_INDICATOR_MIN_HEIGHT,
  VERTICAL_LAST_STEP_INDICATOR_MIN_HEIGHT,
} from '../../constants';

interface StepContainerProps {
  orientation?: Orientation;
  isLast?: boolean;
  isDisabled?: boolean;
}

export const StepContainer = styled.div<StepContainerProps>`
  display: flex;
  position: relative;
  overflow: visible;
  gap: 8px;

  ${({ orientation, isLast, isDisabled }) => {
    if (orientation === 'horizontal') {
      return `
        flex-direction: column;
        align-items: center;
        flex: 1 1 0;
        min-width: ${STEP_MIN_WIDTH}px;
      `;
    }

    return `
      flex-direction: row;
      padding-bottom: ${isLast ? '0' : '8px'};
      cursor: ${isDisabled ? 'not-allowed' : 'auto'};
    `;
  }}
`;

export const StepIndicatorWrapper = styled.div<StepContainerProps>`
  display: flex;
  position: relative;

  ${({ orientation, isLast }) => {
    if (orientation === 'horizontal') {
      return `
        width: 100%;
        flex-direction: row;
        justify-content: center;
      `;
    }

    return `
      flex-direction: column;
      align-self: flex-start;
      min-height: ${
        isLast
          ? `${VERTICAL_LAST_STEP_INDICATOR_MIN_HEIGHT}px`
          : `${VERTICAL_STEP_INDICATOR_MIN_HEIGHT}px`
      };
    `;
  }}
`;
