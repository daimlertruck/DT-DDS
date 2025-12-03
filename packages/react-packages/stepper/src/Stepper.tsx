import { Children, ReactElement, cloneElement } from 'react';

import { Step } from './components';
import { StepperStyled } from './Stepper.styled';
import { StepperProps } from './types';

export const Stepper = ({
  children,
  orientation = 'vertical',
  variant = 'number',
  activeStep,
  dataTestId,
}: StepperProps) => {
  const childrenArray = Children.toArray(children) as ReactElement[];

  const enhancedChildren = childrenArray.map((child, index) => {
    if (child.type !== Step) {
      return child;
    }

    return cloneElement(child, {
      ...child.props,
      index,
      variant,
      orientation,
      isLast: index === childrenArray.length - 1,
      isActive: child.props.isActive ?? activeStep === index,
    });
  });

  return (
    <StepperStyled
      data-testid={dataTestId ?? 'stepper'}
      orientation={orientation}
    >
      {enhancedChildren}
    </StepperStyled>
  );
};

Stepper.Step = Step;
