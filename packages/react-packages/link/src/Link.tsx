import { ElementType, forwardRef } from 'react';

import { Code } from '@dt-dds/icons';
import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';

import { LinkStyled } from './Link.styled';

import { LinkSize, LinkColor, LinkFontWeight, LinkVariant } from '.';

export interface LinkProps
  extends BaseProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: ElementType;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  size?: LinkSize;
  color?: LinkColor;
  fontWeight?: LinkFontWeight;
  icon?: Code;
  variant?: LinkVariant;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      isDisabled,
      children,
      size = 'medium',
      dataTestId,
      onClick,
      variant,
      fontWeight = 'regular',
      href,
      style,
      icon,
      color,
      ...rest
    },
    ref
  ) => {
    return (
      <LinkStyled
        $color={color}
        data-testid={dataTestId ?? 'link'}
        $disabled={isDisabled}
        $fontWeight={fontWeight}
        ref={ref}
        $size={size}
        style={style}
        $variant={variant}
        {...(!isDisabled && { href, onClick })}
        {...rest}
      >
        {variant === 'inline' || !icon ? (
          children
        ) : (
          <>
            <span>{children}</span>
            <Icon code={icon} color='inherit' size={size} />
          </>
        )}
      </LinkStyled>
    );
  }
);
