import { Meta, StoryObj } from '@storybook/react';

import styled from '@emotion/styled';

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
      options: OTooltipBackground,
      control: { type: 'radio' },
    },
    direction: {
      options: OTooltipDirection,
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
    children: (
      <svg
        fill='none'
        height='24'
        viewBox='0 0 24 24'
        width='24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_287_3834)'>
          <path d='M8 9H16V19H8V9Z' fill='currentColor' opacity='0.3' />
          <path
            d='M15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z'
            fill='currentColor'
          />
        </g>
        <defs>
          <clipPath id='clip0_287_3834'>
            <rect fill='white' height='24' width='24' />
          </clipPath>
        </defs>
      </svg>
    ),
    direction: OTooltipDirection.Top,
    background: OTooltipBackground.Full,
    message: 'Delete',
  },
};
