import { Theme as CustomTheme } from '@dt-dds/react-core';
export const OMessageType = {
  Default: 'default',
  Error: 'error',
  Info: 'informative',
  Success: 'success',
  Warning: 'warning',
} as const;

export type MessageType = (typeof OMessageType)[keyof typeof OMessageType];
