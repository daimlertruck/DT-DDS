import { HTMLAttributes, ReactNode, useMemo } from 'react';

import { useTheme } from '@emotion/react';

import { Typography } from '@dt-dds/react-typography';

import { SidebarSectionRoot } from './SidebarSectionRoot.styled';
import { SectionContext, useSidebarContext } from '../../context';
import { hasFirstItemIcon } from '../../utils';

import type { BaseProps } from '@dt-dds/react-core';

export interface SidebarSectionProps
  extends BaseProps,
    HTMLAttributes<HTMLElement> {
  title?: string;
  children: ReactNode;
}

export const SidebarSection = ({
  title,
  children,
  dataTestId,
  style,
  ...rest
}: SidebarSectionProps) => {
  const theme = useTheme();
  const { isExpanded, isMobile } = useSidebarContext();
  const isSidebarCollapsed = !isMobile && !isExpanded;
  const shouldShowTitle = title && !isSidebarCollapsed;

  const firstItemHasIcon = useMemo(
    () => hasFirstItemIcon(children),
    [children]
  );

  return (
    <SectionContext.Provider value={{ variant: 'default' }}>
      <SidebarSectionRoot
        as='nav'
        data-testid={dataTestId ?? 'sidebar-section'}
        firstItemHasIcon={firstItemHasIcon}
        isSidebarCollapsed={isSidebarCollapsed}
        style={style}
        variant='default'
        {...rest}
      >
        {shouldShowTitle ? (
          <Typography
            color='content.dark'
            element='h2'
            fontStyles='bodySmBold'
            style={{
              padding: `${theme.spacing.spacing_50} ${theme.spacing.spacing_60}`,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </Typography>
        ) : null}
        <ul>{children}</ul>
      </SidebarSectionRoot>
    </SectionContext.Provider>
  );
};

SidebarSection.displayName = 'Sidebar.Section';
