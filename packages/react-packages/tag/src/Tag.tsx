import { forwardRef, useEffect, useRef, useState } from 'react';

import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { Tooltip, TooltipBackground } from '@dt-dds/react-tooltip';

import { TagBorder, TagColor, TagSize, TagVariant } from './constants';
import { TagStyled, TagButtonCloseStyled } from './Tag.styled';

export type TagProps = {
  variant?: TagVariant;
  color?: TagColor;
  border?: TagBorder;
  size?: TagSize;
  isDisabled?: boolean;
  isClickable?: boolean;
  onClick?: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => void;
  onClose?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  tooltipVariant?: TooltipBackground;
} & BaseProps;

export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      style,
      children,
      dataTestId,
      variant = 'solid',
      color = 'primary',
      border = 'squared',
      size = 'small',
      isClickable = false,
      isDisabled = false,
      onClick,
      onClose,
      tooltipVariant = 'opacity',
    },
    ref
  ) => {
    const dataTestIdName = dataTestId ?? 'tag';
    const isDismissible = !!onClose;
    const hasHoverStyle =
      !isDisabled && (!!onClick || isClickable || isDismissible);
    const hasClickableStyle = !isDismissible && hasHoverStyle;

    const handleClickTag = (
      event:
        | React.MouseEvent<HTMLDivElement>
        | React.KeyboardEvent<HTMLDivElement>
    ) => {
      if (isDisabled || isDismissible) {
        return;
      }

      onClick?.(event);
    };

    const cellRef = useRef<HTMLDivElement>(null);
    const [isOverflow, setIsOverflow] = useState(false);

    const handleClickOnEnterKey = (
      event: React.KeyboardEvent<HTMLDivElement>
    ) => {
      if (event.code === 'Enter') {
        handleClickTag(event);
      }
    };

    const handleCloseOnEnterKey = (
      event: React.KeyboardEvent<HTMLButtonElement>
    ) => {
      if (event.code === 'Enter') {
        onClose?.(event);
      }
    };

    useEffect(() => {
      if (cellRef.current) {
        const { current } = cellRef;

        setIsOverflow(current.scrollWidth > current.clientWidth);
      }
    }, [children]);

    return (
      <Tooltip>
        <TagStyled
          aria-disabled={isDisabled}
          border={border}
          color={color}
          data-testid={dataTestIdName}
          hasHover={hasHoverStyle}
          isClickable={hasClickableStyle}
          isDisabled={isDisabled}
          isDismissible={isDismissible}
          onClick={handleClickTag}
          {...(isClickable && { onKeyDown: handleClickOnEnterKey })}
          ref={ref}
          size={size}
          style={style}
          {...(isClickable && { tabIndex: 0 })}
          variant={variant}
        >
          <span ref={cellRef}>{children}</span>

          {isDismissible ? (
            <TagButtonCloseStyled
              aria-disabled={isDisabled}
              color={color}
              data-testid={`${dataTestIdName}-close-button`}
              disabled={isDisabled}
              onClick={onClose}
              onKeyDown={handleCloseOnEnterKey}
              tabIndex={0}
            >
              <Icon code='close' size='extra-small' />
            </TagButtonCloseStyled>
          ) : null}
        </TagStyled>
        <Tooltip.Content background={tooltipVariant}>
          {isOverflow ? children : ''}
        </Tooltip.Content>
      </Tooltip>
    );
  }
);
