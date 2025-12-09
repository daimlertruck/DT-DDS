import { HTMLAttributes, ReactNode, useMemo } from 'react';

import {
  type ResponsiveProps,
  type BaseProps,
  withResponsive,
} from '@dt-dds/react-core';

import { SidebarSectionRoot } from './SidebarSectionRoot.styled';
import { SectionContext, useSidebarContext } from '../../context';
import { hasFirstItemIcon } from '../../utils';

export interface SidebarHeaderProps
  extends ResponsiveProps,
    BaseProps,
    HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const SidebarHeaderBase = ({
  children,
  dataTestId,
  style,
  ...rest
}: Omit<SidebarHeaderProps, keyof ResponsiveProps>) => {
  const { isExpanded, isMobile } = useSidebarContext();
  const isSidebarCollapsed = !isMobile && !isExpanded;

  const firstItemHasIcon = useMemo(
    () => hasFirstItemIcon(children),
    [children]
  );

  return (
    <SectionContext.Provider value={{ variant: 'header' }}>
      <SidebarSectionRoot
        as='header'
        data-testid={dataTestId ?? 'sidebar-header'}
        firstItemHasIcon={firstItemHasIcon}
        isSidebarCollapsed={isSidebarCollapsed}
        style={style}
        variant='header'
        {...rest}
      >
        <ul>{children}</ul>
      </SidebarSectionRoot>
    </SectionContext.Provider>
  );
};

SidebarHeaderBase.displayName = 'Sidebar.Header';

export const SidebarHeader = withResponsive(SidebarHeaderBase);
