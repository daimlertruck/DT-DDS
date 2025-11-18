import { render } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import Step, { BaseStepProps } from './Step';

describe('<Step /> component', () => {
  const ProvidedStep = withProviders(Step);
  const ProvidedStepCounter = withProviders(Step.Counter);
  const ProvidedStepLabel = withProviders(Step.Label);
  describe('render Step', () => {
    it.each`
      isActive | isCompleted | isDisabled | isError
      ${true}  | ${false}    | ${false}   | ${false}
      ${false} | ${true}     | ${false}   | ${false}
      ${false} | ${false}    | ${true}    | ${false}
      ${false} | ${false}    | ${false}   | ${true}
      ${true}  | ${false}    | ${false}   | ${true}
    `(
      'renders Step with props correctly',
      ({ isActive, isCompleted, isDisabled, isError }: BaseStepProps) => {
        const { container } = render(
          <ProvidedStep
            isActive={isActive}
            isCompleted={isCompleted}
            isDisabled={isDisabled}
            isError={isError}
          >
            <ProvidedStepCounter>1</ProvidedStepCounter>
            <ProvidedStepLabel>Label</ProvidedStepLabel>
          </ProvidedStep>
        );

        expect(container).toMatchSnapshot();
      }
    );
  });

  describe('<Step.Counter /> component', () => {
    it.each`
      isActive | isCompleted | isDisabled | isError
      ${true}  | ${false}    | ${false}   | ${false}
      ${false} | ${true}     | ${false}   | ${false}
      ${false} | ${false}    | ${true}    | ${false}
      ${false} | ${false}    | ${false}   | ${true}
      ${true}  | ${false}    | ${false}   | ${true}
    `(
      'renders StepCounter with props correctly',
      ({ isActive, isCompleted, isDisabled, isError }: BaseStepProps) => {
        const { container } = render(
          <ProvidedStepCounter
            isActive={isActive}
            isCompleted={isCompleted}
            isDisabled={isDisabled}
            isError={isError}
          >
            1
          </ProvidedStepCounter>
        );

        expect(container).toMatchSnapshot();
      }
    );
  });

  describe('<Step.Label /> component', () => {
    it.each`
      isActive | isCompleted | isDisabled | isError
      ${true}  | ${false}    | ${false}   | ${false}
      ${false} | ${true}     | ${false}   | ${false}
      ${false} | ${false}    | ${true}    | ${false}
      ${false} | ${false}    | ${false}   | ${true}
      ${true}  | ${false}    | ${false}   | ${true}
    `(
      'renders StepCounter with props correctly',
      ({ isActive, isCompleted, isDisabled, isError }: BaseStepProps) => {
        const { container } = render(
          <ProvidedStepLabel
            isActive={isActive}
            isCompleted={isCompleted}
            isDisabled={isDisabled}
            isError={isError}
          >
            Label
          </ProvidedStepLabel>
        );

        expect(container).toMatchSnapshot();
      }
    );
  });
});
