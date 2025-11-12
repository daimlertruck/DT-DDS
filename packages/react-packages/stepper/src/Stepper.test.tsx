import { render } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Stepper } from '.';

describe('<Stepper /> component', () => {
  const ProvidedStepper = withProviders(Stepper);
  describe('render default Stepper', () => {
    it('should render with correct HTML elements', () => {
      const { container } = render(
        <ProvidedStepper>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ProvidedStepper>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('render Stepper with prop and correct styles', () => {
    it('should render using flex direction column', () => {
      const { container } = render(
        <ProvidedStepper orientation='vertical'>
          <li>Item 1</li>
          <li>Item 2</li>
        </ProvidedStepper>
      );

      expect(container.firstChild).toHaveStyle('flex-direction: column');
    });

    it('should render using flex direction row', () => {
      const { container } = render(
        <ProvidedStepper orientation='horizontal'>
          <li>Item 1</li>
          <li>Item 2</li>
        </ProvidedStepper>
      );

      expect(container.firstChild).toHaveStyle('flex-direction: column');
    });
  });
});
