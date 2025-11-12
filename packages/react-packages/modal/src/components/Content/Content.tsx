import { BaseProps } from '@dt-dds/react-core';

import { ModalLoadingOverlay } from '../LoadingOverlay';
import { ContentStyled } from './Content.styled';

export interface ModalContentProps extends BaseProps {
  isLoading?: boolean;
}

export const ModalContent = ({
  children,
  style,
  dataTestId,
  isLoading = false,
}: ModalContentProps) => {
  return (
    <ContentStyled data-testid={dataTestId} style={style}>
      {isLoading ? <ModalLoadingOverlay /> : null}
      {children}
    </ContentStyled>
  );
};
