import { fireEvent, render, screen } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { SidebarBackdrop } from './SidebarBackdrop';
import { SidebarBackdropStyled } from './SidebarBackdrop.styled';

describe('<SidebarBackdrop /> component', () => {
  const ProvidedSidebarBackdrop = withProviders(SidebarBackdrop);

  it('renders when isOpen is true', () => {
    render(
      <ProvidedSidebarBackdrop isOpen>
        <div>Test content</div>
      </ProvidedSidebarBackdrop>
    );

    const backdrop = screen.getByTestId('sidebar-backdrop');
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveTextContent('Test content');
  });

  it('does not render when isOpen is false', () => {
    render(
      <ProvidedSidebarBackdrop isOpen={false}>
        <div>Test content</div>
      </ProvidedSidebarBackdrop>
    );

    expect(screen.queryByTestId('sidebar-backdrop')).toBeNull();
  });

  it('applies display none style when isOpen is false', () => {
    const TestComponent = withProviders(SidebarBackdropStyled);

    const { container } = render(
      <TestComponent data-testid='test-backdrop' isOpen={false} />
    );
    const element = container.querySelector(
      '[data-testid="test-backdrop"]'
    ) as HTMLElement;

    expect(element).toHaveStyle({ display: 'none' });
  });

  it('calls onBackdropClick when clicking directly on backdrop', () => {
    const handleBackdropClick = jest.fn();

    render(
      <ProvidedSidebarBackdrop isOpen onBackdropClick={handleBackdropClick}>
        <div>Test content</div>
      </ProvidedSidebarBackdrop>
    );

    const backdrop = screen.getByTestId('sidebar-backdrop');
    fireEvent.click(backdrop);

    expect(handleBackdropClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onBackdropClick when clicking on children', () => {
    const handleBackdropClick = jest.fn();

    render(
      <ProvidedSidebarBackdrop isOpen onBackdropClick={handleBackdropClick}>
        <div data-testid='child-content'>Test content</div>
      </ProvidedSidebarBackdrop>
    );

    const child = screen.getByTestId('child-content');
    fireEvent.click(child);

    expect(handleBackdropClick).not.toHaveBeenCalled();
  });

  it('renders children correctly', () => {
    render(
      <ProvidedSidebarBackdrop isOpen>
        <div data-testid='child-1'>Child 1</div>
        <div data-testid='child-2'>Child 2</div>
      </ProvidedSidebarBackdrop>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('uses custom dataTestId when provided', () => {
    render(
      <ProvidedSidebarBackdrop dataTestId='custom-backdrop' isOpen>
        <div>Test content</div>
      </ProvidedSidebarBackdrop>
    );

    expect(screen.getByTestId('custom-backdrop')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar-backdrop')).toBeNull();
  });

  it('uses default dataTestId when not provided', () => {
    render(
      <ProvidedSidebarBackdrop isOpen>
        <div>Test content</div>
      </ProvidedSidebarBackdrop>
    );

    expect(screen.getByTestId('sidebar-backdrop')).toBeInTheDocument();
  });

  it('does not call onBackdropClick when handler is not provided', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ProvidedSidebarBackdrop isOpen>
        <div>Test content</div>
      </ProvidedSidebarBackdrop>
    );

    const backdrop = screen.getByTestId('sidebar-backdrop');
    fireEvent.click(backdrop);

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
