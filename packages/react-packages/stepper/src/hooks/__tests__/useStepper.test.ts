import { renderHook, act } from '@testing-library/react';

import { useStepper } from '../useStepper';

describe('useStepper', () => {
  describe('Basic navigation', () => {
    test('should increment and decrement the step', () => {
      const { result } = renderHook(() => useStepper());

      act(() => result.current.handleNext());
      expect(result.current.activeStep).toBe(1);

      act(() => result.current.handleBack());
      expect(result.current.activeStep).toBe(0);
    });

    test('should not go below step 0', () => {
      const { result } = renderHook(() => useStepper());

      act(() => result.current.handleBack());
      expect(result.current.activeStep).toBe(0);
    });

    test('should respect totalSteps limit', () => {
      const { result } = renderHook(() => useStepper({ totalSteps: 3 }));

      act(() => result.current.handleNext());
      act(() => result.current.handleNext());
      act(() => result.current.handleNext());

      expect(result.current.activeStep).toBe(2);
    });
  });

  describe('Initial step configuration', () => {
    test('should start at custom initialStep', () => {
      const { result } = renderHook(() => useStepper({ initialStep: 2 }));
      expect(result.current.activeStep).toBe(2);
    });

    test('should default to step 0 when no initialStep provided', () => {
      const { result } = renderHook(() => useStepper());
      expect(result.current.activeStep).toBe(0);
    });
  });

  describe('Step boundaries', () => {
    test('should correctly identify first step', () => {
      const { result } = renderHook(() => useStepper());
      expect(result.current.isFirstStep).toBe(true);

      act(() => result.current.handleNext());
      expect(result.current.isFirstStep).toBe(false);
    });

    test('should correctly identify last step', () => {
      const { result } = renderHook(() => useStepper({ totalSteps: 3 }));
      expect(result.current.isLastStep).toBe(false);

      act(() => result.current.handleChangeStep(2));
      expect(result.current.isLastStep).toBe(true);
    });
  });

  describe('Navigation permissions', () => {
    test('should allow going next when not at last step', () => {
      const { result } = renderHook(() => useStepper({ totalSteps: 3 }));
      expect(result.current.canGoNext).toBe(true);
    });

    test('should not allow going next at last step', () => {
      const { result } = renderHook(() =>
        useStepper({ totalSteps: 3, initialStep: 2 })
      );
      expect(result.current.canGoNext).toBe(false);
    });

    test('should allow going back when not at first step', () => {
      const { result } = renderHook(() => useStepper({ initialStep: 1 }));
      expect(result.current.canGoBack).toBe(true);
    });

    test('should not allow going back at first step', () => {
      const { result } = renderHook(() => useStepper());
      expect(result.current.canGoBack).toBe(false);
    });
  });

  describe('handleChangeStep', () => {
    test('should change to specific step within bounds', () => {
      const { result } = renderHook(() => useStepper({ totalSteps: 5 }));

      act(() => result.current.handleChangeStep(3));
      expect(result.current.activeStep).toBe(3);
    });

    test('should not change to step beyond totalSteps', () => {
      const { result } = renderHook(() => useStepper({ totalSteps: 3 }));

      act(() => result.current.handleChangeStep(5));
      expect(result.current.activeStep).toBe(0);
    });

    test('should not change to a negative step index when totalSteps is undefined', () => {
      const { result } = renderHook(() => useStepper());

      expect(result.current.activeStep).toBe(0);

      act(() => result.current.handleChangeStep(-1));

      expect(result.current.activeStep).toBe(0);
    });
  });

  describe('handleReset', () => {
    test('should reset to initial step and clear completed steps', () => {
      const { result } = renderHook(() => useStepper({ initialStep: 0 }));

      act(() => {
        result.current.handleNext();
        result.current.markStepComplete(0);
        result.current.markStepComplete(1);
      });

      expect(result.current.activeStep).toBe(1);
      expect(result.current.completedSteps.size).toBe(2);

      act(() => result.current.handleReset());

      expect(result.current.activeStep).toBe(0);
      expect(result.current.completedSteps.size).toBe(0);
    });

    test('should reset to custom initial step', () => {
      const { result } = renderHook(() => useStepper({ initialStep: 2 }));

      act(() => result.current.handleNext());
      expect(result.current.activeStep).toBe(3);

      act(() => result.current.handleReset());
      expect(result.current.activeStep).toBe(2);
    });
  });

  describe('Completed steps tracking', () => {
    test('should mark step as complete', () => {
      const { result } = renderHook(() => useStepper());

      act(() => result.current.markStepComplete(0));

      expect(result.current.isStepComplete(0)).toBe(true);
      expect(result.current.completedSteps.has(0)).toBe(true);
    });

    test('should mark step as incomplete', () => {
      const { result } = renderHook(() => useStepper());

      act(() => {
        result.current.markStepComplete(0);
        result.current.markStepIncomplete(0);
      });

      expect(result.current.isStepComplete(0)).toBe(false);
      expect(result.current.completedSteps.has(0)).toBe(false);
    });
  });
});
