import { hexToRgba } from '@dt-dds/themes';
import styled from '@emotion/styled';

export const ModalLoadingOverlayStyled = styled.div`
  ${({ theme }) =>
    `
      position: absolute;
      inset: 0;
      background-color: ${hexToRgba(theme.palette.surface.light, 0.8)};
      display: flex;
      align-items: center;
      justify-content: center;
  `}
`;
