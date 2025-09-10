import { MODAL_Z_INDEX } from '@dt-dds/react-core';
import styled from '@emotion/styled';

export const ModalStyled = styled.div`
  position: fixed;
  z-index: ${MODAL_Z_INDEX};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;

  ${({ theme }) => `
      background-color: ${theme.palette.surface.contrast};
      border-radius: ${theme.shape.modal};
      box-shadow: ${theme.shadows.elevation_200};

      @media only screen and (min-width: ${theme.breakpoints.mq3}px)  {
        width: 650px;
        height: auto;
        justify-content: normal;
      }
  `}
`;
