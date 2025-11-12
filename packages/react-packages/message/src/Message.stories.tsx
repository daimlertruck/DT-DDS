import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@dt-dds/react-button';

import { Message } from './Message';
import { OMessageType, MessageProps } from './types';

interface MessageStory extends MessageProps {
  hasActions?: boolean;
}

const meta: Meta<MessageStory> = {
  title: 'Data Display/Message',
  component: Message,
  argTypes: {
    type: {
      options: Object.values(OMessageType),
      control: { type: 'inline-radio' },
    },
    onClose: {
      options: [true, undefined],
      control: {
        type: 'radio',
        labels: {
          true: 'Has onClose',
          undefined: 'Does not have onClose',
        },
      },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'inline-radio' },
    },
  },
  render: ({ hasActions, onClose, title, description, type, orientation }) => (
    <Message
      {...(onClose && {
        onClose: () => console.log('closed'),
      })}
      description={description}
      orientation={orientation}
      title={title}
      type={type}
    >
      {hasActions ? (
        <Message.Actions>
          <Button size='small' variant='text'>
            Action
          </Button>
        </Message.Actions>
      ) : null}
    </Message>
  ),
};
export default meta;

export const Default: StoryObj<MessageStory> = {
  args: {
    type: OMessageType.Error,
    hasActions: true,
    title: 'This is a title',
    description: 'Some important information will appear here.',
    onClose: true as unknown as MessageStory['onClose'],
    orientation: 'horizontal',
  },
};
