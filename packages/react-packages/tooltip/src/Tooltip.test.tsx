import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { withProviders } from '@dt-dds/react-core';

import { TooltipContentProps } from './components';
import Tooltip from './Tooltip';
import { withTooltipProvider } from './utils';

describe('<Tooltip /> component', () => {
  const ProvidedTooltip = withProviders(withTooltipProvider(Tooltip));
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
});
