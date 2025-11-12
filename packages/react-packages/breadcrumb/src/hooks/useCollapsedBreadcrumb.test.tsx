import { ReactNode } from 'react';

import { renderHook, act } from '@testing-library/react';

import { BaseProps, withProviders } from '@dt-dds/react-core';

import { Breadcrumb } from '../Breadcrumb';
import { useCollapsedBreadcrumb } from './useCollapsedBreadcrumb';

const matchMediaMock = jest.fn();

const matchMedia = (matches: boolean) => {
  matchMediaMock.mockReturnValue({ ...window.matchMedia('desktop'), matches });
};

jest.useFakeTimers();

const largeBreadcrumb = ['Name 1', 'Name 2', 'Name 3', 'Name 4'];

describe('useCollapsedBreadcrumb', () => {
  beforeEach(() => {
    matchMedia(true);
    jest.spyOn(window, 'matchMedia').mockImplementation(matchMediaMock);
  });

  it('should not modify children if on desktop', () => {
    const { result } = renderUseCollapsedBreadcrumb(largeBreadcrumb);

    expect(result.current.visibleChildren).toBe(largeBreadcrumb);
  });

  it('should collapse if on mobile and breadcrumbs are too large', () => {
    matchMedia(false);
    const { result } = renderUseCollapsedBreadcrumb(largeBreadcrumb, true);

    expect(result.current.visibleChildren).toMatchInlineSnapshot(`
      [
        "Name 1",
        "Name 2",
        "Name 3",
        "Name 4",
      ]
    `);
  });

  it('should not collapse if on mobile and breadcrumbs are not too large', () => {
    matchMedia(false);
    const { result } = renderUseCollapsedBreadcrumb('Name 1');

    expect(result.current.visibleChildren).toBe('Name 1');
  });
});

const ProvidedBreadcrumb = withProviders(Breadcrumb);

const wrapper = ({ children }: BaseProps) => (
  <ProvidedBreadcrumb>{children}</ProvidedBreadcrumb>
);

const renderUseCollapsedBreadcrumb = (
  children: ReactNode,
  isBreadcrumbsTooLarge = false
) => {
  const containerRef = document.createElement('div');
  Object.defineProperty(containerRef, 'offsetHeight', {
    writable: true,
    value: isBreadcrumbsTooLarge ? 60 : 30,
  });

  const result = renderHook(() => useCollapsedBreadcrumb(children), {
    wrapper,
  });

  act(() => {
    jest.advanceTimersByTime(501);
  });

  return result;
};
