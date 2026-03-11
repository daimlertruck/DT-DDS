import styled from '@emotion/styled';

import { Button } from '@dt-dds/react-button';

import { PAGINATION_BUTTON_SIZES } from '../../constants';

export const ButtonStyled = styled(Button)`
  ${({ theme }) => `
    ${theme.fontStyles.bodyMdRegular};
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: ${PAGINATION_BUTTON_SIZES}px;
    height: ${PAGINATION_BUTTON_SIZES}px;
    color: ${theme.palette.content.default};
    user-select: none;
  `}
`;
