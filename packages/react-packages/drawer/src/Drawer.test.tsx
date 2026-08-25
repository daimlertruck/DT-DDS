import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { DrawerPosition } from './constants';
import { default as Drawer } from './Drawer';

type RenderDrawerOptions = {
  isVisible?: boolean;
  setIsVisible?: jest.Mock;
  position?: DrawerPosition;
  children?: React.ReactNode;
};

const ProvidedDrawer = withProviders(Drawer);

const renderDrawer = ({
  isVisible = true,
  setIsVisible = jest.fn(),
  position,
  children = <div>Example content</div>,
}: RenderDrawerOptions = {}) => {
  render(
    <ProvidedDrawer
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      {...(position ? { position } : {})}
    >
      {children}
    </ProvidedDrawer>
  );

  return {
    setIsVisible,
    getContainer: () => screen.getByTestId('drawer-content-container'),
    getOverlay: () => screen.getByTestId('drawer-overlay'),
    getCloseButton: () => screen.getByTestId('drawer-close-button'),
  };
};

describe('<Drawer /> component', () => {
  it('renders correctly with children', () => {
    const { getContainer, getOverlay } = renderDrawer();

    expect(getContainer()).toBeVisible();
    expect(getOverlay()).toBeVisible();
    expect(screen.getByText('Example content')).toBeVisible();
  });

  it('closes when clicking the overlay', () => {
    const { getOverlay, getContainer, setIsVisible } = renderDrawer();

    fireEvent.click(getOverlay());
    fireEvent.transitionEnd(getContainer(), { propertyName: 'transform' });

    expect(setIsVisible).toHaveBeenCalledWith(false);
  });

  it('closes when clicking the close button', () => {
    const { getCloseButton, getContainer, setIsVisible } = renderDrawer({
      children: (
        <>
          <Drawer.Header />
          <div>Example content</div>
        </>
      ),
    });

    fireEvent.click(getCloseButton());
    fireEvent.transitionEnd(getContainer(), { propertyName: 'transform' });

    expect(setIsVisible).toHaveBeenCalledWith(false);
  });

  it('closes when pressing the Escape key', () => {
    const { getContainer, setIsVisible } = renderDrawer();

    fireEvent.keyDown(document, { key: 'Escape' });
    fireEvent.transitionEnd(getContainer(), { propertyName: 'transform' });

    expect(setIsVisible).toHaveBeenCalledWith(false);
  });

  it('applies correct styles when visible', () => {
    const { getContainer, getOverlay } = renderDrawer({
      isVisible: true,
      position: 'right',
    });

    expect(getContainer()).toHaveStyle('transform: translateX(0);');
    expect(getOverlay()).toHaveStyle('opacity: 0.2;');
  });

  it('applies correct styles when not visible (right position)', async () => {
    const { getContainer, getOverlay } = renderDrawer({
      isVisible: false,
      position: 'right',
    });

    expect(getContainer()).toHaveStyle('transform: translateX(100%);');
    await waitFor(() => expect(getOverlay()).toHaveStyle('opacity: 0;'));
  });

  it('applies correct styles when not visible (left position)', async () => {
    const { getContainer, getOverlay } = renderDrawer({
      isVisible: false,
      position: 'left',
    });

    expect(getContainer()).toHaveStyle('transform: translateX(-100%);');
    await waitFor(() => expect(getOverlay()).toHaveStyle('opacity: 0;'));
  });

  it('anchors to the right edge when position is right', () => {
    const { getContainer } = renderDrawer({ position: 'right' });

    expect(getContainer()).toHaveStyle('right: 0;');
  });

  it('anchors to the left edge when position is left', () => {
    const { getContainer } = renderDrawer({ position: 'left' });

    expect(getContainer()).toHaveStyle('left: 0;');
  });

  it('uses the component default position when none is provided', () => {
    const { getContainer } = renderDrawer();

    expect(getContainer()).toHaveStyle('right: 0;');
  });

  it('displays with DrawerHeader and DrawerBody with expected prop values', () => {
    renderDrawer({
      children: (
        <>
          <Drawer.Header>
            <Drawer.Title title='Drawer Title' />
            <div>Header Content</div>
          </Drawer.Header>
          <Drawer.Body>Body Content</Drawer.Body>
        </>
      ),
    });

    expect(screen.getByText('Drawer Title')).toBeVisible();
    expect(screen.getByText('Header Content')).toBeVisible();
    expect(screen.getByText('Body Content')).toBeVisible();
  });

  it('should render an icon in the title when icon prop is provided', () => {
    renderDrawer({
      children: (
        <Drawer.Header>
          <Drawer.Title title='Drawer Title' icon='fire_truck' />
        </Drawer.Header>
      ),
    });

    expect(screen.getByText('fire_truck')).toBeVisible();
    expect(screen.getByText('Drawer Title')).toBeVisible();
  });
});
