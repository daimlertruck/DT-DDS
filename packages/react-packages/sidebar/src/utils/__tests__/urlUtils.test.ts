import { getCurrentPath, getHrefPath, isCurrentUrl } from '../urlUtils';

const mockLocation = ({
  pathname,
  href,
  origin,
}: {
  pathname: string;
  href: string;
  origin: string;
}) => ({ pathname, href, origin } as Location);

describe('urlUtils', () => {
  describe('getCurrentPath', () => {
    it('returns current pathname from window.location', () => {
      const locationMock = mockLocation({
        pathname: '/dashboard',
        href: 'http://localhost/dashboard',
        origin: 'http://localhost',
      });

      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: locationMock,
        writable: true,
        configurable: true,
      });

      expect(getCurrentPath()).toBe('/dashboard');
    });

    it('returns empty string in SSR environment', () => {
      const originalWindow = globalThis.window;
      // @ts-expect-error - simulate SSR
      delete globalThis.window;

      expect(getCurrentPath()).toBe('');

      // Restore
      globalThis.window = originalWindow;
    });
  });

  describe('getHrefPath', () => {
    it('extracts pathname from absolute URL', () => {
      expect(getHrefPath('https://example.com/dashboard')).toBe('/dashboard');
      expect(getHrefPath('http://localhost:3000/settings')).toBe('/settings');
    });

    it('extracts pathname from relative URL', () => {
      // Create a mock location object
      const locationMock = mockLocation({
        pathname: '/',
        href: 'https://example.com/',
        origin: 'https://example.com',
      });

      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: locationMock,
        writable: true,
        configurable: true,
      });

      expect(getHrefPath('/dashboard')).toBe('/dashboard');
      expect(getHrefPath('/settings?tab=general')).toBe('/settings');
    });

    it('handles invalid URLs by falling back to normalized path', () => {
      const originalURL = window.URL;
      class ThrowingURL {
        constructor() {
          throw new TypeError('invalid url');
        }
      }

      // @ts-expect-error - override for test
      window.URL = ThrowingURL;

      try {
        expect(getHrefPath('invalid')).toBe('/invalid');
        expect(getHrefPath('/already-valid')).toBe('/already-valid');
      } finally {
        window.URL = originalURL;
      }
    });

    it('handles relative paths without leading slash', () => {
      const originalURL = window.URL;
      class ThrowingURL {
        constructor() {
          throw new TypeError('invalid url');
        }
      }

      // @ts-expect-error - override for test
      window.URL = ThrowingURL;

      try {
        expect(getHrefPath('dashboard')).toBe('/dashboard');
      } finally {
        window.URL = originalURL;
      }
    });

    it('handles empty string by returning normalized path', () => {
      // Empty string gets normalized to '/' in the fallback
      const result = getHrefPath('');
      expect(result).toBe('/');
    });
  });

  describe('isCurrentUrl', () => {
    let locationMock: Location;

    beforeEach(() => {
      // Create a mock location object
      locationMock = mockLocation({
        pathname: '/dashboard',
        href: 'http://localhost/dashboard',
        origin: 'http://localhost',
      });

      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: locationMock,
        writable: true,
        configurable: true,
      });
    });

    it('returns true when href matches current path', () => {
      expect(isCurrentUrl('/dashboard')).toBe(true);
      expect(isCurrentUrl('https://example.com/dashboard')).toBe(true);
    });

    it('returns false when href does not match current path', () => {
      expect(isCurrentUrl('/settings')).toBe(false);
      expect(isCurrentUrl('/dashboard/settings')).toBe(false);
    });

    it('returns false when href is undefined', () => {
      expect(isCurrentUrl(undefined)).toBe(false);
    });

    it('uses provided currentPath when given', () => {
      expect(isCurrentUrl('/settings', '/settings')).toBe(true);
      expect(isCurrentUrl('/dashboard', '/settings')).toBe(false);
    });

    it('handles query strings and hash in href', () => {
      // getHrefPath extracts only pathname, so query/hash are ignored
      expect(isCurrentUrl('/dashboard?tab=general')).toBe(true);
      expect(isCurrentUrl('/dashboard#section')).toBe(true);
    });
  });
});
