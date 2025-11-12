import React from 'react';

import { render, screen } from '@testing-library/react';

import { useMedia } from '@dt-dds/react-core';

import { withResponsive, ResponsiveProps } from '../responsive';

jest.mock('@dt-dds/react-core', () => ({
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

  // Helper to create anonymous components for testing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createAnonymousComponent = () => (props: any) =>
    <div {...props}>{props.children}</div>;

  beforeEach(() => {
    mockUseMedia.mockReset();
    mockUseMedia.mockReturnValue(false);
  });

  describe('Basic functionality', () => {
    it('should render component when no hide or show props are provided', () => {
      const ResponsiveComponent =
        withResponsive<TestComponentProps>(TestComponent);

      render(<ResponsiveComponent>Content</ResponsiveComponent>);

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      // Hooks are always called with dummy queries to satisfy React Hook rules
      expect(mockUseMedia).toHaveBeenCalledTimes(2);
      expect(mockUseMedia).toHaveBeenCalledWith('(max-width: 0px)');
    });

    it('should hide component when hide prop matches media query', () => {
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

    it('should render component when hide prop does not match media query', () => {
      mockUseMedia.mockReturnValue(false);
      const ResponsiveComponent =
        withResponsive<TestComponentProps>(TestComponent);

      render(
        <ResponsiveComponent hide='(min-width: 768px)'>
          Content
        </ResponsiveComponent>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(mockUseMedia).toHaveBeenCalledWith('(min-width: 768px)');
    });

    it('should render component when show prop matches media query', () => {
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

    it('should hide component when show prop does not match media query', () => {
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

  describe('Hide prop precedence', () => {
    it('should prioritize hide prop when both hide and show are provided', () => {
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
      // Both hooks are always called, but hide takes precedence in logic
      expect(mockUseMedia).toHaveBeenCalledWith('(min-width: 768px)');
      expect(mockUseMedia).toHaveBeenCalledWith('(max-width: 767px)');
    });

    it('should check show prop when hide prop does not match', () => {
      mockUseMedia
        .mockReturnValueOnce(false) // hide check
        .mockReturnValueOnce(true); // show check

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

  describe('DisplayName preservation', () => {
    it('should preserve displayName from original component', () => {
      expect(withResponsive(TestComponent).displayName).toBe('TestComponent');
    });

    it('should use component name when displayName is not set', () => {
      const NamedComponent = ({
        children,
        ...props
      }: { children?: React.ReactNode } & ResponsiveProps) => (
        <div {...props}>{children}</div>
      );

      expect(withResponsive(NamedComponent).displayName).toBe('NamedComponent');
    });

    it('should use fallback "Component" when neither displayName nor name is available', () => {
      const AnonymousComponent = createAnonymousComponent();
      // Remove the function name to make it truly anonymous
      Object.defineProperty(AnonymousComponent, 'name', { value: '' });

      expect(withResponsive(AnonymousComponent).displayName).toBe('Component');
    });
  });

  describe('Props forwarding', () => {
    it('should forward all props including hide/show to wrapped component', () => {
      mockUseMedia.mockReturnValue(false);
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
    it('should treat empty string props as falsy and use dummy queries', () => {
      const ResponsiveComponent =
        withResponsive<TestComponentProps>(TestComponent);
      const { unmount } = render(
        <ResponsiveComponent hide=''>Content</ResponsiveComponent>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      // Empty string is falsy, so dummy query is used, but hooks are still called
      expect(mockUseMedia).toHaveBeenCalledWith('(max-width: 0px)');
      expect(mockUseMedia).toHaveBeenCalledTimes(2);

      unmount();
      mockUseMedia.mockClear();
      render(<ResponsiveComponent show=''>Content</ResponsiveComponent>);
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      // Empty string is falsy, so dummy query is used, but hooks are still called
      expect(mockUseMedia).toHaveBeenCalledWith('(max-width: 0px)');
      expect(mockUseMedia).toHaveBeenCalledTimes(2);
    });
  });
});
