import { ReactNode, ElementType, CSSProperties, AriaRole } from 'react';

import { BoxStyled } from './Box.styled';

export interface BoxProps {
  element?: ElementType;
  children?: ReactNode;
  dataTestId?: string;
  style?: CSSProperties;
  role?: AriaRole;
}

export const Box = ({
  dataTestId,
  children,
  role,
  element = 'div',
  style,
}: BoxProps) => {
  return (
    <BoxStyled as={element} data-testid={dataTestId} role={role} style={style}>
      {children}
    </BoxStyled>
  );
};
