import { ChevronProps } from 'react-day-picker';

import styled from '@emotion/styled';

export const ChevronStyled = styled.div<ChevronProps>`
  display: flex;

  ${({ disabled, theme }) =>
    !disabled &&
    `
      &:hover {
        background-color: ${theme.palette.accent.light};
      }
    `}

  > i {
    color: inherit;
  }
`;
