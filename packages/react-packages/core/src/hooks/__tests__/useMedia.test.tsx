import { renderHook, act } from '@testing-library/react';

import useMedia from '../useMedia';

describe('useMedia', () => {
  let mockMatchMedia: jest.Mock;
  let mockMediaQueryList: {
    matches: boolean;
    addEventListener: jest.Mock;
    removeEventListener: jest.Mock;
  };

  beforeEach(() => {
    mockMediaQueryList = {
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    mockMatchMedia = jest.fn().mockReturnValue(mockMediaQueryList);
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return false initially when media query does not match', () => {
    mockMediaQueryList.matches = false;

    const { result } = renderHook(() => useMedia('(max-width: 768px)'));

    expect(result.current).toBe(false);
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 768px)');
  });

  it('should return true initially when media query matches', () => {
    mockMediaQueryList.matches = true;

    const { result } = renderHook(() => useMedia('(max-width: 768px)'));

    expect(result.current).toBe(true);
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 768px)');
  });

  it('should add and remove event listener', () => {
    const { unmount } = renderHook(() => useMedia('(max-width: 768px)'));

    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );

    unmount();

    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('should update state when media query changes', () => {
    mockMediaQueryList.matches = false;

    const { result } = renderHook(() => useMedia('(max-width: 768px)'));

    expect(result.current).toBe(false);

    // Simulate media query change
    mockMediaQueryList.matches = true;
    const changeListener = mockMediaQueryList.addEventListener.mock.calls[0][1];

    act(() => {
      changeListener();
    });

    expect(result.current).toBe(true);
  });
});
