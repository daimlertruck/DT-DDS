import { useEffect, useRef, useState } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import {
  TableBody,
  TableColumnHeader,
  TableDataCell,
  TableHead,
  TableRow,
} from './components';
import { TableContextProvider } from './context';
import { TableStyled } from './Table.styled';
import { observeShouldColumnsBeFixed } from './utils/fixedColumns';

export interface TableProps extends BaseProps {
  isFixed?: boolean;
  fixedColumnCount?: number;
  fixedEndColumnCount?: number;
}

const Table = ({
  children,
  dataTestId,
  style,
  isFixed = false,
  fixedColumnCount = 0,
  fixedEndColumnCount = 0,
}: TableProps) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const [isColumnsFixed, setIsColumnsFixed] = useState(false);

  useEffect(() => {
    const observer = observeShouldColumnsBeFixed(
      tableRef,
      fixedColumnCount,
      fixedEndColumnCount,
      setIsColumnsFixed
    );
    return () => observer.disconnect();
  }, [fixedColumnCount, fixedEndColumnCount]);

  return (
    <TableContextProvider
      fixedColumnCount={fixedColumnCount}
      fixedEndColumnCount={fixedEndColumnCount}
      isColumnsFixed={isColumnsFixed}
    >
      <TableStyled
        data-testid={dataTestId ?? 'table'}
        isFixed={isFixed}
        ref={tableRef}
        style={style}
      >
        {children}
      </TableStyled>
    </TableContextProvider>
  );
};

Table.Head = TableHead;
Table.ColumnHeader = TableColumnHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.DataCell = TableDataCell;

export default Table;
