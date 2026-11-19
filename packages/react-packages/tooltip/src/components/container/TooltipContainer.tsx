import {
  FocusEvent,
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { TooltipContainerStyled } from './TooltipContainerStyled';
import { useTooltipContext } from '../../context';

export interface TooltipContainerProps extends BaseProps {
  hideDelay?: number;
}

export const TooltipContainer = ({
  children,
  style,
  dataTestId,
  hideDelay = 0,
}: TooltipContainerProps) => {
  const { setIsVisible, setContainerRectProperties } = useTooltipContext();
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(hideTimeoutRef.current), []);

  const showTooltip = (e: SyntheticEvent<HTMLDivElement>) => {
    clearTimeout(hideTimeoutRef.current);
    const { top, left, height, width } =
      e.currentTarget.getBoundingClientRect();

    setContainerRectProperties({ top, left, height, width });
    setIsVisible(true);
  };

  const hideTooltip = () => {
    clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setIsVisible(false), hideDelay);
  };

  const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (e.target.matches(':focus-visible')) showTooltip(e);
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) hideTooltip();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      clearTimeout(hideTimeoutRef.current);
      setIsVisible(false);
    }
  };

  return (
    <TooltipContainerStyled
      data-testid={dataTestId ?? 'tooltip-container'}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={style}
    >
      {children}
    </TooltipContainerStyled>
  );
};
