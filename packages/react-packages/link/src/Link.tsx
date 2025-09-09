import { Code } from '@dt-dds/icons';
import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { forwardRef } from 'react';

import { LinkStyled } from './Link.styled';

import { iconSize, LinkSize, LinkColor, LinkVariant } from '.';

export interface LinkProps
  extends BaseProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  size?: LinkSize;
  color?: LinkColor;
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
        color={color}
        data-testid={dataTestId ?? 'link'}
        disabled={isDisabled}
        ref={ref}
        size={size}
        style={style}
        variant={variant}
        {...(!isDisabled && { href, onClick })}
        {...rest}
      >
        {variant === 'inline' || !icon ? (
          children
        ) : (
          <>
            <span>{children}</span>
            <Icon code={icon} color='inherit' size={iconSize[size]} />
          </>
        )}
      </LinkStyled>
    );
  }
);
