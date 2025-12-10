import { Fragment, ReactElement } from 'react';

import { Icon } from '@dt-dds/react-icon';

import { SidebarItem } from '../../components/SidebarItem/SidebarItem';
import { SidebarSubList } from '../../components/SidebarSubList/SidebarSubList';
import {
  containsActiveSidebarItem,
  findSubListInChildren,
  flattenChildren,
  isLinkElement,
  isLinkTarget,
  partitionChildren,
} from '../sidebarItemUtils';
import { isSidebarSubList } from '../sidebarUtils';
import { isCurrentUrl } from '../urlUtils';

describe('sidebarItemUtils', () => {
  describe('isSidebarSubList', () => {
    it('returns true for SidebarSubList component', () => {
      expect(
        isSidebarSubList(
          <SidebarSubList>
            <SidebarItem>Item</SidebarItem>
          </SidebarSubList>
        )
      ).toBe(true);
    });

    it('returns false for non-SidebarSubList elements', () => {
      expect(isSidebarSubList(<div>content</div>)).toBe(false);
      expect(isSidebarSubList('text')).toBe(false);
      expect(isSidebarSubList(null)).toBe(false);
    });

    it('returns true for components with displayName "SidebarSubList"', () => {
      const MockSubList = ({ children }: { children: React.ReactNode }) => (
        <ul>{children}</ul>
      );
      MockSubList.displayName = 'SidebarSubList';

      expect(
        isSidebarSubList(
          <MockSubList>
            <li>Item</li>
          </MockSubList>
        )
      ).toBe(true);
    });

    it('returns true for functions named "SidebarSubList"', () => {
      const SidebarSubList = ({ children }: { children: React.ReactNode }) => {
        return <ul>{children}</ul>;
      };

      expect(
        isSidebarSubList(
          <SidebarSubList>
            <li>Item</li>
          </SidebarSubList>
        )
      ).toBe(true);
    });
  });

  describe('isLinkElement', () => {
    it('returns true for native <a> element', () => {
      expect(isLinkElement(<a href='/dashboard'>Link</a>)).toBe(true);
    });

    it('returns true for components with href prop', () => {
      const MockLink = ({
        href,
        children,
      }: {
        href: string;
        children: React.ReactNode;
      }) => <a href={href}>{children}</a>;

      expect(isLinkElement(<MockLink href='/dashboard'>Link</MockLink>)).toBe(
        true
      );
    });

    it('returns false for elements without href', () => {
      expect(isLinkElement(<div>content</div>)).toBe(false);
      expect(isLinkElement(<span>text</span>)).toBe(false);
      expect(isLinkElement('text')).toBe(false);
      expect(isLinkElement(null)).toBe(false);
    });
  });

  describe('findSubListInChildren', () => {
    it('returns true when node itself is a SubList', () => {
      const node = (
        <SidebarSubList>
          <SidebarItem>Item</SidebarItem>
        </SidebarSubList>
      );

      expect(findSubListInChildren(node)).toBe(true);
    });

    it('returns true when SubList is in Fragment', () => {
      const node = (
        <SidebarSubList>
          <SidebarItem>Item</SidebarItem>
        </SidebarSubList>
      );

      expect(findSubListInChildren(node)).toBe(true);
    });

    it('returns false when no SubList is present', () => {
      const node = (
        <div>
          <span>content</span>
        </div>
      );

      expect(findSubListInChildren(node)).toBe(false);
    });

    it('returns false for non-element nodes', () => {
      expect(findSubListInChildren('text')).toBe(false);
      expect(findSubListInChildren(null)).toBe(false);
    });
  });

  describe('flattenChildren', () => {
    it('flattens simple children array', () => {
      const children = [<span key='1'>1</span>, <span key='2'>2</span>];
      const flattened = flattenChildren(children);

      expect(flattened).toHaveLength(2);
      expect((flattened[0] as ReactElement).props.children).toBe('1');
      expect((flattened[1] as ReactElement).props.children).toBe('2');
    });

    it('flattens nested Fragments', () => {
      const children = (
        <>
          <span>1</span>
          <>
            <span>2</span>
            <span>3</span>
          </>
        </>
      );

      const flattened = flattenChildren(children);
      expect(flattened).toHaveLength(3);
    });

    it('handles mixed content with Fragments', () => {
      const children = (
        <>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </>
      );

      const flattened = flattenChildren(children);
      expect(flattened).toHaveLength(3);
    });

    it('handles empty children', () => {
      expect(flattenChildren(null)).toEqual([]);
      expect(flattenChildren([])).toEqual([]);
    });
  });

  describe('partitionChildren', () => {
    it('partitions children into SubList and other children', () => {
      const children = (
        <>
          <span>Content</span>
          <SidebarSubList>
            <SidebarItem>Item</SidebarItem>
          </SidebarSubList>
          <Icon code='dashboard' />
        </>
      );

      const { subList, otherChildren } = partitionChildren(children);

      expect(subList).toHaveLength(1);
      expect(otherChildren).toHaveLength(2);
    });

    it('handles multiple SubLists', () => {
      const children = (
        <>
          <SidebarSubList>
            <SidebarItem>Item 1</SidebarItem>
          </SidebarSubList>
          <span>Content</span>
          <SidebarSubList>
            <SidebarItem>Item 2</SidebarItem>
          </SidebarSubList>
        </>
      );

      const { subList, otherChildren } = partitionChildren(children);

      expect(subList).toHaveLength(2);
      expect(otherChildren).toHaveLength(1);
    });

    it('handles children with nested Fragments', () => {
      const children = (
        <>
          <span>Content</span>
          <SidebarSubList>
            <SidebarItem>Item</SidebarItem>
          </SidebarSubList>
        </>
      );

      const { subList, otherChildren } = partitionChildren(children);

      expect(subList).toHaveLength(1);
      expect(otherChildren).toHaveLength(1);
    });

    it('returns empty arrays when no children', () => {
      const { subList, otherChildren } = partitionChildren(null);

      expect(subList).toEqual([]);
      expect(otherChildren).toEqual([]);
    });
  });

  describe('containsActiveSidebarItem', () => {
    let locationMock: Location;

    beforeEach(() => {
      // Create a mock location object
      locationMock = {
        pathname: '/dashboard',
        href: 'http://localhost/dashboard',
        origin: 'http://localhost',
      } as Location;

      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: locationMock,
        writable: true,
        configurable: true,
      });
    });

    it('returns true when SidebarItem href matches current path', () => {
      const node = <SidebarItem href='/dashboard'>Dashboard</SidebarItem>;

      expect(containsActiveSidebarItem(node, '/dashboard', isCurrentUrl)).toBe(
        true
      );
    });

    it('returns false when SidebarItem href does not match', () => {
      const node = <SidebarItem href='/settings'>Settings</SidebarItem>;

      expect(containsActiveSidebarItem(node, '/dashboard', isCurrentUrl)).toBe(
        false
      );
    });

    it('recursively checks nested SidebarItems', () => {
      const node = (
        <div>
          <SidebarItem href='/other'>Other</SidebarItem>
          <SidebarSubList>
            <SidebarItem href='/dashboard'>Dashboard</SidebarItem>
          </SidebarSubList>
        </div>
      );

      expect(containsActiveSidebarItem(node, '/dashboard', isCurrentUrl)).toBe(
        true
      );
    });

    it('returns false for non-element nodes', () => {
      expect(
        containsActiveSidebarItem('text', '/dashboard', isCurrentUrl)
      ).toBe(false);
      expect(containsActiveSidebarItem(null, '/dashboard', isCurrentUrl)).toBe(
        false
      );
    });

    it('returns false when no children are present', () => {
      const node = <div />;

      expect(containsActiveSidebarItem(node, '/dashboard', isCurrentUrl)).toBe(
        false
      );
    });
  });

  describe('isLinkTarget', () => {
    it('returns true when target is a link element', () => {
      const link = document.createElement('a');
      link.href = '/dashboard';

      expect(isLinkTarget(link)).toBe(true);
    });

    it('returns true when target is inside a link element', () => {
      const link = document.createElement('a');
      link.href = '/dashboard';
      const span = document.createElement('span');
      link.appendChild(span);

      expect(isLinkTarget(span)).toBe(true);
    });

    it('returns false when target is not a link', () => {
      const div = document.createElement('div');

      expect(isLinkTarget(div)).toBe(false);
    });

    it('returns false when target is null', () => {
      expect(isLinkTarget(null)).toBe(false);
    });
  });
});
