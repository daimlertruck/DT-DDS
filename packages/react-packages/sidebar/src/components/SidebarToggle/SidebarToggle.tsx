import { Icon } from '@dt-dds/react-icon';

import { SidebarToggleStyled } from './SidebarToggle.styled';
import { useSidebarContext } from '../../context';

export interface SidebarToggleProps {
  onClick?: () => void;
}

export const SidebarToggle = ({ onClick }: SidebarToggleProps) => {
  const { isExpanded, isMobile, onToggle } = useSidebarContext();
  const isSidebarCollapsed = !isMobile && !isExpanded;

  const handleClick = onClick ?? onToggle;

  return (
    <SidebarToggleStyled
      aria-expanded={!isSidebarCollapsed}
      aria-label='Toggle sidebar navigation'
      isSidebarCollapsed={isSidebarCollapsed}
      onClick={handleClick}
    >
      <Icon code='menu_open' />
    </SidebarToggleStyled>
  );
};

SidebarToggle.displayName = 'Sidebar.Toggle';
