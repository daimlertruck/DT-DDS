// Gets the current pathname from window.location
export const getCurrentPath = (): string => {
  if (typeof window === 'undefined') return '';
  return window.location.pathname;
};

// Extracts the pathname from an href string
export const getHrefPath = (href: string): string | null => {
  try {
    return new URL(
      href,
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost'
    ).pathname;
  } catch {
    return href.startsWith('/') ? href : `/${href}`;
  }
};

// Checks if an href matches the current URL pathname
export const isCurrentUrl = (href?: string, currentPath?: string): boolean => {
  if (!href) return false;
  const pathToCompare = currentPath ?? getCurrentPath();
  const hrefPath = getHrefPath(href);
  return hrefPath ? pathToCompare === hrefPath : false;
};
