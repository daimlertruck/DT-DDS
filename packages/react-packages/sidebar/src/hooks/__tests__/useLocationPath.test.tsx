import { act, renderHook } from '@testing-library/react';

import * as urlUtils from '../../utils/urlUtils';
import { useLocationPath } from '../useLocationPath';

describe('useLocationPath', () => {
  let locationMock: Location;

  beforeEach(() => {
    // Create a mock location object
    locationMock = {
      pathname: '/',
      href: 'http://localhost/',
      origin: 'http://localhost',
    } as Location;

    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: locationMock,
      writable: true,
      configurable: true,
    });
  });

  it('returns current pathname on initial render', () => {
    locationMock.pathname = '/dashboard';

    const { result } = renderHook(() => useLocationPath());

    expect(result.current).toBe('/dashboard');
  });

  it('updates when popstate event fires', () => {
    const { result } = renderHook(() => useLocationPath());

    expect(result.current).toBe('/');

    act(() => {
      locationMock.pathname = '/settings';
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(result.current).toBe('/settings');
  });

  it('updates when hashchange event fires', () => {
    const { result } = renderHook(() => useLocationPath());

    expect(result.current).toBe('/');

    act(() => {
      locationMock.pathname = '/dashboard';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(result.current).toBe('/dashboard');
  });

  it('handles multiple location changes', () => {
    const { result } = renderHook(() => useLocationPath());

    expect(result.current).toBe('/');

    act(() => {
      locationMock.pathname = '/page1';
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(result.current).toBe('/page1');

    act(() => {
      locationMock.pathname = '/page2';
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(result.current).toBe('/page2');
  });

  it('cleans up event listeners on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useLocationPath());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'popstate',
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'hashchange',
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'popstate',
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'hashchange',
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('handles SSR environment gracefully', () => {
    const originalWindow = globalThis.window;

    // Mock getCurrentPath to return empty string (SSR behavior)
    const getCurrentPathSpy = jest
      .spyOn(urlUtils, 'getCurrentPath')
      .mockReturnValue('');

    const { result } = renderHook(() => useLocationPath());

    // Should return empty string in SSR
    expect(result.current).toBe('');

    // Restore
    getCurrentPathSpy.mockRestore();
    globalThis.window = originalWindow;
  });

  it('maintains independent state across multiple hook instances', () => {
    const { result: result1 } = renderHook(() => useLocationPath());
    const { result: result2 } = renderHook(() => useLocationPath());

    expect(result1.current).toBe('/');
    expect(result2.current).toBe('/');

    act(() => {
      locationMock.pathname = '/page1';
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    // Both should update independently
    expect(result1.current).toBe('/page1');
    expect(result2.current).toBe('/page1');
  });
});
