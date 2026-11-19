import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import styled from '@emotion/styled';

import { Button } from '@dt-dds/react-button';

import { TooltipContainerProps } from './components/container';
import { TooltipContentProps } from './components/content';
import { OTooltipBackground, OTooltipDirection } from './constants';
import Tooltip from './Tooltip';

const StyledContainer = styled.div`
  text-align: center;
  margin-top: 100px;
`;

type TooltipProps = TooltipContainerProps &
  TooltipContentProps & { message?: string };

const meta: Meta<TooltipProps> = {
  component: Tooltip,
  title: 'Data Display/Tooltip',
  argTypes: {
    background: {
      options: Object.values(OTooltipBackground),
      control: { type: 'radio' },
    },
    direction: {
      options: Object.values(OTooltipDirection),
      control: { type: 'select' },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  render: ({ children, hideDelay, background, direction, message }) => {
    return (
      <StyledContainer>
        <Tooltip hideDelay={hideDelay}>
          {children}
          <Tooltip.Content background={background} direction={direction}>
            {message}
          </Tooltip.Content>
        </Tooltip>
      </StyledContainer>
    );
  },
};

export default meta;

export const Default: StoryObj<TooltipProps> = {
  args: {
    hideDelay: 0,
    children: <Button>Hover or focus me</Button>,
    direction: OTooltipDirection.Top,
    background: OTooltipBackground.Full,
    message: 'This is a tooltip message.',
  },
};

export const Open: StoryObj<TooltipProps> = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.hover(canvas.getByTestId('tooltip-container'));
    const tooltip = await page.findByRole('tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveTextContent('This is a tooltip message.');
  },
};
