import { MouseEvent, useCallback } from 'react';

import { SidebarBackdropStyled } from './SidebarBackdrop.styled';

import type { BaseProps } from '@dt-dds/react-core';

export interface SidebarBackdropProps extends BaseProps {
  isOpen: boolean;
  onBackdropClick?: () => void;
  children: React.ReactNode;
}

export const SidebarBackdrop = ({
  isOpen,
  onBackdropClick,
  children,
  dataTestId,
}: SidebarBackdropProps) => {
  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget && onBackdropClick) {
        onBackdropClick();
      }
    },
    [onBackdropClick]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <SidebarBackdropStyled
      data-testid={dataTestId ?? 'sidebar-backdrop'}
      isOpen={isOpen}
      onClick={handleBackdropClick}
    >
      {children}
    </SidebarBackdropStyled>
  );
};

SidebarBackdrop.displayName = 'Sidebar.Backdrop';
