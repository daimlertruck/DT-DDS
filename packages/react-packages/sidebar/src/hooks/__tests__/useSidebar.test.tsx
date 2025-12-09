import { act, renderHook } from '@testing-library/react';

import { useSidebar } from '../useSidebar';

describe('useSidebar', () => {
  it('initializes with default state (false) when no options provided', () => {
    const { result } = renderHook(() => useSidebar());
    expect(result.current.isExpanded).toBe(false);
  });

  it('initializes with provided isExpanded option', () => {
    const { result } = renderHook(() => useSidebar({ isExpanded: true }));
    expect(result.current.isExpanded).toBe(true);
  });

  it('toggles sidebar state', () => {
    const { result } = renderHook(() => useSidebar({ isExpanded: false }));

    expect(result.current.isExpanded).toBe(false);

    act(() => result.current.toggleSidebar());
    expect(result.current.isExpanded).toBe(true);

    act(() => result.current.toggleSidebar());
    expect(result.current.isExpanded).toBe(false);
  });

  it('allows direct state setting via setIsExpanded', () => {
    const { result } = renderHook(() => useSidebar({ isExpanded: false }));

    expect(result.current.isExpanded).toBe(false);

    act(() => result.current.setIsExpanded(true));
    expect(result.current.isExpanded).toBe(true);

    act(() => result.current.setIsExpanded(false));
    expect(result.current.isExpanded).toBe(false);
  });

  it('returns isExpanded, setIsExpanded, and toggleSidebar', () => {
    const { result } = renderHook(() => useSidebar());

    expect(result.current).toHaveProperty('isExpanded');
    expect(result.current).toHaveProperty('setIsExpanded');
    expect(result.current).toHaveProperty('toggleSidebar');
    expect(typeof result.current.setIsExpanded).toBe('function');
    expect(typeof result.current.toggleSidebar).toBe('function');
  });

  it('maintains independent state across multiple hook instances', () => {
    const { result: result1 } = renderHook(() =>
      useSidebar({ isExpanded: true })
    );
    const { result: result2 } = renderHook(() =>
      useSidebar({ isExpanded: false })
    );

    expect(result1.current.isExpanded).toBe(true);
    expect(result2.current.isExpanded).toBe(false);

    act(() => result1.current.toggleSidebar());
    act(() => result2.current.toggleSidebar());

    expect(result1.current.isExpanded).toBe(false);
    expect(result2.current.isExpanded).toBe(true);
  });
});
