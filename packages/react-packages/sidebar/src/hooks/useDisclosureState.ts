import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseDisclosureStateOptions {
  controlledExpanded?: boolean;
  defaultExpanded: boolean;
  onToggle?: (expanded: boolean) => void;
  shouldAutoExpand: boolean;
  autoExpandKey: string | null;
}

// Determines if auto-expand should trigger for a new key.
const shouldTriggerAutoExpand = (
  isControlled: boolean,
  shouldAutoExpand: boolean,
  autoExpandKey: string | null,
  lastKey: string | null
): boolean =>
  !isControlled &&
  shouldAutoExpand &&
  !!autoExpandKey &&
  lastKey !== autoExpandKey;

// Hook to manage sidebar item expand/collapse (disclosure) state.
export const useDisclosureState = ({
  controlledExpanded,
  defaultExpanded,
  onToggle,
  shouldAutoExpand,
  autoExpandKey,
}: UseDisclosureStateOptions): {
  expanded: boolean;
  toggle: () => void;
} => {
  const isControlled = controlledExpanded !== undefined;

  const [internalExpanded, setInternalExpanded] = useState(
    () => defaultExpanded
  );

  const lastAutoExpandKey = useRef<string | null>(
    shouldAutoExpand ? autoExpandKey : null
  );

  // Auto-expand when URL changes to match this item or its descendants
  useEffect(() => {
    const shouldTrigger = shouldTriggerAutoExpand(
      isControlled,
      shouldAutoExpand,
      autoExpandKey,
      lastAutoExpandKey.current
    );

    if (!shouldAutoExpand) {
      lastAutoExpandKey.current = null;
      return;
    }

    if (shouldTrigger) {
      setInternalExpanded(true);
      lastAutoExpandKey.current = autoExpandKey;
    }
  }, [autoExpandKey, isControlled, shouldAutoExpand]);

  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const toggle = useCallback(() => {
    const next = !expanded;
    if (!isControlled) {
      setInternalExpanded(next);
    }

    onToggle?.(next);
  }, [expanded, isControlled, onToggle]);

  return {
    expanded: !!expanded,
    toggle,
  };
};
