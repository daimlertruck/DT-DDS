import { fireEvent, render } from '@testing-library/react';

import { Button } from '@dt-dds/react-button';
import { useMedia, withProviders } from '@dt-dds/react-core';
import { defaultTheme as theme } from '@dt-dds/themes';

import { Message } from './Message';
import { MessageType, OMessageType } from './types';

jest.mock('@dt-dds/react-core', () => {
  const actual = jest.requireActual('@dt-dds/react-core');

  return {
    ...actual,
    useMedia: jest.fn(),
  };
});

const mockedUseMedia = useMedia as jest.Mock;

describe('<Message /> component', () => {
  const ProvidedMessage = withProviders(Message);
  const title = 'Title here';
  const description = 'Some description here.';

  it('should render message with vertical variant', () => {
    const { queryByTestId } = render(
      <ProvidedMessage
        description={description}
        orientation='vertical'
        type={OMessageType.Success}
      />
    );
    expect(queryByTestId('message-content')).toHaveStyle(
      'flex-direction: column'
    );
  });

  it.each`
    type
    ${OMessageType.Info}
    ${OMessageType.Success}
    ${OMessageType.Warning}
    ${OMessageType.Error}
    ${OMessageType.Default}
  `(
    'should render a Message with title & description, when type $type',
    ({ type }: { type: MessageType }) => {
      const { queryByTestId } = render(
        <ProvidedMessage
          description={description}
          onClose={jest.fn()}
          title={title}
          type={type}
        />
      );

      const icon = queryByTestId('message-icon');
      if (type === OMessageType.Default) {
        expect(icon).toBeNull();
      } else {
        expect(icon).toBeVisible();
      }

      expect(queryByTestId('message')).toHaveStyle(
        `background-color: ${
          type === OMessageType.Default
            ? theme.palette.surface.light
            : theme.palette[type].light
        };`
      );
    }
  );

  it('should render a Message without title and not render the close button if onClose is not a prop', () => {
    const { queryByRole } = render(
      <ProvidedMessage description={description} type={OMessageType.Success} />
    );

    const messageTitle = queryByRole('heading');
    const messageCloseButton = queryByRole('button');

    expect(messageTitle).toBeNull();
    expect(messageCloseButton).toBeNull();
  });

  it('should call onClose if the close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByRole } = render(
      <ProvidedMessage
        description={description}
        onClose={onCloseMock}
        type={OMessageType.Warning}
      />
    );

    const messageCloseButton = getByRole('button');

    expect(messageCloseButton).toBeInTheDocument();

    fireEvent.click(messageCloseButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should render a Message with an Action', () => {
    const mockOnClick = jest.fn();
    const { getByRole } = render(
      <ProvidedMessage description={description} type={OMessageType.Info}>
        <Message.Actions>
          <Button onClick={mockOnClick} size='small' variant='text'>
            View action
          </Button>
        </Message.Actions>
      </ProvidedMessage>
    );

    const messageAction = getByRole('button');
    expect(messageAction).toBeVisible();

    fireEvent.click(messageAction);

    expect(mockOnClick).toHaveBeenCalled();
  });

  describe('Responsive styles', () => {
    beforeEach(() => {
      mockedUseMedia.mockReset();
    });

    it('should change orientation to vertical when is mobile viewport', () => {
      mockedUseMedia.mockReturnValue(true);

      const { getByTestId } = render(
        <ProvidedMessage description={description} type={OMessageType.Info} />
      );

      expect(getByTestId('message-content')).toHaveStyle(
        'flex-direction: column'
      );
    });

    it('should change orientation to horizontal when is desktop viewport', () => {
      mockedUseMedia.mockReturnValue(false);

      const { getByTestId } = render(
        <ProvidedMessage description={description} type={OMessageType.Info} />
      );

      expect(getByTestId('message-content')).toHaveStyle('flex-direction: row');
    });
  });
});
