import { Box } from '@dt-dds/react-box';
import { BaseProps } from '@dt-dds/react-core';
import { Typography } from '@dt-dds/react-typography';
import { useTheme } from '@emotion/react';

import {
  CheckCircleOutlineIcon,
  CloseIcon,
  ErrorOutlineIcon,
  InfoOutlineIcon,
  WarningOutlineIcon,
} from '../../../dt-dds-react/core';

import { ToastType } from './constants';
import {
  ToastButtonCloseStyled,
  ToastMessageStyled,
  ToastStyled,
} from './Toast.styled';

export interface ToastProps extends BaseProps {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  onClose: () => void;
  isVisible?: boolean;
  dismissible?: boolean;
}

const ToastIcons = {
  [ToastType.Success]: CheckCircleOutlineIcon,
  [ToastType.Error]: ErrorOutlineIcon,
  [ToastType.Info]: InfoOutlineIcon,
  [ToastType.Warning]: WarningOutlineIcon,
};

const Toast = ({
  children,
  id,
  dataTestId,
  title,
  message,
  onClose,
  type,
  isVisible = true,
  dismissible = true,
}: ToastProps) => {
  const Icon = ToastIcons[type];
  const dataTest = dataTestId ?? `toast-${id}`;
  const theme = useTheme();

  return (
    <ToastStyled
      data-testid={dataTest}
      isVisible={isVisible}
      key={id}
      type={type}
    >
      <Box style={{ flexDirection: 'row', gap: theme.spacing.spacing_30 }}>
        <Box style={{ alignSelf: 'start' }}>
          <Icon color={theme.palette[type].dark} height={20} width={20} />
        </Box>

        <Box style={{ alignItems: 'start' }}>
          <Typography
            color={`${type}.dark`}
            element='span'
            fontStyles='bodyLgBold'
            style={{
              textTransform: 'capitalize',
            }}
          >
            {title}
          </Typography>
          <ToastMessageStyled type={type}>{message}</ToastMessageStyled>
        </Box>
        {dismissible ? (
          <ToastButtonCloseStyled onClick={onClose} toastType={type}>
            <CloseIcon />
          </ToastButtonCloseStyled>
        ) : null}
      </Box>
      {Boolean(children) && (
        <Box
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          {children}
        </Box>
      )}
    </ToastStyled>
  );
};

export default Toast;
