import { ReactElement } from 'react';

import { Icon } from '@dt-dds/react-icon';
import { IconButton } from '@dt-dds/react-icon-button';

import { SidebarItem, SidebarSubList, SidebarToggle } from '../../components';
import {
  SIDEBAR_DEFAULT_OFFSET_POSITION,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MINI,
} from '../../constants';
import {
  calculateSidebarPosition,
  calculateSidebarWidth,
  extractIconsFromChildren,
  hasFirstItemIcon,
  isIconElement,
  isSidebarItemElement,
} from '../sidebarUtils';

describe('sidebarUtils', () => {
  describe('isIconElement', () => {
    it('returns true for Icon, IconButton, SidebarToggle components', () => {
      expect(isIconElement(<Icon code='dashboard' />)).toBe(true);
      expect(isIconElement(<IconButton />)).toBe(true);
      expect(isIconElement(<SidebarToggle onClick={jest.fn()} />)).toBe(true);
    });

    it('returns true for native <i> element', () => {
      expect(isIconElement(<i>icon</i>)).toBe(true);
    });

    it('returns false for non-icon elements and non-element nodes', () => {
      expect(isIconElement(<div>content</div>)).toBe(false);
      expect(isIconElement('text')).toBe(false);
      expect(isIconElement(null)).toBe(false);
    });

    it('returns true for components with displayName Icon/IconButton/SidebarToggle', () => {
      const MockIcon = () => <span>icon</span>;
      MockIcon.displayName = 'Icon';
      expect(isIconElement(<MockIcon />)).toBe(true);

      const MockIconButton = () => <span>icon</span>;
      MockIconButton.displayName = 'IconButton';
      expect(isIconElement(<MockIconButton />)).toBe(true);

      const MockToggle = () => <span>toggle</span>;
      MockToggle.displayName = 'SidebarToggle';
      expect(isIconElement(<MockToggle />)).toBe(true);
    });

    it('returns true for functions named Icon/IconButton/SidebarToggle', () => {
      const Icon = () => {
        return <span>icon</span>;
      };
      expect(isIconElement(<Icon />)).toBe(true);

      const IconButton = () => {
        return <span>icon</span>;
      };
      expect(isIconElement(<IconButton />)).toBe(true);

      const SidebarToggle = () => {
        return <span>toggle</span>;
      };
      expect(isIconElement(<SidebarToggle />)).toBe(true);
    });
  });

  describe('isSidebarItemElement', () => {
    it('returns true for SidebarItem component', () => {
      expect(isSidebarItemElement(<SidebarItem>Item</SidebarItem>)).toBe(true);
    });

    it('returns false for non-SidebarItem elements and non-element nodes', () => {
      expect(isSidebarItemElement(<div>content</div>)).toBe(false);
      expect(isSidebarItemElement('text')).toBe(false);
      expect(isSidebarItemElement(null)).toBe(false);
    });

    it('returns true for components with displayName "SidebarItem"', () => {
      const MockItem = ({ children }: { children: React.ReactNode }) => (
        <li>{children}</li>
      );
      MockItem.displayName = 'SidebarItem';
      expect(isSidebarItemElement(<MockItem>Item</MockItem>)).toBe(true);
    });

    it('returns true for function named "SidebarItem"', () => {
      const SidebarItem = ({ children }: { children: React.ReactNode }) => {
        return <li>{children}</li>;
      };
      expect(isSidebarItemElement(<SidebarItem>Item</SidebarItem>)).toBe(true);
    });
  });

  describe('extractIconsFromChildren', () => {
    it('extracts icons from direct children', () => {
      const children = [
        <Icon code='dashboard' key='1' />,
        <span key='2'>Text</span>,
        <Icon code='settings' key='3' />,
      ];

      const icons = extractIconsFromChildren(children);

      expect(icons).toHaveLength(2);
      expect((icons[0] as ReactElement).props.code).toBe('dashboard');
      expect((icons[1] as ReactElement).props.code).toBe('settings');
    });

    it('extracts icons from nested structures and Fragments', () => {
      const MockLink = ({
        href,
        children,
      }: {
        href: string;
        children: React.ReactNode;
      }) => <a href={href}>{children}</a>;

      const children = (
        <>
          <MockLink href='/dashboard'>
            <Icon code='dashboard' />
            <span>Dashboard</span>
          </MockLink>
          <Icon code='settings' />
        </>
      );

      const icons = extractIconsFromChildren(children);
      expect(icons).toHaveLength(2);
    });

    it('stops at SidebarSubList and SidebarItem - does not extract from nested', () => {
      const children = [
        <Icon code='dashboard' key='1' />,
        <SidebarSubList key='2'>
          <SidebarItem>
            <Icon code='settings' />
          </SidebarItem>
        </SidebarSubList>,
        <SidebarItem key='3'>
          <Icon code='home' />
        </SidebarItem>,
      ];

      const icons = extractIconsFromChildren(children);
      expect(icons).toHaveLength(1);
      expect((icons[0] as ReactElement).props.code).toBe('dashboard');
    });

    it('returns empty array when no icons or empty children', () => {
      expect(extractIconsFromChildren([<span key='1'>Text</span>])).toEqual([]);
      expect(extractIconsFromChildren([])).toEqual([]);
      expect(extractIconsFromChildren(null)).toEqual([]);
    });

    it('stops at SubList by displayName and function name', () => {
      const MockSubList1 = ({ children }: { children: React.ReactNode }) => (
        <ul>{children}</ul>
      );
      MockSubList1.displayName = 'SidebarSubList';

      const SidebarSubList = ({ children }: { children: React.ReactNode }) => {
        return <ul>{children}</ul>;
      };

      expect(
        extractIconsFromChildren([
          <Icon code='dashboard' key='1' />,
          <MockSubList1 key='2'>
            <Icon code='settings' />
          </MockSubList1>,
        ])
      ).toHaveLength(1);

      expect(
        extractIconsFromChildren([
          <Icon code='dashboard' key='1' />,
          <SidebarSubList key='2'>
            <Icon code='settings' />
          </SidebarSubList>,
        ])
      ).toHaveLength(1);
    });
  });

  describe('hasFirstItemIcon', () => {
    it('returns true when SidebarItem has icon (direct or in Link)', () => {
      const MockLink = ({
        href,
        children,
      }: {
        href: string;
        children: React.ReactNode;
      }) => <a href={href}>{children}</a>;

      expect(
        hasFirstItemIcon(
          <SidebarItem>
            <Icon code='dashboard' />
            Dashboard
          </SidebarItem>
        )
      ).toBe(true);

      // Icon in Link
      expect(
        hasFirstItemIcon(
          <SidebarItem>
            <MockLink href='/dashboard'>
              <Icon code='dashboard' />
              Dashboard
            </MockLink>
          </SidebarItem>
        )
      ).toBe(true);
    });

    it('returns false when SidebarItem has no icon', () => {
      expect(hasFirstItemIcon(<SidebarItem>Dashboard</SidebarItem>)).toBe(
        false
      );
    });

    it('returns true when any direct SidebarItem sibling has icon', () => {
      const children = [
        <SidebarItem key='1'>No Icon</SidebarItem>,
        <SidebarItem key='2'>
          <Icon code='dashboard' />
          Has Icon
        </SidebarItem>,
      ];
      expect(hasFirstItemIcon(children)).toBe(true);
    });

    it('returns false when icon is only in nested SubList', () => {
      const children = (
        <SidebarItem>
          Text Only
          <SidebarSubList>
            <SidebarItem>
              <Icon code='dashboard' />
            </SidebarItem>
          </SidebarSubList>
        </SidebarItem>
      );
      expect(hasFirstItemIcon(children)).toBe(false);
    });

    it('returns false for empty or non-SidebarItem children', () => {
      expect(hasFirstItemIcon(null)).toBe(false);
      expect(hasFirstItemIcon([])).toBe(false);
      expect(hasFirstItemIcon([<div key='1'>Not an item</div>])).toBe(false);
    });

    it('finds SidebarItems nested in wrapper elements', () => {
      const children = (
        <nav>
          <SidebarItem>
            <Icon code='dashboard' />
            Dashboard
          </SidebarItem>
        </nav>
      );
      expect(hasFirstItemIcon(children)).toBe(true);
    });

    it('finds SidebarItems in Fragment children', () => {
      const children = (
        <>
          <SidebarItem>
            <Icon code='dashboard' />
            Dashboard
          </SidebarItem>
          <SidebarItem>Settings</SidebarItem>
        </>
      );
      expect(hasFirstItemIcon(children)).toBe(true);
    });
  });

  describe('calculateSidebarPosition', () => {
    it('returns default offset position when mobile and expanded', () => {
      expect(calculateSidebarPosition(true, true)).toBe(
        SIDEBAR_DEFAULT_OFFSET_POSITION
      );
    });

    it('returns negative sidebar width when mobile and collapsed', () => {
      expect(calculateSidebarPosition(true, false)).toBe(-SIDEBAR_WIDTH);
    });

    it('returns default offset position when desktop and expanded', () => {
      expect(calculateSidebarPosition(false, true)).toBe(
        SIDEBAR_DEFAULT_OFFSET_POSITION
      );
    });

    it('returns default offset position when desktop and collapsed', () => {
      expect(calculateSidebarPosition(false, false)).toBe(
        SIDEBAR_DEFAULT_OFFSET_POSITION
      );
    });
  });

  describe('calculateSidebarWidth', () => {
    it('returns full width when mobile and expanded', () => {
      expect(calculateSidebarWidth(true, true)).toBe(SIDEBAR_WIDTH);
    });

    it('returns full width when mobile and collapsed', () => {
      expect(calculateSidebarWidth(true, false)).toBe(SIDEBAR_WIDTH);
    });

    it('returns full width when desktop and expanded', () => {
      expect(calculateSidebarWidth(false, true)).toBe(SIDEBAR_WIDTH);
    });

    it('returns mini width when desktop and collapsed', () => {
      expect(calculateSidebarWidth(false, false)).toBe(SIDEBAR_WIDTH_MINI);
    });
  });
});
