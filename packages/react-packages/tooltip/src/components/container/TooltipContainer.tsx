import { MouseEvent } from 'react';

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

  let hideTooltipTimeout: ReturnType<typeof setTimeout>;

  const showTooltip = (e: MouseEvent<HTMLDivElement>) => {
    clearTimeout(hideTooltipTimeout);
    const { top, left, height, width } =
      e.currentTarget.getBoundingClientRect();

    setContainerRectProperties({ top, left, height, width });
    setIsVisible(true);
  };

  const hideTooltip = () => {
    hideTooltipTimeout = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  };

  return (
    <TooltipContainerStyled
      data-testid={dataTestId ?? 'tooltip-container'}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      style={style}
    >
      {children}
    </TooltipContainerStyled>
  );
};
