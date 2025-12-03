import styled from '@emotion/styled';

import { Orientation } from '@dt-dds/react-core';

interface StepperStyledProps {
  orientation?: Orientation;
}

export const StepperStyled = styled.div<StepperStyledProps>`
  display: flex;

  ${({ orientation = 'vertical' }) => `
    flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'};
    width: ${orientation === 'horizontal' ? '100%' : 'fit-content'};
    align-items: stretch;
  `}
`;
