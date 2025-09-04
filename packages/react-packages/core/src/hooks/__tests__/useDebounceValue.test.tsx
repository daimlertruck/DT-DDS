import { renderHook, act } from '@testing-library/react';

import useDebounceValue from '../useDebounceValue';

jest.useFakeTimers();

describe('useDebounceValue', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('should return null initially', () => {
    const { result } = renderHook(() => useDebounceValue('test', 500));
    expect(result.current).toBe(null);
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceValue(value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe(null);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial'); // Should still be old value

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should handle null values correctly', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceValue(value, 500),
      { initialProps: { value: 'test' } }
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('test');

    rerender({ value: null });
    expect(result.current).toBe('test'); // Should not change when value is null
  });

  it('should handle multiple rapid value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceValue(value, 500),
      { initialProps: { value: 'first' } }
    );

    // Rapid changes
    rerender({ value: 'second' });
    rerender({ value: 'third' });
    rerender({ value: 'fourth' });

    expect(result.current).toBe(null);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('fourth'); // Should be the last value
  });
});
