import { RefObject, useEffect } from 'react';

interface UseClickOutsideProps {
  refs: Array<RefObject<HTMLElement | null>>;
  handler: () => void;
  ignore?: Array<HTMLElement | null | undefined>;
}

/**
 * Handles the click outside of a element. For example, when clicking outside of
 * dropdown, it should close.
 * @param {string} ref - Ref object of the element
 * @param {string} handler - Action to be performed when user click outside of element
 * @param {string} ignore - Array of elements to be ignored when clicking outside
 */
const useClickOutside = ({ refs = [], handler }: UseClickOutsideProps) => {
  useEffect(() => {
    const eventHandler = (event: MouseEvent) => {
      for (const ref of refs) {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
      }

      handler();
    };

    document.addEventListener('mousedown', eventHandler);

    return () => document.removeEventListener('mousedown', eventHandler);
  });
};

export default useClickOutside;
