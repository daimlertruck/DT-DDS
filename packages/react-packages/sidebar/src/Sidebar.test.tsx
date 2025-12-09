import { act, fireEvent, render, screen } from '@testing-library/react';

import { useMedia, withProviders } from '@dt-dds/react-core';

import {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MINI,
  SIDEBAR_DEFAULT_OFFSET_TOP,
  SIDEBAR_DEFAULT_OFFSET_POSITION,
  SIDEBAR_DEFAULT_TRANSITION,
} from './constants';
import { Sidebar } from './Sidebar';

jest.mock('@dt-dds/react-core', () => ({
  ...jest.requireActual('@dt-dds/react-core'),
  useMedia: jest.fn(() => false),
}));

const mockedUseMedia = useMedia as jest.Mock;

const transitionAnimation = SIDEBAR_DEFAULT_TRANSITION;

describe('<Sidebar />', () => {
  const ProvidedSidebar = withProviders(Sidebar);

  beforeEach(() => {
    jest.useFakeTimers();
    mockedUseMedia.mockReturnValue(false); // desktop
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders with correct structure', () => {
    const { container } = render(
      <ProvidedSidebar ariaLabel='Navigation' dataTestId='sidebar' isExpanded>
        <div>Content</div>
      </ProvidedSidebar>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('desktop mode', () => {
    it('renders expanded with correct styles', () => {
      const { container } = render(
        <ProvidedSidebar dataTestId='sidebar' isExpanded offsetTop={60} />
      );
      const sidebar = container.querySelector('[data-testid="sidebar"]');

      expect(sidebar).toHaveStyle({
        width: `${SIDEBAR_WIDTH}px`,
        left: '0px',
        top: '60px',
        transition: transitionAnimation,
      });
      expect(screen.queryByTestId('mobile-backdrop')).toBeNull();
    });

    it('renders collapsed with mini width', () => {
      const { container } = render(
        <ProvidedSidebar dataTestId='sidebar' isExpanded={false} />
      );
      const sidebar = container.querySelector('[data-testid="sidebar"]');
      expect(sidebar).toHaveStyle({ width: `${SIDEBAR_WIDTH_MINI}px` });
    });
  });

  describe('mobile mode', () => {
    beforeEach(() => {
      mockedUseMedia.mockReturnValue(true);
    });

    it('renders collapsed without backdrop', () => {
      render(<ProvidedSidebar dataTestId='sidebar' isExpanded={false} />);
      expect(screen.queryByTestId('mobile-backdrop')).toBeNull();
    });

    it('expands with backdrop and correct styles', () => {
      const { container } = render(
        <ProvidedSidebar dataTestId='sidebar' isExpanded offsetTop={60} />
      );

      expect(screen.getByTestId('mobile-backdrop')).toBeInTheDocument();

      act(() => jest.advanceTimersByTime(50));

      const sidebar = container.querySelector('[data-testid="sidebar"]');
      expect(sidebar).toHaveStyle({
        width: `${SIDEBAR_WIDTH}px`,
        right: `${SIDEBAR_DEFAULT_OFFSET_POSITION}px`,
        top: `${SIDEBAR_DEFAULT_OFFSET_TOP}px`, // offsetTop ignored on mobile
        transition: transitionAnimation,
      });
    });

    it('collapses with animation sequence', () => {
      const { container, rerender } = render(
        <ProvidedSidebar dataTestId='sidebar' isExpanded />
      );

      act(() => jest.advanceTimersByTime(50));
      expect(screen.getByTestId('mobile-backdrop')).toBeInTheDocument();

      rerender(<ProvidedSidebar dataTestId='sidebar' isExpanded={false} />);

      const sidebar = container.querySelector('[data-testid="sidebar"]');
      expect(sidebar).toHaveStyle({ right: `-${SIDEBAR_WIDTH}px` });

      act(() => jest.advanceTimersByTime(200));
      expect(screen.queryByTestId('mobile-backdrop')).toBeNull();
    });
  });

  describe('onToggle callback', () => {
    it('calls onToggle on backdrop click', () => {
      mockedUseMedia.mockReturnValue(true);
      const handleToggle = jest.fn();

      render(<ProvidedSidebar isExpanded onToggle={handleToggle} />);

      act(() => jest.advanceTimersByTime(50));
      fireEvent.click(screen.getByTestId('mobile-backdrop'));

      expect(handleToggle).toHaveBeenCalledWith(false);
    });

    it('calls onToggle with false when expanded and toggled', () => {
      mockedUseMedia.mockReturnValue(true);
      const handleToggle = jest.fn();

      render(<ProvidedSidebar isExpanded onToggle={handleToggle} />);

      act(() => jest.advanceTimersByTime(50));
      fireEvent.click(screen.getByTestId('mobile-backdrop'));

      expect(handleToggle).toHaveBeenCalledWith(false);
    });

    it('calls onToggle with false when pressing Escape key on mobile', () => {
      mockedUseMedia.mockReturnValue(true);
      const handleToggle = jest.fn();

      render(<ProvidedSidebar isExpanded onToggle={handleToggle} />);

      act(() => jest.advanceTimersByTime(50));
      fireEvent.keyDown(document, { key: 'Escape' });

      expect(handleToggle).toHaveBeenCalledWith(false);
    });

    it('does not call onToggle on Escape when sidebar is collapsed', () => {
      mockedUseMedia.mockReturnValue(true);
      const handleToggle = jest.fn();

      render(<ProvidedSidebar isExpanded={false} onToggle={handleToggle} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(handleToggle).not.toHaveBeenCalled();
    });

    it('does not call onToggle on Escape in desktop mode', () => {
      mockedUseMedia.mockReturnValue(false);
      const handleToggle = jest.fn();

      render(<ProvidedSidebar isExpanded onToggle={handleToggle} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(handleToggle).not.toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    it('clears timeout on unmount and state changes', () => {
      mockedUseMedia.mockReturnValue(true);
      const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');

      const { rerender, unmount } = render(
        <ProvidedSidebar dataTestId='sidebar' isExpanded />
      );

      rerender(<ProvidedSidebar dataTestId='sidebar' isExpanded={false} />);
      const callsAfterRerender = clearTimeoutSpy.mock.calls.length;
      expect(callsAfterRerender).toBeGreaterThan(0);

      unmount();
      expect(clearTimeoutSpy.mock.calls.length).toBeGreaterThan(
        callsAfterRerender
      );

      clearTimeoutSpy.mockRestore();
    });
  });
});
