import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

/**
 * Portals provide a first-class way to render children into a
 * DOM node that exists outside the DOM hierarchy of the parent component.
 * reference -> https://reactjs.org/docs/portals.html
 */
export const Portal = ({ children, isOpen }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return isOpen ? createPortal(children, document.body) : null;
};
