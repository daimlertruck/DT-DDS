import React from 'react';

import { render, screen } from '@testing-library/react';

import { useMedia } from '../../hooks';
import { withResponsive } from '../responsive';

import type { ResponsiveProps } from '../../types';

jest.mock('../../hooks', () => ({
  useMedia: jest.fn(),
}));

describe('withResponsive', () => {
  const mockUseMedia = useMedia as jest.Mock;

  type TestComponentProps = {
    children?: React.ReactNode;
  } & React.HTMLAttributes<HTMLDivElement> &
    ResponsiveProps;

  const TestComponent = ({
    children,
    ...props
  }: Omit<TestComponentProps, keyof ResponsiveProps>) => (
    <div data-testid='test-component' {...props}>
      {children}
    </div>
  );
  TestComponent.displayName = 'TestComponent';

  const createAnonymousComponent =
    () => (props: { children?: React.ReactNode }) =>
      <div {...props}>{props.children}</div>;

  beforeEach(() => {
    mockUseMedia.mockReset();
    mockUseMedia.mockReturnValue(false);
  });

  describe('Basic functionality', () => {
    it('renders when no responsive props provided', () => {
      const ResponsiveComponent =
        withResponsive<TestComponentProps>(TestComponent);

      render(<ResponsiveComponent>Content</ResponsiveComponent>);

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(mockUseMedia).toHaveBeenCalledTimes(2);
      expect(mockUseMedia).toHaveBeenCalledWith('(max-width: 0px)');
    });

    it('hides when hide prop matches', () => {
      mockUseMedia.mockReturnValue(true);
      const ResponsiveComponent =
        withResponsive<TestComponentProps>(TestComponent);

      render(
        <ResponsiveComponent hide='(min-width: 768px)'>
          Content
        </ResponsiveComponent>
      );

      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
      expect(mockUseMedia).toHaveBeenCalledWith('(min-width: 768px)');
    });

    it('shows when show prop matches', () => {
      mockUseMedia.mockReturnValue(true);
      const ResponsiveComponent =
        withResponsive<TestComponentProps>(TestComponent);

      render(
        <ResponsiveComponent show='(max-width: 767px)'>
          Content
        </ResponsiveComponent>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(mockUseMedia).toHaveBeenCalledWith('(max-width: 767px)');
    });

    it('hides when show prop does not match', () => {
      mockUseMedia.mockReturnValue(false);
      const ResponsiveComponent =
        withResponsive<TestComponentProps>(TestComponent);

      render(
        <ResponsiveComponent show='(max-width: 767px)'>
          Content
        </ResponsiveComponent>
      );

      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
      expect(mockUseMedia).toHaveBeenCalledWith('(max-width: 767px)');
    });
  });

  describe('Hide precedence', () => {
    it('prioritizes hide over show', () => {
      mockUseMedia.mockReturnValue(true);
      const ResponsiveComponent =
        withResponsive<TestComponentProps>(TestComponent);

      render(
        <ResponsiveComponent
          hide='(min-width: 768px)'
          show='(max-width: 767px)'
        >
          Content
        </ResponsiveComponent>
      );

      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
      expect(mockUseMedia).toHaveBeenCalledWith('(min-width: 768px)');
      expect(mockUseMedia).toHaveBeenCalledWith('(max-width: 767px)');
    });

    it('checks show when hide does not match', () => {
      mockUseMedia.mockReturnValueOnce(false).mockReturnValueOnce(true);

      const ResponsiveComponent =
        withResponsive<TestComponentProps>(TestComponent);

      render(
        <ResponsiveComponent
          hide='(min-width: 768px)'
          show='(max-width: 767px)'
        >
          Content
        </ResponsiveComponent>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(mockUseMedia).toHaveBeenCalledWith('(min-width: 768px)');
      expect(mockUseMedia).toHaveBeenCalledWith('(max-width: 767px)');
    });
  });

  describe('Display name', () => {
    it('preserves displayName', () => {
      expect(withResponsive(TestComponent).displayName).toBe('TestComponent');
    });

    it('uses component name when displayName missing', () => {
      const NamedComponent = ({
        children,
        ...props
      }: { children?: React.ReactNode } & ResponsiveProps) => (
        <div {...props}>{children}</div>
      );

      expect(withResponsive(NamedComponent).displayName).toBe('NamedComponent');
    });

    it('falls back to Component when anonymous', () => {
      const AnonymousComponent = createAnonymousComponent();
      Object.defineProperty(AnonymousComponent, 'name', { value: '' });

      expect(withResponsive(AnonymousComponent).displayName).toBe('Component');
    });
  });

  describe('Props forwarding', () => {
    it('forwards non-responsive props', () => {
      const ResponsiveComponent =
        withResponsive<TestComponentProps>(TestComponent);

      render(
        <ResponsiveComponent
          className='test-class'
          hide='(min-width: 768px)'
          id='test-id'
        >
          Content
        </ResponsiveComponent>
      );

      const component = screen.getByTestId('test-component');
      expect(component).toHaveClass('test-class');
      expect(component).toHaveAttribute('id', 'test-id');
    });
  });

  describe('Edge cases', () => {
    it('treats empty hide/show as dummy queries', () => {
      const ResponsiveComponent =
        withResponsive<TestComponentProps>(TestComponent);

      const { unmount } = render(
        <ResponsiveComponent hide=''>Content</ResponsiveComponent>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(mockUseMedia).toHaveBeenCalledWith('(max-width: 0px)');
      expect(mockUseMedia).toHaveBeenCalledTimes(2);

      unmount();
      mockUseMedia.mockClear();

      render(<ResponsiveComponent show=''>Content</ResponsiveComponent>);

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(mockUseMedia).toHaveBeenCalledWith('(max-width: 0px)');
      expect(mockUseMedia).toHaveBeenCalledTimes(2);
    });
  });
});
