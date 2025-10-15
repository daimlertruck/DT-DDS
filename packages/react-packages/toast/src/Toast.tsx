import { Box } from '@dt-dds/react-box';
import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';
import { useTheme } from '@emotion/react';
import { ReactNode } from 'react';

import { ToastType } from './constants';
import {
  ActionsContainer,
  ToastButtonCloseStyled,
  ToastMessageStyled,
  ToastStyled,
} from './Toast.styled';

export interface ToastProps extends Pick<BaseProps, 'dataTestId'> {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  onClose: () => void;
  isVisible?: boolean;
  dismissible?: boolean;
  children?: ReactNode;
}

const ToastIcons: Record<
  ToastType,
  'check_circle' | 'error' | 'info' | 'warning'
> = {
  [ToastType.Success]: 'check_circle',
  [ToastType.Error]: 'error',
  [ToastType.Info]: 'info',
  [ToastType.Warning]: 'warning',
};

const Toast = ({
  id,
  dataTestId,
  title,
  message,
  onClose,
  type,
  isVisible = true,
  dismissible = true,
  children,
}: ToastProps) => {
  const dataTest = dataTestId ?? `toast-${id}`;
  const theme = useTheme();

  return (
    <ToastStyled
      data-testid={dataTest}
      isVisible={isVisible}
      key={id}
      toastType={type}
    >
      <Box
        style={{
          alignSelf: 'start',
          flexDirection: 'row',
          width: '100%',
          gap: theme.spacing.spacing_30,
        }}
      >
        <Icon code={ToastIcons[type]} color={theme.palette[type].dark} />

        <Typography
          color={`${type}.dark`}
          element='span'
          fontStyles='bodyLgBold'
        >
          {title}
        </Typography>

        {dismissible ? (
          <ToastButtonCloseStyled
            data-testId='close-button'
            onClick={onClose}
            toastType={type}
          >
            <Icon code='close' color={theme.palette[type].dark} />
          </ToastButtonCloseStyled>
        ) : null}
      </Box>
      <ToastMessageStyled toastType={type}>{message}</ToastMessageStyled>

      {Boolean(children) ? (
        <ActionsContainer toastType={type}>{children}</ActionsContainer>
      ) : null}
    </ToastStyled>
  );
};

export default Toast;
