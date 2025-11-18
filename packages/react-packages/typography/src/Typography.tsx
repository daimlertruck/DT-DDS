import { forwardRef } from 'react';

import { useTheme } from '@emotion/react';

import { BaseProps } from '@dt-dds/react-core';
import { CustomTheme as Theme } from '@dt-dds/themes';

import { Colors, Elements } from './types';
import { TypographyStyled } from './Typography.styled';

export interface TypographyProps extends BaseProps {
  color?: Colors;
  fontStyles?: keyof Theme['fontStyles'];
  element?: Elements;
}

export const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    {
      children,
      element,
      fontStyles,
      color = 'grey_90',
      dataTestId,
      style,
      id,
    }: TypographyProps,
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
        id={id}
        ref={ref}
        style={style}
      >
        {children}
      </TypographyStyled>
    );
  }
);
