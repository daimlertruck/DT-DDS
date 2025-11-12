import { Children, isValidElement } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { TableHeadStyled } from './TableHead.styled';
import { useTableContext } from '../../context';

export interface TableHeadProps extends BaseProps {
  hasFixedHeader?: boolean;
}

export const TableHead = ({
  style,
  dataTestId,
  children,
  hasFixedHeader = false,
}: TableHeadProps) => {
  const { setColumnsLength } = useTableContext();

  Children.map(children, (child) => {
    if (isValidElement(child)) {
      setColumnsLength(child.props.children?.length ?? 0);
    }
  });

  return (
    <TableHeadStyled
      data-testid={dataTestId ?? 'table-head'}
      hasFixedHeader={hasFixedHeader}
      style={style}
    >
      {children}
    </TableHeadStyled>
  );
};
