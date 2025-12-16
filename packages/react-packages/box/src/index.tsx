import { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';

import { BoxStyled } from './Box.styled';

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  element?: ElementType;
  children?: ReactNode;
  dataTestId?: string;
  style?: CSSProperties;
}

export const Box = ({
  dataTestId,
  children,
  element = 'div',
  style,
  ...rest
}: BoxProps) => {
  return (
    <BoxStyled as={element} data-testid={dataTestId} style={style} {...rest}>
      {children}
    </BoxStyled>
  );
};
