import { ReactNode } from 'react';

import { BaseProps, Orientation } from '@dt-dds/react-core';

export const OMessageType = {
  Default: 'default',
  Error: 'error',
  Info: 'informative',
  Success: 'success',
  Warning: 'warning',
} as const;

export type MessageType = (typeof OMessageType)[keyof typeof OMessageType];

export interface MessageProps extends BaseProps {
  type: MessageType;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  description: ReactNode;
  orientation?: Orientation;
}
export interface ActionsProps extends BaseProps {
  type?: MessageType;
}
