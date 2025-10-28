import { BaseProps } from '@dt-dds/react-core';
import { Typography } from '@dt-dds/react-typography';
import { theme } from '@dt-dds/themes';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { FieldScale } from './constants';
import { LabelFieldStyled } from './LabelField.styled';

export interface LabelFieldProps
  extends ComponentPropsWithoutRef<'label'>,
    BaseProps {
  isDisabled?: boolean;
  isActive?: boolean;
  hasError?: boolean;
  isRequired?: boolean;
  isFloating?: boolean;
  isInputFilled?: boolean;
  isCentered?: boolean;
  icon?: ReactNode;
  scale?: FieldScale;
}

export const LabelField = ({
  children,
  isDisabled = false,
  isActive = false,
  dataTestId,
  isRequired,
  hasError = false,
  isFloating = true,
  isInputFilled = false,
  htmlFor,
  isCentered = false,
  scale = 'standard',
  icon,
  ...rest
}: LabelFieldProps) => {
  const testId = dataTestId ?? 'label-field';

  const labelContent = (
    <>
      {children}
      {isRequired && !isDisabled ? (
        <Typography
          color='error.default'
          element='span'
          fontStyles='bodySmRegular'
        >
          *
        </Typography>
      ) : null}
      {icon ? (
        <span
          style={{
            marginLeft: theme.spacing.spacing_20,
            display: 'inline-flex',
            verticalAlign: 'middle',
          }}
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  return (
    <LabelFieldStyled
      data-testid={testId}
      disabled={isDisabled}
      hasError={hasError}
      htmlFor={htmlFor}
      isActive={isActive}
      isCentered={isCentered}
      isFloating={isFloating}
      isInputFilled={isInputFilled}
      scale={scale}
      {...rest}
    >
      {labelContent}
    </LabelFieldStyled>
  );
};
