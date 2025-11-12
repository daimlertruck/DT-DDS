import styled from '@emotion/styled';

import { Colors } from '@dt-dds/react-core';

export const StepStyled = styled.li`
  display: flex;
  gap: 12px;
  align-items: center;
`;

interface LabelStyledProps {
  color: Colors | 'disabled';
}

export const LabelStyled = styled.span<LabelStyledProps>`
  ${({ theme, color }) => `
    ${theme.fontStyles.bodyMdRegularSmall};
    color: ${
      color === 'disabled'
        ? theme.palette.content.light
        : theme.palette[color].default
    };
  `}
`;
