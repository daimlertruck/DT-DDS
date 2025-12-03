import { Orientation } from '@dt-dds/react-core';

import { TrailLineStyled } from './TrailLine.styled';
import { StepState } from '../../types';

interface TrailLineProps {
  state: StepState;
  orientation?: Orientation;
}

export const TrailLine = ({ state, orientation }: TrailLineProps) => {
  return (
    <TrailLineStyled
      data-testid='trail-line'
      orientation={orientation}
      state={state}
    />
  );
};
