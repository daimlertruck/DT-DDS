import { HTMLAttributes, ReactNode, useMemo } from 'react';

import {
  type BaseProps,
  type ResponsiveProps,
  withResponsive,
} from '@dt-dds/react-core';

import { SidebarSectionRoot } from './SidebarSectionRoot.styled';
import { SectionContext, useSidebarContext } from '../../context';
import { hasFirstItemIcon } from '../../utils';

export interface SidebarFooterProps
  extends ResponsiveProps,
    BaseProps,
    HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const SidebarFooterBase = ({
  children,
  dataTestId,
  style,
  ...rest
}: Omit<SidebarFooterProps, keyof ResponsiveProps>) => {
  const { isExpanded, isMobile } = useSidebarContext();
  const isSidebarCollapsed = !isMobile && !isExpanded;

  const firstItemHasIcon = useMemo(
    () => hasFirstItemIcon(children),
    [children]
  );

  return (
    <SectionContext.Provider value={{ variant: 'footer' }}>
      <SidebarSectionRoot
        as='footer'
        data-testid={dataTestId ?? 'sidebar-footer'}
        firstItemHasIcon={firstItemHasIcon}
        isSidebarCollapsed={isSidebarCollapsed}
        style={style}
        variant='footer'
        {...rest}
      >
        <ul>{children}</ul>
      </SidebarSectionRoot>
    </SectionContext.Provider>
  );
};

SidebarFooterBase.displayName = 'Sidebar.Footer';

export const SidebarFooter = withResponsive(SidebarFooterBase);
