import { ComponentSize } from '@dt-dds/react-core';

import { AvatarType } from '../constants';

export type AvatarSize = Extract<ComponentSize, 'small' | 'medium' | 'large'>;

export interface AvatarStyledProps {
  type?: AvatarType;
  size: AvatarSize;
}

export interface AvatarProps extends AvatarStyledProps {
  title: string;
  imageSrc?: string;
  dataTestId?: string;
  style?: React.CSSProperties;
  customInitials?: string;
  hasTooltip?: boolean;
  collapsedCount?: string;
}
