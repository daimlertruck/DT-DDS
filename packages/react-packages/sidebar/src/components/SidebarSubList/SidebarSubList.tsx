import { HTMLAttributes, ReactNode } from 'react';

import { SidebarSubListStyled } from './SidebarSubList.styled';
import { useSidebarContext, SubListContext } from '../../context';

import type { BaseProps } from '@dt-dds/react-core';

export interface SidebarSubListProps
  extends BaseProps,
    HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

export const SidebarSubList = ({
  children,
  dataTestId,
  style,
  ...rest
}: SidebarSubListProps) => {
  useSidebarContext();

  return (
    <SubListContext.Provider value={{ isNested: true }}>
      <SidebarSubListStyled
        as='ul'
        data-testid={dataTestId ?? 'sidebar-sub-list'}
        style={style}
        {...rest}
      >
        {children}
      </SidebarSubListStyled>
    </SubListContext.Provider>
  );
};

SidebarSubList.displayName = 'SidebarSubList';
