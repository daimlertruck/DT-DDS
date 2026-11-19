import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withProviders } from '@dt-dds/react-core';

import { TooltipContentProps } from './components';
import Tooltip from './Tooltip';
import { withTooltipProvider } from './utils';

describe('<Tooltip /> component', () => {
  const ProvidedTooltip = withProviders(withTooltipProvider(Tooltip));

  afterEach(() => {
    jest.useRealTimers();
  });

  it.each`
    direction   | background
    ${'right'}  | ${'opacity'}
    ${'left'}   | ${'opacity'}
    ${'bottom'} | ${'full'}
    ${'top'}    | ${'full'}
  `(
    'renders a tooltip with the direction as $direction and background as $background',
    async ({ direction, background }: TooltipContentProps) => {
      const { getByTestId, findByTestId } = render(
        <ProvidedTooltip>
          Hover me
          <Tooltip.Content background={background} direction={direction}>
            Some content
          </Tooltip.Content>
        </ProvidedTooltip>
      );

      fireEvent.mouseEnter(getByTestId('tooltip-container'));

      expect(await findByTestId('tooltip-content')).toMatchSnapshot();
    }
  );

  it('should hide tooltip after the hide delay', async () => {
    jest.useFakeTimers();

    const { getByTestId, queryByTestId } = render(
      <ProvidedTooltip hideDelay={1000}>
        Hover me
        <Tooltip.Content>Some content</Tooltip.Content>
      </ProvidedTooltip>
    );

    fireEvent.mouseEnter(getByTestId('tooltip-container'));

    fireEvent.mouseLeave(getByTestId('tooltip-container'));

    jest.advanceTimersByTime(1000);

    await waitForElementToBeRemoved(() => getByTestId('tooltip-content'));

    expect(queryByTestId('tooltip-content')).not.toBeInTheDocument();
  });

  describe('Keyboard navigation', () => {
    it('should show the tooltip when a child receives keyboard focus', async () => {
      const { findByTestId } = render(
        <ProvidedTooltip>
          <button>Trigger</button>
          <Tooltip.Content>Some content</Tooltip.Content>
        </ProvidedTooltip>
      );

      await userEvent.tab();

      expect(await findByTestId('tooltip-content')).toBeInTheDocument();
    });

    it('should hide the tooltip when focus leaves the container', async () => {
      const { getByTestId } = render(
        <>
          <ProvidedTooltip>
            <button>Trigger</button>
            <Tooltip.Content>Some content</Tooltip.Content>
          </ProvidedTooltip>
          <button>Outside</button>
        </>
      );

      await userEvent.tab();
      expect(getByTestId('tooltip-content')).toBeInTheDocument();

      await userEvent.tab();

      await waitForElementToBeRemoved(() => getByTestId('tooltip-content'));
    });

    it('should hide the tooltip when Escape is pressed', async () => {
      const { getByTestId, queryByTestId } = render(
        <ProvidedTooltip>
          <button>Trigger</button>
          <Tooltip.Content>Some content</Tooltip.Content>
        </ProvidedTooltip>
      );

      await userEvent.tab();
      expect(getByTestId('tooltip-content')).toBeInTheDocument();

      await userEvent.keyboard('{Escape}');

      expect(queryByTestId('tooltip-content')).not.toBeInTheDocument();
    });
  });
});
