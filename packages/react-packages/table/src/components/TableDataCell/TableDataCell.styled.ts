import { TABLE_STICKY_COLUMN_Z_INDEX } from '@dt-ui/react-core';
import styled from '@emotion/styled';

import { COLUMN_MIN_WIDTH } from '../../constants';
import { TextAlign } from '../../types';

interface CellStyledProps {
  columnWidth?: string;
  textAlign?: TextAlign;
  showBoxShadow?: boolean;
  fixed?: boolean;
  fixedEnd?: boolean;
  fixedPosition?: number;
}

export const CellStyled = styled.td<CellStyledProps>`
  ${({
    theme,
    columnWidth,
    textAlign,
    showBoxShadow = false,
    fixed = false,
    fixedEnd = false,
    fixedPosition = 0,
  }) => `
    display: table-cell;
    min-width: ${COLUMN_MIN_WIDTH}px;
    word-break: break-word;
    border-top: 1px solid ${theme.palette.border.light};
    padding: ${theme.spacing['2xs']};
    text-align: ${textAlign};
    color: ${theme.palette.content.default};
    ${theme.fontStyles.body2};

    &:first-of-type {
      padding-top: ${theme.spacing['2xs']};
      border-bottom: none;
    }

    ${
      !!columnWidth
        ? `
        width: ${columnWidth};
        max-width: ${columnWidth};
      `
        : ''
    }

    ${
      (fixed || fixedEnd) &&
      `
        left: ${fixed ? `${fixedPosition}px` : 'unset'};
        right: ${fixedEnd ? `${fixedPosition}px` : 'unset'};
        position: sticky;
        z-index: ${TABLE_STICKY_COLUMN_Z_INDEX};
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
