import { BaseProps } from '@dt-dds/react-core';
import { Typography } from '@dt-dds/react-typography';
import { SVGProps, ReactElement } from 'react';

import {
  CheckCircleIcon,
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
} from '../../../dt-dds-react/core';

import {
  MessageStyled,
  MessageIconStyled,
  MessageButtonCloseStyled,
  MessageContentStyled,
  MessageActionStyled,
} from './Message.styled';
import { MessageType, OMessageType } from './types';

export interface MessageProps extends BaseProps {
  type: MessageType;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

type MessageIcon = (props: SVGProps<SVGSVGElement>) => ReactElement;

export const MessageIcons: Record<MessageType, MessageIcon | null> = {
  [OMessageType.Error]: ErrorIcon,
  [OMessageType.Info]: InfoIcon,
  [OMessageType.Success]: CheckCircleIcon,
  [OMessageType.Warning]: WarningIcon,
  [OMessageType.Default]: null,
};

export const Message = ({
  children,
  dataTestId,
  style,
  type = OMessageType.Default,
  onClose,
}: MessageProps) => {
  const isDismissable = !!onClose;
  const Icon = MessageIcons[type];

  return (
    <MessageStyled
      data-testid={dataTestId ?? 'message'}
      style={style}
      type={type}
    >
      {Icon ? (
        <MessageIconStyled type={type}>
          <Icon data-testid='message-icon' height='16px' width='16px' />
        </MessageIconStyled>
      ) : null}
      <MessageContentStyled>{children}</MessageContentStyled>
      {isDismissable ? (
        <MessageButtonCloseStyled onClick={onClose}>
          <CloseIcon height='16px' width='16px' />
        </MessageButtonCloseStyled>
      ) : null}
    </MessageStyled>
  );
};

Message.Title = ({ children }: BaseProps) => {
  return (
    <Typography color='content.dark' element='h2' fontStyles='bodyMdBold'>
      {children}
    </Typography>
  );
};

Message.Description = ({ children }: BaseProps) => {
  return (
    <Typography color='content.default' fontStyles='bodySmRegular'>
      {children}
    </Typography>
  );
};

Message.Action = ({ children, dataTestId }: BaseProps) => (
  <MessageActionStyled data-testid={dataTestId ?? 'message-action'}>
    {children}
  </MessageActionStyled>
);
