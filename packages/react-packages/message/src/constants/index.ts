import { Code } from '@dt-dds/icons';

import { MessageType, OMessageType } from '../types';

export const MESSAGE_ICONS: Partial<Record<MessageType, Code>> = {
  [OMessageType.Error]: 'error',
  [OMessageType.Info]: 'info',
  [OMessageType.Success]: 'check_circle',
  [OMessageType.Warning]: 'warning',
};
