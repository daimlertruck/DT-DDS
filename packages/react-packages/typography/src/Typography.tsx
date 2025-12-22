import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { useTheme } from '@emotion/react';

import { BaseProps } from '@dt-dds/react-core';
import { CustomTheme as Theme } from '@dt-dds/themes';

import { Colors, Elements } from './types';
import { TypographyStyled } from './Typography.styled';

type TypographyBaseProps = {
  color?: Colors;
  fontStyles?: keyof Theme['fontStyles'];
} & BaseProps;

type TypographyVariant<E extends Elements> = TypographyBaseProps & {
  element?: E;
} & ComponentPropsWithoutRef<E>;

export type TypographyProps = {
  [E in Elements]: TypographyVariant<E>;
}[Elements];

export const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    {
      children,
      element,
      fontStyles,
      color = 'content.default',
      dataTestId,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const el = element as keyof Theme['fontStyles'];
    const fonts = fontStyles ?? (theme.fontStyles[el] ? el : 'bodyLgRegular');

    return (
      <TypographyStyled
        as={element}
        color={color}
        data-testid={dataTestId ?? 'typography'}
        fontStyles={fonts}
        ref={ref}
        {...(rest as ComponentPropsWithoutRef<'p'>)}
      >
        {children}
      </TypographyStyled>
    );
  }
);
