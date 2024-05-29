import { Orientation } from '@dt-ui/react-core';
import styled from '@emotion/styled';

interface StepperStyledProps {
  orientation?: Orientation;
}

export const StepperStyled = styled.ul<StepperStyledProps>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  list-style: none;

  ${({ theme, orientation = 'vertical' }) => `
    @media only screen and (min-width: ${theme.breakpoints.md}) {
      flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'}
    }
  `}
`;
