import { useTheme } from '@emotion/react';

import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';

import { MAX_PROGRESS_BAR_VALUE, MIN_PROGRESS_BAR_VALUE } from './constants';
import {
  ProgressBarFieldStyled,
  ProgressBarWrapperStyled,
  ProgressBarStyled,
  ProgressBarTrackStyled,
  ProgressBarIconStyled,
  ProgressBarPercentageTextStyled,
  ProgressBarHelperTextStyled,
} from './ProgressBar.styled';
import { ProgressBarSize, ProgressBarState, ProgressBarInfo } from './types';

export interface ProgressBarProps {
  state: ProgressBarState;
  value: number;
  label?: string;
  helperText?: string;
  info?: ProgressBarInfo;
  size?: ProgressBarSize;
}

export const ProgressBar = ({
  state,
  value,
  label,
  helperText,
  size = 'small',
  info = 'none',
}: ProgressBarProps) => {
  const normalizedValue = Math.min(
    Math.max(value, MIN_PROGRESS_BAR_VALUE),
    MAX_PROGRESS_BAR_VALUE
  );
  const theme = useTheme();

  return (
    <ProgressBarFieldStyled>
      {label ? (
        <Typography color='content.default' fontStyles='bodyMdBold'>
          {label}
        </Typography>
      ) : null}

      <ProgressBarWrapperStyled>
        <ProgressBarTrackStyled
          aria-label={label}
          aria-valuemax={MAX_PROGRESS_BAR_VALUE}
          aria-valuemin={MIN_PROGRESS_BAR_VALUE}
          aria-valuenow={normalizedValue}
          role='progressbar'
        >
          <ProgressBarStyled
            progress={normalizedValue}
            size={size}
            state={state}
          />
        </ProgressBarTrackStyled>

        {renderInfo()}
      </ProgressBarWrapperStyled>

      {helperText ? (
        <ProgressBarHelperTextStyled state={state}>
          {helperText}
        </ProgressBarHelperTextStyled>
      ) : null}
    </ProgressBarFieldStyled>
  );

  function renderInfo() {
    if (info === 'none') {
      return;
    }

    const ProgressIcon = {
      success: (
        <Icon
          code='check_circle'
          color={theme.palette.success.default}
          size='small'
        />
      ),
      error: (
        <Icon code='error' color={theme.palette.error.default} size='small' />
      ),
    } as const;

    let content = (
      <ProgressBarPercentageTextStyled state={state}>
        {`${normalizedValue}%`}
      </ProgressBarPercentageTextStyled>
    );

    if (state !== 'active') {
      if (info === 'icon') {
        content = (
          <ProgressBarIconStyled>{ProgressIcon[state]}</ProgressBarIconStyled>
        );
      }

      if (info === 'both') {
        content = (
          <>
            {content}
            <ProgressBarIconStyled>{ProgressIcon[state]}</ProgressBarIconStyled>
          </>
        );
      }
    }

    return content;
  }
};
