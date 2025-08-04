import { formatObject } from '../formatter';

/**
 * Generates animations.ts file content
 */
export function generateAnimations(): string {
  const animations = {
    emphasizedDecelerate: {
      duration: '300ms',
      timingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
  };

  return `import { CustomTheme as Theme } from '../../types';

export const animations: Theme['animations'] = ${formatObject(
    animations
  )} as const;
`;
}
