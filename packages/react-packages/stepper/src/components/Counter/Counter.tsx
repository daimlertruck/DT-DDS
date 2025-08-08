import { BaseProps } from '@dt-dds/react-core';
import { Colors } from '@dt-dds/themes';

import { CounterStyled } from './Counter.styled';

export interface CounterProps extends BaseProps {
  color?: Colors | 'disabled';
  outlined?: boolean;
  isLarge?: boolean;
}

export const Counter = ({
  children,
  color = 'informative',
  dataTestId,
  style,
  outlined = false,
  isLarge = false,
}: CounterProps) => {
  return (
    <CounterStyled
      color={color}
      data-testid={dataTestId ?? 'counter'}
      isLarge={isLarge}
      outlined={outlined}
      style={style}
    >
      {children}
    </CounterStyled>
  );
};
