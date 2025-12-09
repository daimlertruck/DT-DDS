import { render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { SidebarContextProvider } from '../../context';
import { SidebarSection } from '../SidebarSection';
import { SidebarContent } from './SidebarContent';

describe('<SidebarContent /> component', () => {
  const ProvidedContent = withProviders(SidebarContent);
  const ProvidedSection = withProviders(SidebarSection);
  const mockContextValue = {
    isExpanded: true,
    isMobile: false,
  };

  const renderContent = (children: React.ReactNode, props = {}) => {
    return render(
      <SidebarContextProvider value={mockContextValue}>
        <ProvidedContent {...props}>{children}</ProvidedContent>
      </SidebarContextProvider>
    );
  };

  it('wraps SidebarSection components', () => {
    renderContent(
      <ProvidedSection title='Test Section'>
        <div>Section Content</div>
      </ProvidedSection>
    );
    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Section Content')).toBeInTheDocument();
  });

  it('has overflow styles for scrolling when content overflows', () => {
    const { container } = renderContent(<div>Content</div>);
    const content = container.querySelector('[data-testid="sidebar-content"]');
    expect(content).toHaveStyle({ 'overflow-y': 'overlay' });
  });

  it('uses default data-testid when not provided', () => {
    renderContent(<div>Content</div>);
    expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
  });

  it('uses custom dataTestId when provided', () => {
    renderContent(<div>Content</div>, { dataTestId: 'custom-content' });
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar-content')).not.toBeInTheDocument();
  });
});
