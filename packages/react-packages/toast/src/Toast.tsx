import { Box } from '@dt-dds/react-box';
import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { Tooltip } from '@dt-dds/react-tooltip';
import { Typography } from '@dt-dds/react-typography';
import { useTheme } from '@emotion/react';
import React from 'react';

import { Action, ToastType } from './constants';
import {
  ActionButtonStyled,
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
  actions?: [Action] | [Action, Action];
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
  actions,
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
          style={{
            textTransform: 'capitalize',
          }}
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

      {actions && actions?.length > 0 ? (
        <Box
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: theme.spacing.spacing_20,
            marginTop: theme.spacing.spacing_30,
          }}
        >
          {actions.map(({ label, onClick, dataTestId, tooltip }, index) => {
            if (index > 1) return null;

            const actionButtonElement = (
              <ActionButtonStyled
                data-testid={dataTestId}
                onClick={onClick}
                size='small'
                toastType={type}
                variant='text'
              >
                {label}
              </ActionButtonStyled>
            );
            return tooltip?.message ? (
              <Tooltip key={label}>
                {actionButtonElement}
                <Tooltip.Content background={tooltip?.background ?? 'full'}>
                  {tooltip?.message}
                </Tooltip.Content>
              </Tooltip>
            ) : (
              <React.Fragment key={label}>{actionButtonElement}</React.Fragment>
            );
          })}
        </Box>
      ) : null}
    </ToastStyled>
  );
};

export default Toast;
