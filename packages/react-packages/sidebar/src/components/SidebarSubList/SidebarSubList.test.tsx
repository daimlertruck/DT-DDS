import { render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Sidebar } from '../../Sidebar';

describe('<SidebarSubList /> component', () => {
  const ProvidedSidebar = withProviders(Sidebar);

  it('should render sublist with children', () => {
    render(
      <ProvidedSidebar isExpanded>
        <Sidebar.Item>
          <Sidebar.SubList>
            <Sidebar.Item>Sub Item</Sidebar.Item>
          </Sidebar.SubList>
        </Sidebar.Item>
      </ProvidedSidebar>
    );

    const subList = screen.getByTestId('sidebar-sub-list');
    expect(subList.tagName).toBe('UL');
    expect(subList).toHaveTextContent('Sub Item');
  });

  it('should throw error when used outside Sidebar context', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(
        <Sidebar.SubList>
          <Sidebar.Item>Item</Sidebar.Item>
        </Sidebar.SubList>
      );
    }).toThrow('Sidebar compound components must be used within Sidebar');

    consoleSpy.mockRestore();
  });
});
