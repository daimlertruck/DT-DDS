import { fireEvent, render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { SidebarToggle } from './SidebarToggle';
import { SidebarContextProvider, SidebarContextValue } from '../../context';

describe('<SidebarToggle /> component', () => {
  const ProvidedToggle = withProviders(SidebarToggle);

  const defaultContext: SidebarContextValue = {
    isExpanded: true,
    isMobile: false,
  };

  const renderToggle = (
    props = {},
    contextValue: SidebarContextValue = defaultContext
  ) => {
    return render(
      <SidebarContextProvider value={contextValue}>
        <ProvidedToggle {...props} />
      </SidebarContextProvider>
    );
  };

  it('renders toggle button with icon', () => {
    renderToggle();
    expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveTextContent('menu_open');
  });

  describe('click behavior', () => {
    it('calls context onToggle when no onClick provided', () => {
      const mockOnToggle = jest.fn();
      renderToggle({}, { ...defaultContext, onToggle: mockOnToggle });

      fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when provided (overrides onToggle)', () => {
      const mockOnClick = jest.fn();
      const mockOnToggle = jest.fn();
      renderToggle(
        { onClick: mockOnClick },
        { ...defaultContext, onToggle: mockOnToggle }
      );

      fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));

      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).not.toHaveBeenCalled();
    });

    it('handles click gracefully when neither onClick nor onToggle available', () => {
      renderToggle({}, { isExpanded: true, isMobile: false });

      fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    });
  });
});
