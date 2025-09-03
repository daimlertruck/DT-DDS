import { MouseEvent, useState } from 'react';
import { Box, Icon, IconButton } from '@dt-dds/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavigationMenuStyled,
  MobileNavigationStyled,
  LinkStyled,
} from './MobileNagivation.styled';

export const MobileNavigation = ({
  items,
}: {
  items: Record<string, never>[];
}) => {
  const path = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenuIcon = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleCloseMenu();
  };

  return (
    <MobileNavigationStyled>
      <IconButton
        onClick={handleCloseMenuIcon}
        ariaLabel='menu'
        dataTestId='hamburger-menu-icon'
      >
        <Icon code='menu' aria-expanded={isOpen} />
      </IconButton>

      <NavigationMenuStyled
        isOpen={isOpen}
        className={isOpen ? 'no-doc-scroll' : ''}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        data-testid='navigation-menu'
      >
        <Box style={{ alignItems: 'flex-start', padding: '0 1.5rem' }}>
          <IconButton
            onClick={handleCloseMenuIcon}
            dataTestId='hamburger-menu-close-icon'
            variant='contrast'
          >
            <Icon code='close' />
          </IconButton>
        </Box>

        <Box style={{ alignItems: 'flex-start' }}>
          {items.map((item) => (
            <LinkStyled key={item.label}>
              <Link
                href={item.link}
                onClick={handleCloseMenu}
                aria-current={path === item.link ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </LinkStyled>
          ))}
        </Box>
      </NavigationMenuStyled>
    </MobileNavigationStyled>
  );
};
