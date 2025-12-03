import { useCallback, useState } from 'react';

export interface UseStepperOptions {
  initialStep?: number;
  totalSteps?: number;
}

export interface UseStepperReturn {
  activeStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  canGoNext: boolean;
  canGoBack: boolean;
  completedSteps: Set<number>;
  handleNext: () => void;
  handleBack: () => void;
  handleChangeStep: (step: number) => void;
  handleReset: () => void;
  markStepComplete: (step: number) => void;
  markStepIncomplete: (step: number) => void;
  isStepComplete: (step: number) => boolean;
}

export const useStepper = (options?: UseStepperOptions): UseStepperReturn => {
  const { initialStep = 0, totalSteps } = options || {};

  const [activeStep, setActiveStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const isFirstStep = activeStep === 0;
  const isLastStep =
    totalSteps !== undefined ? activeStep === totalSteps - 1 : false;
  const canGoNext =
    totalSteps !== undefined ? activeStep < totalSteps - 1 : true;
  const canGoBack = activeStep > 0;

  const handleNext = useCallback(() => {
    if (canGoNext) {
      setActiveStep((prev) => prev + 1);
    }
  }, [canGoNext]);

  const handleBack = useCallback(() => {
    if (canGoBack) {
      setActiveStep((prev) => prev - 1);
    }
  }, [canGoBack]);

  const handleChangeStep = useCallback(
    (step: number) => {
      const isValidStep =
        step >= 0 && (totalSteps === undefined || step < totalSteps);

      if (isValidStep) {
        setActiveStep(step);
      }
    },
    [totalSteps]
  );

  const handleReset = useCallback(() => {
    setActiveStep(initialStep);
    setCompletedSteps(new Set());
  }, [initialStep]);

  const markStepComplete = useCallback((step: number) => {
    setCompletedSteps((prev) => new Set(prev).add(step));
  }, []);

  const markStepIncomplete = useCallback((step: number) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      newSet.delete(step);
      return newSet;
    });
  }, []);

  const isStepComplete = useCallback(
    (step: number) => completedSteps.has(step),
    [completedSteps]
  );

  return {
    activeStep,
    isFirstStep,
    isLastStep,
    canGoNext,
    canGoBack,
    completedSteps,
    handleNext,
    handleBack,
    handleChangeStep,
    handleReset,
    markStepComplete,
    markStepIncomplete,
    isStepComplete,
  };
};
