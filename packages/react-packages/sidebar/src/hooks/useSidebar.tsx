import { useState, useCallback } from 'react';

export interface UseSidebarOptions {
  isExpanded?: boolean;
}

export const useSidebar = (
  options: UseSidebarOptions = {}
): {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  toggleSidebar: () => void;
} => {
  const { isExpanded: initialExpanded = false } = options;

  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return {
    isExpanded,
    setIsExpanded,
    toggleSidebar,
  };
};
