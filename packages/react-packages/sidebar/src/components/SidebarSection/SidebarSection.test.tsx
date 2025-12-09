import { render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';

import { Sidebar } from '../../Sidebar';

describe('<SidebarSection /> component', () => {
  const ProvidedSidebar = withProviders(Sidebar);

  it('should render section with title and children', () => {
    render(
      <ProvidedSidebar isExpanded>
        <Sidebar.Section title='Test Section'>
          <Sidebar.Item>Item</Sidebar.Item>
        </Sidebar.Section>
      </ProvidedSidebar>
    );

    const section = screen.getByTestId('sidebar-section');
    expect(section.tagName).toBe('NAV');
    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('should detect icon when nested inside custom Link component', () => {
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
            <MockLink href='/dashboard'>
              <Icon code='dashboard' />
              Dashboard
            </MockLink>
          </Sidebar.Item>
        </Sidebar.Section>
      </ProvidedSidebar>
    );

    const section = container.querySelector('[data-testid="sidebar-section"]');
    // When icon is present (even nested in Link), section should be visible
    expect(section).toHaveStyle({
      display: 'flex',
    });
  });

  it('should not detect icon in nested SubList items', () => {
    const { container } = render(
      <ProvidedSidebar isExpanded={false}>
        <Sidebar.Section title='Test Section'>
          <Sidebar.Item>
            Another Item list
            <Sidebar.SubList>
              <Sidebar.Item>
                <a href='/dashboard'>
                  <Icon code='dashboard' />
                  Dashboard
                </a>
              </Sidebar.Item>
            </Sidebar.SubList>
          </Sidebar.Item>
        </Sidebar.Section>
      </ProvidedSidebar>
    );

    const section = container.querySelector('[data-testid="sidebar-section"]');
    // When first item has no icon (icon is only in nested SubList), section should be hidden when collapsed
    expect(section).toHaveStyle({
      display: 'none',
    });
  });

  it('should show section when expanded even if first item has no icon', () => {
    const { container } = render(
      <ProvidedSidebar isExpanded>
        <Sidebar.Section title='Test Section'>
          <Sidebar.Item>
            Another Item list
            <Sidebar.SubList>
              <Sidebar.Item>
                <a href='/dashboard'>
                  <Icon code='dashboard' />
                  Dashboard
                </a>
              </Sidebar.Item>
            </Sidebar.SubList>
          </Sidebar.Item>
        </Sidebar.Section>
      </ProvidedSidebar>
    );

    const section = container.querySelector('[data-testid="sidebar-section"]');
    // When expanded, section should always show regardless of icons
    expect(section).toHaveStyle({
      display: 'flex',
    });
  });

  it('should throw error when used outside Sidebar context', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<Sidebar.Section title='Test'>Content</Sidebar.Section>);
    }).toThrow('Sidebar compound components must be used within Sidebar');

    consoleSpy.mockRestore();
  });
});

