import { withProviders } from '@dt-dds/react-core';
import { Link } from '@dt-dds/react-link';
import { daimlertruckTheme as theme } from '@dt-dds/themes';
import { fireEvent, render } from '@testing-library/react';

import { Message } from './Message';
import { MessageType, OMessageType } from './types';

describe('<Message /> component', () => {
  const ProvidedMessage = withProviders(Message);
  const title = 'Title here';
  const description = 'Some description here.';

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
      const { container, queryByTestId } = render(
        <ProvidedMessage onClose={jest.fn()} type={type}>
          <Message.Title>{title}</Message.Title>
          <Message.Description>{description}</Message.Description>
        </ProvidedMessage>
      );

      const icon = queryByTestId('message-icon');
      if (type === OMessageType.Default) {
        expect(icon).not.toBeInTheDocument();
      } else {
        expect(icon).toBeInTheDocument();
        const messageIconStyled = icon?.parentElement;
        expect(messageIconStyled).toHaveAttribute('type', type);
      }

      expect(queryByTestId('message')).toHaveStyle(
        `background-color: ${
          type === OMessageType.Default
            ? theme.palette.surface.light
            : theme.palette[type].light
        };`
      );

      expect(container).toMatchSnapshot();
    }
  );

  it('should render a Message without title and not render the close button if onClose is not a prop', () => {
    const { queryByRole } = render(
      <ProvidedMessage type={OMessageType.Success} />
    );

    const messageTitle = queryByRole('heading');
    const messageCloseButton = queryByRole('button');

    expect(messageTitle).toBeNull();
    expect(messageCloseButton).toBeNull();
  });

  it('should call onClose if the close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByRole } = render(
      <ProvidedMessage onClose={onCloseMock} type={OMessageType.Warning} />
    );

    const messageCloseButton = getByRole('button');

    expect(messageCloseButton).toBeInTheDocument();

    fireEvent.click(messageCloseButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should render a Message with an Action', () => {
    const mockOnClick = jest.fn();
    const { getByRole } = render(
      <ProvidedMessage type={OMessageType.Info}>
        <Message.Action>
          <Link href='#' onClick={mockOnClick}>
            View action
          </Link>
        </Message.Action>
      </ProvidedMessage>
    );

    const messageAction = getByRole('link');
    expect(messageAction).toBeInTheDocument();

    fireEvent.click(messageAction);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
