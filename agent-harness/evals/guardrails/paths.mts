// Path comparisons for run.mts's safety checks. They compare real paths, because git reports real
// paths and the temp dir is often behind a symlink (macOS: /var → /private/var).

import { realpathSync } from 'node:fs';
import { relative, resolve } from 'node:path';

export const real = (path: string): string => {
  try {
    return realpathSync(path);
  } catch {
    return resolve(path);
  }
};

export const samePath = (a: string, b: string): boolean => real(a) === real(b);

export const isInside = (parent: string, child: string): boolean => {
  const path = relative(real(parent), real(child));
  return path !== '' && !path.startsWith('..');
};
