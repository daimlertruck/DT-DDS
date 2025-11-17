import { ComponentSize } from '@dt-dds/react-core';

export type LinkColor = 'accent' | 'secondary';
export type LinkSize = Extract<ComponentSize, 'small' | 'medium' | 'large'>;
export type LinkVariant = 'standalone' | 'inline';
