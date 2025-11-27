import { ReactNode, HTMLAttributes } from 'react';

import { withResponsive, type ResponsiveProps } from '@dt-dds/react-core';

import { NavigationStyled } from './Navigation.styled';
import { useAppHeaderContext } from '../../context';

export type NavPosition = 'center' | 'left' | 'right';

export interface NavigationProps
  extends ResponsiveProps,
    HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  position?: NavPosition;
}

const NavigationBase = ({
  children,
  ...rest
}: Omit<NavigationProps, keyof ResponsiveProps>) => {
  const { state } = useAppHeaderContext();

  return (
    <NavigationStyled state={state} {...rest}>
      {children}
    </NavigationStyled>
  );
};

NavigationBase.displayName = 'AppHeader.Navigation';

export const Navigation = withResponsive(NavigationBase);
