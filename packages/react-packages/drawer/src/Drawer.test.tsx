import { withProviders } from '@dt-dds/react-core';
import { defaultTheme as theme } from '@dt-dds/themes';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { default as Drawer } from './Drawer';

const animationMiliseconds =
  parseFloat(
    theme.animations.emphasizedDecelerate.duration.replace(/[^\d.]/g, '')
  ) * 1000;

describe('<Drawer /> component', () => {
  const ProvidedDrawer = withProviders(Drawer);
  const mockIntersectionObserve = jest.fn();

  const mockIntersectionObserver = (
    callback: (entry: Partial<IntersectionObserverEntry>[]) => void
  ) => {
    return {
      observe: mockIntersectionObserve.mockImplementation(
        (isIntersecting: boolean) => callback([{ isIntersecting }])
      ),
      disconnect: () => jest.fn(),
    };
  };

  beforeEach(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: mockIntersectionObserver,
    });
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders correctly with children', () => {
    const { container } = render(
      <ProvidedDrawer isVisible setIsVisible={jest.fn()}>
        <div>Example content</div>
      </ProvidedDrawer>
    );

    expect(container).toMatchSnapshot();
  });

  it('closes when clicking the overlay', () => {
    const setIsVisibleMock = jest.fn();

    render(
      <ProvidedDrawer isVisible setIsVisible={setIsVisibleMock}>
        <div>Example content</div>
      </ProvidedDrawer>
    );

    const overlay = screen.getByTestId('drawer-overlay');
    fireEvent.click(overlay);

    jest.advanceTimersByTime(animationMiliseconds);

    expect(setIsVisibleMock).toHaveBeenCalledWith(false);
  });

  it('closes when clicking the close button', () => {
    const setIsVisibleMock = jest.fn();

    render(
      <ProvidedDrawer isVisible setIsVisible={setIsVisibleMock}>
        <Drawer.Header />
        <div>Example content</div>
      </ProvidedDrawer>
    );

    const closeButton = screen.getByTestId('drawer-close-button');
    fireEvent.click(closeButton);

    jest.advanceTimersByTime(animationMiliseconds);

    expect(setIsVisibleMock).toHaveBeenCalledWith(false);
  });

  it('applies correct styles when visible', () => {
    render(
      <ProvidedDrawer isVisible setIsVisible={jest.fn()}>
        <div>Example content</div>
      </ProvidedDrawer>
    );

    const container = screen.getByTestId('drawer-content-container');
    expect(container).toHaveStyle('transform: translateX(0);');

    const overlay = screen.getByTestId('drawer-overlay');
    expect(overlay).toHaveStyle('opacity: 0.2;');
  });

  it('applies correct styles when not visible', async () => {
    render(
      <ProvidedDrawer isVisible={false} setIsVisible={jest.fn()}>
        <div>Example content</div>
      </ProvidedDrawer>
    );

    const container = screen.getByTestId('drawer-content-container');
    expect(container).toHaveStyle('transform: translateX(100%);');

    const overlay = screen.getByTestId('drawer-overlay');
    await waitFor(() => expect(overlay).toHaveStyle('opacity: 0;'));
  });

  it('displays with DrawerHeader and DrawerBody with expected prop values', () => {
    render(
      <ProvidedDrawer isVisible setIsVisible={jest.fn()}>
        <Drawer.Header>
          <Drawer.Title title='Drawer Title' />
          <div>Header Content</div>
        </Drawer.Header>
        <Drawer.Body>Body Content</Drawer.Body>
      </ProvidedDrawer>
    );

    const titleElement = screen.getByText('Drawer Title');
    expect(titleElement).toBeInTheDocument();

    const customHeaderContent = screen.getByText('Header Content');
    expect(customHeaderContent).toBeInTheDocument();

    const customBodyContent = screen.getByText('Body Content');
    expect(customBodyContent).toBeInTheDocument();
  });

  it('applies correct class when DrawerBody is not scrollable', () => {
    render(
      <ProvidedDrawer isVisible setIsVisible={jest.fn()}>
        <Drawer.Body>Body Content</Drawer.Body>
      </ProvidedDrawer>
    );

    expect(screen.getByTestId('drawer-body')).not.toHaveClass('hasScroll');
  });

  it('applies correct class when DrawerBody is scrollable', () => {
    render(
      <ProvidedDrawer isVisible setIsVisible={jest.fn()}>
        <Drawer.Header />
        <Drawer.Body>Body Content</Drawer.Body>
      </ProvidedDrawer>
    );

    mockIntersectionObserve(false);

    expect(screen.getByTestId('drawer-body')).toHaveClass('hasScroll');
    expect(screen.getByTestId('drawer-header')).toHaveStyleRule(
      'box-shadow',
      theme.shadows.xs,
      { target: ':has(+.hasScroll)' }
    );
  });
});
