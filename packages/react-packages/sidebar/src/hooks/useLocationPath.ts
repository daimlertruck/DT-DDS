import { useEffect, useState } from 'react';

import { getCurrentPath } from '../utils/urlUtils';

// Hook to track the current URL pathname
export const useLocationPath = () => {
  const [path, setPath] = useState(() => getCurrentPath());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLocationChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return path;
};
