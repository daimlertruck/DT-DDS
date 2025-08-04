import { CustomTheme as Theme } from '../../types';

export const animations: Theme['animations'] = {
  emphasizedDecelerate: {
    duration: '300ms',
    timingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
} as const;
