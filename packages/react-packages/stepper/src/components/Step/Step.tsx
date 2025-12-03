import { StepContainer, StepIndicatorWrapper } from './Step.styled';
import { StepProps } from '../../types';
import { StepContent } from '../StepContent';
import { StepIndicator } from '../StepIndicator';
import { TrailLine } from '../TrailLine';

export const Step = ({
  index = 0,
  title,
  description,
  state = 'incomplete',
  isActive = false,
  variant = 'number',
  icon,
  isLast = false,
  orientation,
  dataTestId,
}: StepProps) => {
  return (
    <StepContainer
      isDisabled={state === 'disabled'}
      isLast={isLast}
      orientation={orientation}
    >
      <StepIndicatorWrapper
        data-testid={dataTestId ?? `step-${index}`}
        isLast={isLast}
        orientation={orientation}
      >
        <StepIndicator
          icon={icon}
          index={index}
          isActive={isActive}
          state={state}
          variant={variant}
        />

        {!isLast && <TrailLine orientation={orientation} state={state} />}
      </StepIndicatorWrapper>

      <StepContent
        description={description}
        isActive={isActive}
        orientation={orientation}
        state={state}
        title={title}
      />
    </StepContainer>
  );
};
