import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';
import { useTheme } from '@emotion/react';
import { Children, cloneElement, ReactElement, useMemo } from 'react';

import { Counter } from '../Counter';

import { LabelStyled, StepStyled } from './Step.styled';

export interface BaseStepProps extends Pick<BaseProps, 'children'> {
  isActive?: boolean;
  isCompleted?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
}

const Step = ({
  children,
  isActive = false,
  isCompleted = false,
  isDisabled = false,
  isError = false,
}: BaseStepProps) => {
  const clonedChildren = useMemo(
    () =>
      Children.map(children as ReactElement<BaseStepProps>, (child) => {
        return (
          child &&
          cloneElement(child, {
            isActive,
            isCompleted,
            isDisabled,
            isError,
            ...child.props,
          })
        );
      }),
    [children, isActive, isCompleted, isDisabled, isError]
  );

  return <StepStyled>{clonedChildren}</StepStyled>;
};

const StepCounter = ({
  children,
  isActive = false,
  isCompleted = false,
  isDisabled = false,
  isError = false,
}: BaseStepProps) => {
  const theme = useTheme();
  const color = isError ? 'error' : isDisabled ? 'disabled' : 'primary';
  const bgColor = isError
    ? theme.palette.error.light
    : theme.palette.primary.light;

  return (
    <Counter
      color={color}
      isLarge
      outlined={!isCompleted}
      style={{
        borderWidth: 1,
        ...(isActive && { backgroundColor: bgColor }),
      }}
    >
      {isCompleted ? (
        <Icon code='check' color={theme.palette.surface.light} size='s' />
      ) : (
        <Typography
          color={color === 'disabled' ? 'content.light' : `${color}.default`}
          element='span'
          fontStyles='bodyXsBold'
          style={{
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Typography>
      )}
    </Counter>
  );
};

Step.Counter = StepCounter;

const labelColor = ({
  isActive,
  isError,
  isDisabled,
  isCompleted,
}: Partial<BaseStepProps>) => {
  if (isError) {
    return 'error';
  } else if (isActive || isCompleted) {
    return 'primary';
  } else if (isDisabled) {
    return 'disabled';
  } else {
    return 'secondary';
  }
};

Step.Label = ({
  children,
  isActive = false,
  isCompleted = false,
  isDisabled = false,
  isError = false,
}: BaseStepProps) => {
  const color = labelColor({ isActive, isError, isDisabled, isCompleted });

  return <LabelStyled color={color}>{children}</LabelStyled>;
};

export default Step;
