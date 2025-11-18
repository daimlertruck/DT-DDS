import React, { useRef, useState, useLayoutEffect } from 'react';

import { BaseProps, Portal } from '@dt-dds/react-core';

import { TooltipContentStyled } from './TooltipContentStyled';
import {
  TooltipBackground,
  OTooltipBackground,
  TooltipDirection,
  OTooltipDirection,
} from '../../constants';
import { useTooltipContext } from '../../context';
import { useTooltipPosition } from '../../hooks/useTooltipPosition';

export interface TooltipContentProps extends BaseProps {
  direction?: TooltipDirection;
  background?: TooltipBackground;
}

// Helper to create a DOMRect
// Usefull for environments where DOMRect is not available.
const createSafeDOMRect = (): DOMRect => {
  if (typeof DOMRect !== 'undefined') {
    return new DOMRect(0, 0, 0, 0);
  }

  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    toJSON() {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      };
    },
  } as DOMRect;
};

export const TooltipContent = ({
  children,
  direction = OTooltipDirection.Top,
  background = OTooltipBackground.Full,
  style,
  dataTestId,
}: TooltipContentProps) => {
  const { isVisible } = useTooltipContext();
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [tooltipRect, setTooltipRect] = useState<DOMRect>(createSafeDOMRect());

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      setTooltipRect(tooltipRef.current.getBoundingClientRect());
    }
  }, [isVisible, children]);

  const position = useTooltipPosition(direction, tooltipRect);

  return children ? (
    <Portal isOpen={isVisible}>
      <TooltipContentStyled
        background={background}
        data-testid={dataTestId ?? 'tooltip-content'}
        direction={direction}
        left={position.left}
        ref={tooltipRef}
        role='tooltip'
        style={style}
        top={position.top}
      >
        {children}
      </TooltipContentStyled>
    </Portal>
  ) : null;
};
