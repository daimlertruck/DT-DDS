import { BaseProps } from '@dt-dds/react-core';
import { Typography } from '@dt-dds/react-typography';

import { DropdownDetailStyled } from './DropdownDetail.styled';

export interface DropdownDetailProps extends BaseProps {
  isDisabled?: boolean;
  hasError?: boolean;
}

export const DropdownDetail = ({
  dataTestId,
  isDisabled = false,
  hasError = false,
  children = '',
}: DropdownDetailProps) => {
  const messageColor = isDisabled ? 'content.light' : 'content.medium';

  return (
    <DropdownDetailStyled data-testid={dataTestId ?? 'dropdown-text'}>
      <Typography
        color={hasError ? 'error.default' : messageColor}
        element='span'
        fontStyles='bodySmRegular'
      >
        {children}
      </Typography>
    </DropdownDetailStyled>
  );
};
