import { act, renderHook } from '@testing-library/react';

import { useDisclosureState } from '../useDisclosureState';

describe('useDisclosureState', () => {
  describe('uncontrolled mode', () => {
    it('initializes with defaultExpanded value', () => {
      const { result } = renderHook(() =>
        useDisclosureState({
          defaultExpanded: true,
          shouldAutoExpand: false,
          autoExpandKey: null,
        })
      );

      expect(result.current.expanded).toBe(true);
    });

    it('toggles state when not controlled', () => {
      const { result } = renderHook(() =>
        useDisclosureState({
          defaultExpanded: false,
          shouldAutoExpand: false,
          autoExpandKey: null,
        })
      );

      expect(result.current.expanded).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.expanded).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.expanded).toBe(false);
    });

    it('calls onToggle callback when provided', () => {
      const onToggle = jest.fn();

      const { result } = renderHook(() =>
        useDisclosureState({
          defaultExpanded: false,
          onToggle,
          shouldAutoExpand: false,
          autoExpandKey: null,
        })
      );

      act(() => {
        result.current.toggle();
      });

      expect(onToggle).toHaveBeenCalledWith(true);

      act(() => {
        result.current.toggle();
      });

      expect(onToggle).toHaveBeenCalledWith(false);
      expect(onToggle).toHaveBeenCalledTimes(2);
    });
  });

  describe('controlled mode', () => {
    it('uses controlledExpanded value when provided', () => {
      const { result } = renderHook(
        ({ controlledExpanded }) =>
          useDisclosureState({
            controlledExpanded,
            defaultExpanded: false,
            shouldAutoExpand: false,
            autoExpandKey: null,
          }),
        {
          initialProps: { controlledExpanded: true },
        }
      );

      expect(result.current.expanded).toBe(true);
    });

    it('updates when controlledExpanded changes', () => {
      const { result, rerender } = renderHook(
        ({ controlledExpanded }) =>
          useDisclosureState({
            controlledExpanded,
            defaultExpanded: false,
            shouldAutoExpand: false,
            autoExpandKey: null,
          }),
        {
          initialProps: { controlledExpanded: false },
        }
      );

      expect(result.current.expanded).toBe(false);

      rerender({ controlledExpanded: true });

      expect(result.current.expanded).toBe(true);
    });

    it('calls onToggle but does not update internal state when controlled', () => {
      const onToggle = jest.fn();

      const { result, rerender } = renderHook(
        ({ controlledExpanded }) =>
          useDisclosureState({
            controlledExpanded,
            defaultExpanded: false,
            onToggle,
            shouldAutoExpand: false,
            autoExpandKey: null,
          }),
        {
          initialProps: { controlledExpanded: false },
        }
      );

      act(() => {
        result.current.toggle();
      });

      expect(onToggle).toHaveBeenCalledWith(true);
      // State should remain false until parent updates controlledExpanded
      expect(result.current.expanded).toBe(false);

      rerender({ controlledExpanded: true });

      expect(result.current.expanded).toBe(true);
    });
  });

  describe('auto-expansion', () => {
    it('auto-expands when shouldAutoExpand is true and autoExpandKey changes', () => {
      const { result, rerender } = renderHook(
        ({ autoExpandKey }) =>
          useDisclosureState({
            defaultExpanded: false,
            shouldAutoExpand: true,
            autoExpandKey,
          }),
        {
          initialProps: { autoExpandKey: 'key1' },
        }
      );

      // On initial render, if defaultExpanded is false, it stays false
      // Auto-expansion only happens when the key changes
      expect(result.current.expanded).toBe(false);

      // New key should trigger expansion (key changed)
      rerender({ autoExpandKey: 'key2' });
      expect(result.current.expanded).toBe(true);

      // Same key should not trigger expansion again
      rerender({ autoExpandKey: 'key2' });
      expect(result.current.expanded).toBe(true);
    });

    it('does not auto-expand when shouldAutoExpand is false', () => {
      const { result, rerender } = renderHook(
        ({ autoExpandKey }) =>
          useDisclosureState({
            defaultExpanded: false,
            shouldAutoExpand: false,
            autoExpandKey,
          }),
        {
          initialProps: { autoExpandKey: 'key1' },
        }
      );

      expect(result.current.expanded).toBe(false);

      rerender({ autoExpandKey: 'key2' });

      expect(result.current.expanded).toBe(false);
    });

    it('does not auto-expand when controlled', () => {
      const { result, rerender } = renderHook(
        ({ autoExpandKey }) =>
          useDisclosureState({
            controlledExpanded: false,
            defaultExpanded: false,
            shouldAutoExpand: true,
            autoExpandKey,
          }),
        {
          initialProps: { autoExpandKey: 'key1' },
        }
      );

      expect(result.current.expanded).toBe(false);

      rerender({ autoExpandKey: 'key2' });

      expect(result.current.expanded).toBe(false);
    });

    it('resets lastAutoExpandKey when shouldAutoExpand becomes false', () => {
      const { result, rerender } = renderHook(
        ({ shouldAutoExpand, autoExpandKey }) =>
          useDisclosureState({
            defaultExpanded: false,
            shouldAutoExpand,
            autoExpandKey,
          }),
        {
          initialProps: { shouldAutoExpand: true, autoExpandKey: 'key1' },
        }
      );

      // Initial render with defaultExpanded=false stays false
      expect(result.current.expanded).toBe(false);

      // Change key to trigger expansion
      rerender({ shouldAutoExpand: true, autoExpandKey: 'key2' });
      expect(result.current.expanded).toBe(true);

      // Disable auto-expand
      rerender({ shouldAutoExpand: false, autoExpandKey: 'key2' });
      expect(result.current.expanded).toBe(true); // State doesn't change, just tracking resets

      // Re-enable with new key - should expand because lastAutoExpandKey was reset
      rerender({ shouldAutoExpand: true, autoExpandKey: 'key3' });
      expect(result.current.expanded).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('handles null autoExpandKey', () => {
      const { result } = renderHook(() =>
        useDisclosureState({
          defaultExpanded: false,
          shouldAutoExpand: true,
          autoExpandKey: null,
        })
      );

      expect(result.current.expanded).toBe(false);
    });

    it('converts falsy expanded values to false', () => {
      const { result } = renderHook(
        ({ controlledExpanded }) =>
          useDisclosureState({
            controlledExpanded,
            defaultExpanded: false,
            shouldAutoExpand: false,
            autoExpandKey: null,
          }),
        {
          initialProps: {
            controlledExpanded: undefined,
          },
        }
      );

      // When controlledExpanded is undefined, it uses internal state
      expect(result.current.expanded).toBe(false);
    });

    it('maintains independent state across multiple hook instances', () => {
      const { result: result1 } = renderHook(() =>
        useDisclosureState({
          defaultExpanded: false,
          shouldAutoExpand: false,
          autoExpandKey: null,
        })
      );

      const { result: result2 } = renderHook(() =>
        useDisclosureState({
          defaultExpanded: true,
          shouldAutoExpand: false,
          autoExpandKey: null,
        })
      );

      expect(result1.current.expanded).toBe(false);
      expect(result2.current.expanded).toBe(true);

      act(() => {
        result1.current.toggle();
      });

      expect(result1.current.expanded).toBe(true);
      expect(result2.current.expanded).toBe(true);
    });
  });
});
