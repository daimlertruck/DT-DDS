import { BaseProps } from '@dt-dds/react-core';

import { DrawerContentStyled } from './DrawerBody.styled';

export const DrawerBody = ({ children, style, dataTestId }: BaseProps) => {
  return (
    <DrawerContentStyled
      data-testid={dataTestId ?? 'drawer-body'}
      style={style}
    >
      {children}
    </DrawerContentStyled>
  );
};
