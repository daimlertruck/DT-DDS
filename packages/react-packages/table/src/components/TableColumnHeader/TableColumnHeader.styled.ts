import { TABLE_HEADER_Z_INDEX } from '@dt-ui/react-core';
import styled from '@emotion/styled';

import { TextAlign } from '../../types';

interface ColumnHeaderStyled {
  textAlign?: TextAlign;
  showBoxShadow?: boolean;
  fixed?: boolean;
  fixedEnd?: boolean;
  fixedPosition?: number;
}
export const ColumnHeaderStyled = styled.th<ColumnHeaderStyled>`
  ${({
    theme,
    textAlign,
    showBoxShadow = false,
    fixed = false,
    fixedEnd = false,
    fixedPosition = 0,
  }) => `
    text-align: ${textAlign};
    color: ${theme.palette.content.dark};
    padding: 0 ${theme.spacing['2xs']} ${theme.spacing['2xs']};
    ${theme.fontStyles.button3};

    ${
      (fixed || fixedEnd) &&
      `
        left: ${fixed ? `${fixedPosition}px` : 'unset'};
        right: ${fixedEnd ? `${fixedPosition}px` : 'unset'};
        position: sticky;
        z-index: ${TABLE_HEADER_Z_INDEX};
        background: ${theme.palette.content.contrast};
        box-shadow: ${
          showBoxShadow
            ? `${fixedEnd ? '-1px' : '1px'} 0 0 0 ${theme.palette.border.light}`
            : 'unset'
        };
      `
    }
  `}
`;