describe('<SidebarHeader /> component', () => {
  const ProvidedSidebar = withProviders(Sidebar);

  it('should render header with children', () => {
    render(
      <ProvidedSidebar isExpanded>
        <Sidebar.Header>
          <Sidebar.Item>Header Item</Sidebar.Item>
        </Sidebar.Header>
      </ProvidedSidebar>
    );

    const header = screen.getByTestId('sidebar-header');
    expect(header.tagName).toBe('HEADER');
    expect(screen.getByText('Header Item')).toBeInTheDocument();
  });

  it('should detect icon in first item', () => {
    const { container } = render(
      <ProvidedSidebar isExpanded={false}>
        <Sidebar.Header>
          <Sidebar.Item>
            <Icon code='dashboard' />
            Dashboard
          </Sidebar.Item>
        </Sidebar.Header>
      </ProvidedSidebar>
    );

    const header = container.querySelector('[data-testid="sidebar-header"]');
    expect(header).toHaveStyle({
      display: 'flex',
    });
  });

  it('should hide header when collapsed and first item has no icon', () => {
    const { container } = render(
      <ProvidedSidebar isExpanded={false}>
        <Sidebar.Header>
          <Sidebar.Item>No Icon Item</Sidebar.Item>
        </Sidebar.Header>
      </ProvidedSidebar>
    );

    const header = container.querySelector('[data-testid="sidebar-header"]');
    expect(header).toHaveStyle({
      display: 'none',
    });
  });

  it('should show header when expanded even if first item has no icon', () => {
    const { container } = render(
      <ProvidedSidebar isExpanded>
        <Sidebar.Header>
          <Sidebar.Item>No Icon Item</Sidebar.Item>
        </Sidebar.Header>
      </ProvidedSidebar>
    );

    const header = container.querySelector('[data-testid="sidebar-header"]');
    expect(header).toHaveStyle({
      display: 'flex',
    });
  });

  it('should use custom dataTestId when provided', () => {
    render(
      <ProvidedSidebar isExpanded>
        <Sidebar.Header dataTestId='custom-header'>
          <Sidebar.Item>Item</Sidebar.Item>
        </Sidebar.Header>
      </ProvidedSidebar>
    );

    expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar-header')).not.toBeInTheDocument();
  });

  it('should throw error when used outside Sidebar context', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<Sidebar.Header>Content</Sidebar.Header>);
    }).toThrow('Sidebar compound components must be used within Sidebar');

    consoleSpy.mockRestore();
  });
});

describe('<SidebarFooter /> component', () => {
  const ProvidedSidebar = withProviders(Sidebar);

  it('should render footer with children', () => {
    render(
      <ProvidedSidebar isExpanded>
        <Sidebar.Footer>
          <Sidebar.Item>Footer Item</Sidebar.Item>
        </Sidebar.Footer>
      </ProvidedSidebar>
    );

    const footer = screen.getByTestId('sidebar-footer');
    expect(footer.tagName).toBe('FOOTER');
    expect(screen.getByText('Footer Item')).toBeInTheDocument();
  });

  it('should detect icon in first item', () => {
    const { container } = render(
      <ProvidedSidebar isExpanded={false}>
        <Sidebar.Footer>
          <Sidebar.Item>
            <Icon code='settings' />
            Settings
          </Sidebar.Item>
        </Sidebar.Footer>
      </ProvidedSidebar>
    );

    const footer = container.querySelector('[data-testid="sidebar-footer"]');
    expect(footer).toHaveStyle({
      display: 'flex',
    });
  });

  it('should hide footer when collapsed and first item has no icon', () => {
    const { container } = render(
      <ProvidedSidebar isExpanded={false}>
        <Sidebar.Footer>
          <Sidebar.Item>No Icon Item</Sidebar.Item>
        </Sidebar.Footer>
      </ProvidedSidebar>
    );

    const footer = container.querySelector('[data-testid="sidebar-footer"]');
    expect(footer).toHaveStyle({
      display: 'none',
    });
  });

  it('should show footer when expanded even if first item has no icon', () => {
    const { container } = render(
      <ProvidedSidebar isExpanded>
        <Sidebar.Footer>
          <Sidebar.Item>No Icon Item</Sidebar.Item>
        </Sidebar.Footer>
      </ProvidedSidebar>
    );

    const footer = container.querySelector('[data-testid="sidebar-footer"]');
    expect(footer).toHaveStyle({
      display: 'flex',
    });
  });

  it('should use custom dataTestId when provided', () => {
    render(
      <ProvidedSidebar isExpanded>
        <Sidebar.Footer dataTestId='custom-footer'>
          <Sidebar.Item>Item</Sidebar.Item>
        </Sidebar.Footer>
      </ProvidedSidebar>
    );

    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar-footer')).not.toBeInTheDocument();
  });

  it('should throw error when used outside Sidebar context', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<Sidebar.Footer>Content</Sidebar.Footer>);
    }).toThrow('Sidebar compound components must be used within Sidebar');

    consoleSpy.mockRestore();
  });
});
