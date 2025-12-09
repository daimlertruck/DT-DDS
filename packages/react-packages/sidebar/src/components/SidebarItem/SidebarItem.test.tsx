import React from 'react';

import { act, fireEvent, render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';

import { Sidebar, type SidebarProps } from '../../Sidebar';
import { SidebarSubList } from '../SidebarSubList';

describe('<SidebarItem /> component', () => {
  const ProvidedSidebar = withProviders(Sidebar);

  const renderItem = (
    props: Partial<React.ComponentProps<typeof Sidebar.Item>> = {},
    sidebarOverrides: Partial<SidebarProps> = {}
  ) => {
    const { children, ...rest } = props;
    return render(
      <ProvidedSidebar isExpanded {...sidebarOverrides}>
        <Sidebar.Item {...(rest as React.ComponentProps<typeof Sidebar.Item>)}>
          {children ?? null}
        </Sidebar.Item>
      </ProvidedSidebar>
    );
  };

  const renderWithSubList = (
    props?: Partial<React.ComponentProps<typeof Sidebar.Item>>,
    sidebarOverrides?: Partial<SidebarProps>
  ) => {
    const { children, ...rest } = props ?? {};
    const defaultChildren = (
      <>
        <span>Main Item</span>
        <SidebarSubList>
          <Sidebar.Item>Sub Item</Sidebar.Item>
        </SidebarSubList>
      </>
    );

    return renderItem(
      {
        ...rest,
        children: children ?? defaultChildren,
      },
      sidebarOverrides
    );
  };

  const getDisclosureElements = () => {
    const parent = screen
      .getAllByTestId('sidebar-item')
      .find((item) => item.querySelector('[role="button"]'));

    if (!parent) {
      throw new Error('Expected disclosure parent element');
    }

    const header = parent.querySelector('[role="button"]') as HTMLElement;
    const body = parent.querySelector('[aria-hidden]') as HTMLElement | null;
    const toggleButton = parent.querySelector(
      'button[aria-label]'
    ) as HTMLElement | null;

    return { parent, header, body, toggleButton };
  };

  const setLocationPath = (pathname: string) => {
    window.history.replaceState({}, '', pathname);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  beforeEach(() => {
    setLocationPath('/');
  });

  describe('Basic rendering', () => {
    it('renders content inside a list item', () => {
      renderItem({ children: 'Dashboard' });

      const item = screen.getByTestId('sidebar-item');
      expect(item.tagName).toBe('LI');
      expect(item).toHaveTextContent('Dashboard');
    });
  });

  describe('Link behavior', () => {
    it('renders an anchor when href is provided', () => {
      renderItem({ href: '/reports', children: 'Reports' });

      const link = screen.getByRole('link', { name: 'Reports' });
      expect(link).toHaveAttribute('href', '/reports');
    });

    it('supports custom link components', () => {
      const MockLink = ({
        href,
        children,
      }: {
        href: string;
        children: React.ReactNode;
      }) => <a href={href}>{children}</a>;

      renderItem({
        children: <MockLink href='/about'>About</MockLink>,
      });

      const link = screen.getByRole('link', { name: 'About' });
      expect(link).toHaveAttribute('href', '/about');
    });

    it('handles invalid href gracefully', () => {
      renderItem({ href: 'invalid', children: 'Broken Link' });

      const link = screen.getByRole('link', { name: 'Broken Link' });
      expect(link).toBeInTheDocument();
    });
  });

  describe('Disclosure behavior', () => {
    it('toggles via header click and keyboard', () => {
      renderWithSubList();
      const { header, body } = getDisclosureElements();

      expect(header).toHaveAttribute('aria-expanded', 'false');
      expect(body).toHaveAttribute('aria-hidden', 'true');

      fireEvent.click(header);
      expect(header).toHaveAttribute('aria-expanded', 'true');
      expect(body).toHaveAttribute('aria-hidden', 'false');

      fireEvent.keyDown(header, { key: ' ' });
      expect(header).toHaveAttribute('aria-expanded', 'false');
    });

    it('ignores link interactions for toggling', () => {
      setLocationPath('/elsewhere');
      renderWithSubList({
        href: '/dashboard',
      });

      const { header, parent } = getDisclosureElements();
      const link = parent.querySelector('a') as HTMLElement;

      fireEvent.click(link);
      expect(header).toHaveAttribute('aria-expanded', 'false');

      fireEvent.keyDown(link, { key: 'Enter' });
      expect(header).toHaveAttribute('aria-expanded', 'false');
    });

    it('toggle button responds to click and keyboard', () => {
      renderWithSubList();
      const { header, toggleButton } = getDisclosureElements();
      expect(toggleButton).toBeTruthy();

      fireEvent.click(toggleButton!);
      expect(header).toHaveAttribute('aria-expanded', 'true');

      fireEvent.keyDown(toggleButton!, { key: 'Enter' });
      expect(header).toHaveAttribute('aria-expanded', 'false');
    });

    it('invokes onToggle callback with the latest state', () => {
      const onToggle = jest.fn();
      renderWithSubList({ onToggle });
      const { header } = getDisclosureElements();

      fireEvent.click(header);
      fireEvent.click(header);

      expect(onToggle).toHaveBeenNthCalledWith(1, true);
      expect(onToggle).toHaveBeenNthCalledWith(2, false);
    });

    it('respects defaultExpanded prop', () => {
      renderWithSubList({ defaultExpanded: true });
      const { header } = getDisclosureElements();

      expect(header).toHaveAttribute('aria-expanded', 'true');
    });

    it('auto-expands when href is active and remains collapsible', () => {
      setLocationPath('/dashboard');
      renderWithSubList({ href: '/dashboard' });

      const { header } = getDisclosureElements();
      expect(header).toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(header);
      expect(header).toHaveAttribute('aria-expanded', 'false');
    });

    it('auto-expands when descendant is active and remains collapsible', () => {
      setLocationPath('/nested');
      renderWithSubList({
        children: (
          <>
            <span>Parent</span>
            <SidebarSubList>
              <Sidebar.Item href='/nested'>Nested Item</Sidebar.Item>
            </SidebarSubList>
          </>
        ),
      });

      const { header } = getDisclosureElements();
      expect(header).toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(header);
      expect(header).toHaveAttribute('aria-expanded', 'false');
    });

    it('renders only icons and hides sublists when desktop collapsed', () => {
      renderWithSubList(
        {
          href: '/reports',
          children: (
            <>
              <Icon code='date_range' />
              <span>Reports</span>
              <SidebarSubList>
                <Sidebar.Item>Should not show</Sidebar.Item>
              </SidebarSubList>
            </>
          ),
        },
        { isExpanded: false }
      );

      expect(screen.queryByText('Reports')).toBeNull();
      expect(screen.queryByText('Should not show')).toBeNull();
      expect(screen.queryByTestId('sidebar-sub-list')).toBeNull();
      expect(screen.getAllByTestId('icon').length).toBeGreaterThan(0);
    });

    it('renders icon from custom link sibling after item with SubList when desktop collapsed', () => {
      const MockLink = ({
        href,
        children,
      }: {
        href: string;
        children: React.ReactNode;
      }) => <a href={href}>{children}</a>;

      const { container } = render(
        <ProvidedSidebar isExpanded={false}>
          <Sidebar.Section title='Test Section'>
            <Sidebar.Item>
              Another Item list
              <SidebarSubList>
                <Sidebar.Item>
                  <p>Another Sub Item</p>
                </Sidebar.Item>
              </SidebarSubList>
            </Sidebar.Item>
            <Sidebar.Item>
              <MockLink href='/dashboard'>
                <Icon code='dashboard' />
                Dashboard
              </MockLink>
            </Sidebar.Item>
          </Sidebar.Section>
        </ProvidedSidebar>
      );

      const items = container.querySelectorAll('[data-testid="sidebar-item"]');
      expect(items.length).toBe(1);

      const icons = screen.getAllByTestId('icon');
      const dashboardIcon = icons.find(
        (icon) => icon.textContent === 'dashboard'
      );
      expect(dashboardIcon).toBeInTheDocument();

      expect(screen.queryByText('Dashboard')).toBeNull();
      expect(screen.queryByText('Another Item list')).toBeNull();
    });

    it('expands when navigation activates the item', () => {
      renderWithSubList({ href: '/reports' });
      let { header } = getDisclosureElements();
      expect(header).toHaveAttribute('aria-expanded', 'false');

      act(() => setLocationPath('/reports'));
      ({ header } = getDisclosureElements());
      expect(header).toHaveAttribute('aria-expanded', 'true');
    });

    it('recognizes faux SubList elements with displayName', () => {
      const FauxSubListWithDisplayName = ({
        children,
      }: {
        children: React.ReactNode;
      }) => <ul>{children}</ul>;
      FauxSubListWithDisplayName.displayName = 'SidebarSubList';

      renderWithSubList({
        children: (
          <>
            <span>Custom SubList</span>
            <FauxSubListWithDisplayName>
              <Sidebar.Item>Inside Faux List</Sidebar.Item>
            </FauxSubListWithDisplayName>
          </>
        ),
      });

      const { header } = getDisclosureElements();
      expect(header).toHaveAttribute('aria-expanded', 'false');
    });

    it('detects Sidebar.Item descendants even without displayName', () => {
      const originalDisplayName = Sidebar.Item.displayName as
        | string
        | undefined;
      Sidebar.Item.displayName = '';

      setLocationPath('/nested');
      renderWithSubList({
        children: (
          <>
            <span>Parent</span>
            <SidebarSubList>
              <Sidebar.Item href='/nested'>Nested Item</Sidebar.Item>
            </SidebarSubList>
          </>
        ),
      });

      const { header } = getDisclosureElements();
      expect(header).toHaveAttribute('aria-expanded', 'true');

      Sidebar.Item.displayName = originalDisplayName ?? 'SidebarItem';
    });

    it('respects controlled expanded prop', () => {
      const { rerender } = renderWithSubList({ expanded: false });
      let { header } = getDisclosureElements();
      expect(header).toHaveAttribute('aria-expanded', 'false');

      rerender(
        <ProvidedSidebar isExpanded>
          <Sidebar.Item expanded>
            <>
              <span>Main Item</span>
              <SidebarSubList>
                <Sidebar.Item>Sub Item</Sidebar.Item>
              </SidebarSubList>
            </>
          </Sidebar.Item>
        </ProvidedSidebar>
      );

      ({ header } = getDisclosureElements());
      expect(header).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Context requirement', () => {
    it('throws when used outside Sidebar context', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<Sidebar.Item>Item</Sidebar.Item>);
      }).toThrow('Sidebar compound components must be used within Sidebar');

      consoleSpy.mockRestore();
    });
  });
});
