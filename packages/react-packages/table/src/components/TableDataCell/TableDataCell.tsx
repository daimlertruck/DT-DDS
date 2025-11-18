import { DetailedHTMLProps, TdHTMLAttributes } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { CellStyled } from './TableDataCell.styled';
import { useTableContext } from '../../context';
import { TextAlign } from '../../types';

export interface TableDataCellProps
  extends BaseProps,
    DetailedHTMLProps<
      TdHTMLAttributes<HTMLTableCellElement>,
      HTMLTableCellElement
    > {
  columnWidth?: string;
  textAlign?: TextAlign;
}

export const TableDataCell = ({
  children,
  columnWidth,
  style,
  dataTestId,
  textAlign = 'left',
  ...rest
}: TableDataCellProps) => {
  const { fixedColumns, fixedEndColumns, showBoxShadow } = useTableContext();
  const columnIndex = Number(
    (rest as Record<string, string>)['data-column-index']
  );
  const fixedPosition = Number(
    (rest as Record<string, string>)['data-fixed-position']
  );
  const fixedColumnIndex = fixedColumns.indexOf(columnIndex);
  const fixedEndColumnIndex = fixedEndColumns.indexOf(columnIndex);

  let fixedProps = {};

  if (fixedColumns?.length || fixedEndColumns?.length) {
    fixedProps = {
      fixed: fixedColumnIndex !== -1,
      fixedEnd: fixedEndColumnIndex !== -1,
      showBoxShadow: showBoxShadow.includes(columnIndex),
      fixedPosition,
    };
  }

  return (
    <CellStyled
      columnWidth={columnWidth}
      data-testid={dataTestId ?? 'table-data-cell'}
      style={style}
      textAlign={textAlign}
      {...fixedProps}
      {...rest}
    >
      {children}
    </CellStyled>
  );
};
