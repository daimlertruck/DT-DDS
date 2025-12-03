import { render, screen, within } from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { Stepper } from '.';

describe('<Stepper /> component', () => {
  const ProvidedStepper = withProviders(Stepper);

  it('should match snapshot with all features', () => {
    const customIcon = <span data-testid='custom-icon'>📝</span>;

    const { container } = render(
      <ProvidedStepper
        activeStep={1}
        dataTestId='workflow-stepper'
        orientation='vertical'
        variant='number'
      >
        <Stepper.Step
          description='Begin the process'
          state='completed'
          title='Start'
        />
        <Stepper.Step
          description='Currently working'
          state='incomplete'
          title='In Progress'
        />
        <Stepper.Step
          description='Needs review'
          state='warning'
          title='Review'
        />
        <Stepper.Step
          description='Finish up'
          icon={customIcon}
          state='disabled'
          title='Complete'
        />
      </ProvidedStepper>
    );

    expect(container).toMatchSnapshot();
  });

  describe('Stepper container', () => {
    it('should render with horizontal orientation', () => {
      const { container } = render(
        <ProvidedStepper orientation='horizontal'>
          <Stepper.Step title='Step 1' />
          <Stepper.Step title='Step 2' />
        </ProvidedStepper>
      );

      const stepper = container.firstChild as HTMLElement;
      expect(stepper).toHaveStyle('flex-direction: row');
      expect(stepper).toHaveStyle('display: flex');
      expect(stepper).toHaveStyle('width: 100%');

      const contentWrapper = screen.getByText('Step 1').parentElement;
      expect(contentWrapper).toHaveStyle('align-items: center');
      expect(contentWrapper).toHaveStyle('text-align: center');
    });

    it('should render with custom data-testid', () => {
      render(
        <ProvidedStepper dataTestId='custom-stepper'>
          <Stepper.Step title='Step 1' />
        </ProvidedStepper>
      );

      expect(screen.getByTestId('custom-stepper')).toBeInTheDocument();
    });
  });

  describe('Step props', () => {
    it('should set correct index for each Step', () => {
      render(
        <ProvidedStepper variant='number'>
          <Stepper.Step title='Step 1' />
          <Stepper.Step title='Step 2' />
          <Stepper.Step title='Step 3' />
        </ProvidedStepper>
      );

      const indicators = screen.getAllByTestId('step-indicator');
      expect(indicators[0]).toHaveTextContent('1');
      expect(indicators[1]).toHaveTextContent('2');
      expect(indicators[2]).toHaveTextContent('3');
    });

    it('should set isActive based on activeStep prop', () => {
      render(
        <ProvidedStepper activeStep={1} variant='number'>
          <Stepper.Step title='Step 1' />
          <Stepper.Step title='Step 2' />
          <Stepper.Step title='Step 3' />
        </ProvidedStepper>
      );

      expect(screen.getByText('Step 2')).toBeVisible();
    });

    it('should allow Step-level isActive to override activeStep', () => {
      render(
        <ProvidedStepper activeStep={0} variant='number'>
          <Stepper.Step title='Step 1' />
          <Stepper.Step isActive title='Step 2' />
          <Stepper.Step title='Step 3' />
        </ProvidedStepper>
      );

      expect(screen.getByText('Step 2')).toBeVisible();
    });
  });

  describe('Step indicator - variants', () => {
    it('should render bullet variant without numbers', () => {
      render(
        <ProvidedStepper variant='bullet'>
          <Stepper.Step title='Step 1' />
          <Stepper.Step title='Step 2' />
        </ProvidedStepper>
      );

      const indicators = screen.getAllByTestId('step-indicator');
      expect(indicators[0]).not.toHaveTextContent('1');
      expect(indicators[0]).toBeEmptyDOMElement();
    });

    it('should render icon variant with custom icon', () => {
      const customIcon = <span data-testid='custom-icon'>★</span>;

      render(
        <ProvidedStepper variant='icon'>
          <Stepper.Step icon={customIcon} title='Step 1' />
        </ProvidedStepper>
      );

      expect(screen.getByTestId('custom-icon')).toBeVisible();
    });
  });

  describe('Step content', () => {
    it('should render title only', () => {
      render(
        <ProvidedStepper>
          <Stepper.Step title='Step Title' />
        </ProvidedStepper>
      );

      expect(screen.getByText('Step Title')).toBeVisible();
    });

    it('should not render content wrapper when no title or description', () => {
      render(
        <ProvidedStepper>
          <Stepper.Step />
        </ProvidedStepper>
      );

      const indicator = screen.getByTestId('step-indicator');
      expect(indicator).toBeVisible();

      const stepContainer = indicator.parentElement?.parentElement;
      expect(stepContainer?.children.length).toBe(1);
    });

    it('should apply ellipsis to title', () => {
      render(
        <ProvidedStepper>
          <Stepper.Step title='Very long title that should be truncated' />
        </ProvidedStepper>
      );

      const title = screen.getByText(
        'Very long title that should be truncated'
      );
      expect(title).toHaveStyle('white-space: nowrap');
      expect(title).toHaveStyle('overflow: hidden');
      expect(title).toHaveStyle('text-overflow: ellipsis');
    });
  });

  describe('Trail line', () => {
    it('should not render trail line for last step', () => {
      render(
        <ProvidedStepper>
          <Stepper.Step title='Step 1' />
          <Stepper.Step dataTestId='last-step' title='Step 2' />
        </ProvidedStepper>
      );

      const lastStep = screen.getByTestId('last-step');
      const trailLine = within(lastStep).queryByTestId('trail-line');
      expect(trailLine).toBeNull();
    });

    it('should have correct trail line positioning for horizontal orientation', () => {
      render(
        <ProvidedStepper orientation='horizontal'>
          <Stepper.Step state='incomplete' title='Step 1' />
          <Stepper.Step title='Step 2' />
        </ProvidedStepper>
      );

      const trailLine = screen.getByTestId('trail-line');
      expect(trailLine).toHaveStyle('position: absolute');
      expect(trailLine).toHaveStyle('height: 1px');
      expect(trailLine).toHaveStyle('min-width: 80px');
    });

    it('should be thicker for completed state', () => {
      render(
        <ProvidedStepper orientation='vertical'>
          <Stepper.Step state='completed' title='Step 1' />
          <Stepper.Step title='Step 2' />
        </ProvidedStepper>
      );

      const trailLine = screen.getByTestId('trail-line');
      expect(trailLine).toHaveStyle('width: 2px');
    });

    it('should be thinner for incomplete state', () => {
      render(
        <ProvidedStepper orientation='vertical'>
          <Stepper.Step state='incomplete' title='Step 1' />
          <Stepper.Step title='Step 2' />
        </ProvidedStepper>
      );

      const trailLine = screen.getByTestId('trail-line');
      expect(trailLine).toHaveStyle('width: 1px');
    });
  });
});
