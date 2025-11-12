import styled from '@emotion/styled';

import { Orientation } from '@dt-dds/react-core';

interface StepperStyledProps {
  orientation?: Orientation;
}

export const StepperStyled = styled.ul<StepperStyledProps>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  list-style: none;

  ${({ theme, orientation = 'vertical' }) => `
    @media only screen and (min-width: ${theme.breakpoints.mq3d}px) {
      flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'}
    }
  `}
`;
