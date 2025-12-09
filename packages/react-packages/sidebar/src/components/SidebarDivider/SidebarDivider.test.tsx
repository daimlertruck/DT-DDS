import React from 'react';

import { render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { SidebarDivider } from './SidebarDivider';

describe('<SidebarDivider /> component', () => {
  const ProvidedDivider = withProviders(SidebarDivider);

  it('renders with default data-testid', () => {
    render(<ProvidedDivider />);

    const divider = screen.getByTestId('sidebar-divider');
    expect(divider).toBeInTheDocument();
  });

  it('uses custom dataTestId when provided', () => {
    render(<ProvidedDivider dataTestId='custom-divider' />);

    expect(screen.getByTestId('custom-divider')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar-divider')).not.toBeInTheDocument();
  });

  it('renders as an hr separator element', () => {
    render(<ProvidedDivider />);

    const divider = screen.getByRole('separator');
    expect(divider.tagName.toLowerCase()).toBe('hr');
  });
});
