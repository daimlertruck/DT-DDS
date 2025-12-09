import { HTMLAttributes, ReactNode } from 'react';

import { SidebarContentStyled } from './SidebarContent.styled';
import { useSidebarContext } from '../../context';

import type { BaseProps } from '@dt-dds/react-core';

export interface SidebarContentProps
  extends BaseProps,
    HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const SidebarContent = ({
  children,
  dataTestId,
  style,
  ...rest
}: SidebarContentProps) => {
  const { isExpanded, isMobile } = useSidebarContext();
  const isSidebarCollapsed = !isMobile && !isExpanded;

  return (
    <SidebarContentStyled
      data-testid={dataTestId ?? 'sidebar-content'}
      isSidebarCollapsed={isSidebarCollapsed}
      style={style}
      {...rest}
    >
      {children}
    </SidebarContentStyled>
  );
};

SidebarContent.displayName = 'Sidebar.Content';
