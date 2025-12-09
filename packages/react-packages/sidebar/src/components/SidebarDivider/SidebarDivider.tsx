import { HTMLAttributes } from 'react';

import {
  type ResponsiveProps,
  type BaseProps,
  withResponsive,
} from '@dt-dds/react-core';

import { SidebarDividerStyled } from './SidebarDivider.styled';

export interface SidebarDividerProps
  extends ResponsiveProps,
    BaseProps,
    HTMLAttributes<HTMLHRElement> {}

const SidebarDividerBase = ({
  dataTestId,
  style,
  ...rest
}: Omit<SidebarDividerProps, keyof ResponsiveProps>) => {
  return (
    <SidebarDividerStyled
      data-testid={dataTestId ?? 'sidebar-divider'}
      style={style}
      {...rest}
    />
  );
};

SidebarDividerBase.displayName = 'Sidebar.Divider';

export const SidebarDivider = withResponsive(SidebarDividerBase);
