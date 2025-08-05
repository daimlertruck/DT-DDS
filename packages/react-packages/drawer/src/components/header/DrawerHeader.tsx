import { BaseProps } from '@dt-dds/react-core';
import { IconButton } from '@dt-dds/react-icon-button';

import { CloseIcon } from '../../../../../dt-dds-react/core';
import { useDrawerContext } from '../../context/DrawerProvider';

import { HeaderStyled } from './DrawerHeader.styled';

export const DrawerHeader = ({ children }: BaseProps) => {
  const { handleClose } = useDrawerContext();

  return (
    <HeaderStyled data-testid='drawer-header'>
      <div>{children}</div>
      <IconButton
        color='default'
        dataTestId='drawer-close-button'
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
    </HeaderStyled>
  );
};
