import { useTheme } from '@emotion/react';

import { Code } from '@dt-dds/icons';
import { BaseProps, ComponentSize } from '@dt-dds/react-core';

import { IconStyled } from './Icon.styled';
import { Variant } from './types';

export interface IconProps extends Omit<BaseProps, 'children'> {
  code: Code;
  color?: string;
  size?: ComponentSize;
  variant?: Variant;
}

export const Icon = ({
  code,
  color,
  dataTestId,
  size = 'large',
  style,
  variant = 'outlined',
}: IconProps) => {
  const theme = useTheme();

  return (
    <IconStyled
      color={color ?? theme.palette.content.default}
      data-testid={dataTestId ?? 'icon'}
      size={size}
      style={style}
      variant={variant}
    >
      {code}
    </IconStyled>
  );
};
