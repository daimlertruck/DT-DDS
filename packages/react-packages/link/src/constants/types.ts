import { ComponentSize } from '@dt-dds/react-core';

export type LinkColor = 'primary' | 'secondary';
export type LinkFontWeight = 'regular' | 'bold';
export type LinkSize = Extract<ComponentSize, 'small' | 'medium' | 'large'>;
export type LinkVariant = 'standalone' | 'inline';
