import { Code } from '@dt-dds/icons';
import { Icon } from '@dt-dds/react-icon';
import { ChevronProps } from 'react-day-picker';

import { ChevronStyled } from './Chevron.styled';

export const Chevron = ({ orientation = 'left', disabled }: ChevronProps) => {
  const icons: Record<'up' | 'down' | 'left' | 'right', Code> = {
    left: 'chevron_left',
    right: 'chevron_right',
    down: 'arrow_downward',
    up: 'arrow_upward',
  };
  return (
    <ChevronStyled disabled={disabled}>
      <Icon code={icons[orientation]} />
    </ChevronStyled>
  );
};
