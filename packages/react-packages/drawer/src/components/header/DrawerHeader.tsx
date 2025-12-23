import { BaseProps } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { IconButton } from '@dt-dds/react-icon-button';

import { HeaderStyled } from './DrawerHeader.styled';
import { useDrawerContext } from '../../context/DrawerProvider';

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
        <Icon code='close' size='large' />
      </IconButton>
    </HeaderStyled>
  );
};
