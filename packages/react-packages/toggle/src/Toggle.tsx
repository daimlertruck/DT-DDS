import { BaseProps } from '@dt-dds/react-core';
import { MouseEvent, KeyboardEvent } from 'react';

import {
  ToggleCheckBoxStyled,
  ToggleSwitchStyled,
  ToggleWrapperStyled,
} from './Toggle.styled';

export interface ToggleProps extends BaseProps {
  dataTestId?: string;
  isDisabled?: boolean;
  isChecked?: boolean;
  label?: string;
  onClick: (
    evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => void;
}

export const Toggle = ({
  dataTestId,
  label,
  isDisabled = false,
  isChecked = false,
  onClick,
}: ToggleProps) => {
  const testId = dataTestId ?? 'toggle';
  const checkboxId = `${testId}-checkbox-id`;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled) {
      return;
    }
    onClick(event);
  };

  const handleEnterClick = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled) {
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <ToggleWrapperStyled
      data-testid={testId}
      hasLabel={!!label}
      onClick={handleClick}
      onKeyDown={handleEnterClick}
    >
      <ToggleCheckBoxStyled
        checked={isChecked}
        disabled={isDisabled}
        id={checkboxId}
        type='checkbox'
      />
      <ToggleSwitchStyled />
      <span>{label}</span>
    </ToggleWrapperStyled>
  );
};
