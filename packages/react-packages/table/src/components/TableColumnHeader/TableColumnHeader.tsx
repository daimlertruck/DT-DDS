import { DetailedHTMLProps, ThHTMLAttributes } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { ColumnHeaderStyled } from './TableColumnHeader.styled';
import { useTableContext } from '../../context';
import { TextAlign } from '../../types';

export interface TableColumnHeaderProps
  extends BaseProps,
    DetailedHTMLProps<
      ThHTMLAttributes<HTMLTableCellElement>,
      HTMLTableCellElement
    > {
  textAlign?: TextAlign;
}

export const TableColumnHeader = ({
  children,
  style,
  dataTestId,
  textAlign = 'left',
  ...rest
}: TableColumnHeaderProps) => {
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
    <ColumnHeaderStyled
      data-testid={dataTestId ?? 'table-column-header'}
      style={style}
      textAlign={textAlign}
      {...fixedProps}
      {...rest}
    >
      {children}
    </ColumnHeaderStyled>
  );
};
