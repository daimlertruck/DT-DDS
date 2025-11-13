import { Code } from '@dt-dds/icons';
import { Box } from '@dt-dds/react-box';
import { useMedia } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';
import { useTheme } from '@emotion/react';
import { Children, cloneElement, ReactElement, useMemo } from 'react';

import { MESSAGE_ICONS } from './constants';
import {
  MessageActionsStyled,
  MessageButtonCloseStyled,
  MessageStyled,
} from './Message.styled';
import { ActionsProps, MessageProps, OMessageType } from './types';

export const Message = ({
  children,
  dataTestId,
  style,
  type = OMessageType.Default,
  onClose,
  description,
  title,
  orientation: propOrientation = 'horizontal',
}: MessageProps) => {
  const theme = useTheme();
  const isDefault = type === OMessageType.Default;
  const isMobile = useMedia(`(max-width: ${theme.breakpoints.mq2}px)`);
  const orientation = isMobile ? 'vertical' : propOrientation || 'horizontal';
  const isHorizontal = orientation === 'horizontal';
  const isDismissible = !!onClose;
  const textColor = isDefault ? 'content.default' : `${type}.dark`;
  const iconColor = isDefault
    ? theme.palette.content.default
    : theme.palette[type].dark;

  const clonedChildren = useMemo(
    () =>
      Children.map(children as ReactElement<MessageProps>, (child) => {
        return (
          child &&
          cloneElement(child, {
            ...child.props,
            type: type,
          })
        );
      }),
    [children, type]
  );

  return (
    <MessageStyled
      data-testid={dataTestId ?? 'message'}
      messageType={type}
      orientation={orientation}
      style={style}
    >
      {!isDefault && (
        <Icon
          code={MESSAGE_ICONS[type] as Code}
          color={theme.palette[type].dark}
          data-testid='message-icon'
          dataTestId='message-icon'
        />
      )}

      <Box
        dataTestId='message-content'
        style={{
          flexDirection: isHorizontal ? 'row' : 'column',
          justifyContent: 'space-between',
          gap: isHorizontal
            ? theme.spacing.spacing_30
            : theme.spacing.spacing_50,
          alignItems: isHorizontal ? 'center' : 'start',
        }}
      >
        <Box
          style={{ alignItems: 'flex-start', gap: theme.spacing.spacing_10 }}
        >
          {title ? (
            <Typography color={textColor} fontStyles='bodyLgBold'>
              {title}
            </Typography>
          ) : null}
          <Typography color={textColor} fontStyles='bodyLgRegular'>
            {description}
          </Typography>
        </Box>
        {clonedChildren}
      </Box>

      {isDismissible ? (
        <MessageButtonCloseStyled
          aria-label='Close message'
          messageType={type}
          onClick={onClose}
          orientation={orientation}
        >
          <Icon code='close' color={iconColor} />
        </MessageButtonCloseStyled>
      ) : null}
    </MessageStyled>
  );
};

Message.Actions = ({ children, dataTestId, type }: ActionsProps) => (
  <MessageActionsStyled
    data-testid={dataTestId ?? 'message-actions'}
    messageType={type!}
  >
    {children}
  </MessageActionsStyled>
);
