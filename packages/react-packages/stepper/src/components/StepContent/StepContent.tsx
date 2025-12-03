import { useRef, useEffect, useState, ReactNode } from 'react';

import { Orientation } from '@dt-dds/react-core';
import { Tooltip } from '@dt-dds/react-tooltip';

import {
  StepContentStyled,
  StepTitleStyled,
  StepDescriptionStyled,
} from './StepContent.styled';
import { StepState } from '../../types';

interface StepContentProps {
  title?: string;
  description?: string;
  state: StepState;
  isActive?: boolean;
  orientation?: Orientation;
}

export const StepContent = ({
  title,
  description,
  state,
  isActive,
  orientation,
}: StepContentProps) => {
  const titleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLSpanElement>(null);
  const [showTitleTooltip, setShowTitleTooltip] = useState(false);
  const [showDescTooltip, setShowDescTooltip] = useState(false);

  useEffect(() => {
    if (titleRef.current && title) {
      const element = titleRef.current;
      setShowTitleTooltip(element.scrollWidth > element.clientWidth);
    }
    if (descRef.current && description) {
      const element = descRef.current;
      setShowDescTooltip(element.scrollHeight > element.clientHeight);
    }
  }, [title, description, orientation]);

  if (!title && !description) {
    return null;
  }

  const renderContent = (
    content: string | undefined,
    ref: React.RefObject<HTMLSpanElement>,
    showTooltip: boolean,
    Component: React.ElementType,
    componentProps: { state: StepState; isActive?: boolean }
  ): ReactNode => {
    if (!content) {
      return null;
    }

    const element = (
      <Component {...componentProps} ref={ref}>
        {content}
      </Component>
    );

    if (showTooltip) {
      return (
        <Tooltip>
          {element}
          <Tooltip.Content direction='right'>{content}</Tooltip.Content>
        </Tooltip>
      );
    }

    return element;
  };

  return (
    <StepContentStyled orientation={orientation}>
      {renderContent(title, titleRef, showTitleTooltip, StepTitleStyled, {
        state,
        isActive,
      })}

      {renderContent(
        description,
        descRef,
        showDescTooltip,
        StepDescriptionStyled,
        { state }
      )}
    </StepContentStyled>
  );
};
