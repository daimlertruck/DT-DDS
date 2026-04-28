import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { default as Drawer } from './Drawer';

describe('<Drawer /> component', () => {
  const ProvidedDrawer = withProviders(Drawer);

  it('renders correctly with children', () => {
    render(
      <ProvidedDrawer isVisible setIsVisible={jest.fn()}>
        <div>Example content</div>
      </ProvidedDrawer>
    );

    expect(screen.getByTestId('drawer-content-container')).toBeVisible();
    expect(screen.getByTestId('drawer-overlay')).toBeVisible();
    expect(screen.getByText('Example content')).toBeVisible();
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

    const drawerContainer = screen.getByTestId('drawer-content-container');
    fireEvent.transitionEnd(drawerContainer, { propertyName: 'transform' });

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

    const drawerContainer = screen.getByTestId('drawer-content-container');
    fireEvent.transitionEnd(drawerContainer, { propertyName: 'transform' });

    expect(setIsVisibleMock).toHaveBeenCalledWith(false);
  });

  it('closes when pressing the Escape key', () => {
    const setIsVisibleMock = jest.fn();

    render(
      <ProvidedDrawer isVisible setIsVisible={setIsVisibleMock}>
        <div>Example content</div>
      </ProvidedDrawer>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    const drawerContainer = screen.getByTestId('drawer-content-container');
    fireEvent.transitionEnd(drawerContainer, { propertyName: 'transform' });

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
    expect(titleElement).toBeVisible();

    const customHeaderContent = screen.getByText('Header Content');
    expect(customHeaderContent).toBeVisible();

    const customBodyContent = screen.getByText('Body Content');
    expect(customBodyContent).toBeVisible();
  });

  it('should render an icon in the title when icon prop is provided', () => {
    render(
      <ProvidedDrawer isVisible setIsVisible={jest.fn()}>
        <Drawer.Header>
          <Drawer.Title title='Drawer Title' icon='fire_truck' />
        </Drawer.Header>
      </ProvidedDrawer>
    );

    expect(screen.getByText('fire_truck')).toBeVisible();
    expect(screen.getByText('Drawer Title')).toBeVisible();
  });
});
