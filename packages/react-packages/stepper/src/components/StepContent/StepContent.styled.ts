import styled from '@emotion/styled';

import { Orientation } from '@dt-dds/react-core';

import { STEP_CONTENT_MAX_WIDTH } from '../../constants';
import { StepState } from '../../types';

interface StepContentStyledProps {
  orientation?: Orientation;
}

interface StepContentTextStyledProps {
  state: StepState;
  isActive?: boolean;
}

export const StepContentStyled = styled.div<StepContentStyledProps>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: ${STEP_CONTENT_MAX_WIDTH}px;

  & > * {
    min-width: 0;
    max-width: 100%;
  }

  ${({ orientation }) =>
    orientation === 'horizontal'
      ? `
        align-items: center;
        text-align: center;
      `
      : `
        align-items: flex-start;
        text-align: left;
        padding-top: 4px;
      `}
`;

export const StepTitleStyled = styled.span<StepContentTextStyledProps>`
  ${({ theme, state, isActive }) => {
    const getColor = () => {
      if (state === 'disabled') return theme.palette.content.light;
      if (state === 'error') return theme.palette.error.default;
      return theme.palette.content.dark;
    };

    return `
      ${isActive ? theme.fontStyles.bodyMdBold : theme.fontStyles.bodyMdRegular}
      color: ${getColor()};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
  }}
`;

export const StepDescriptionStyled = styled.span<StepContentTextStyledProps>`
  ${({ theme, state }) => {
    const getColor = () => {
      if (state === 'disabled') return theme.palette.content.light;
      if (state === 'error') return theme.palette.error.default;
      if (state === 'warning') return theme.palette.content.default;
      return theme.palette.primary.medium;
    };

    return `
      ${theme.fontStyles.bodySmRegular}
      color: ${getColor()};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
  }}
`;
