import { cloneElement, useRef } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { RowStyled } from './TableRow.styled';
import { useTableContext } from '../../context';
import {
  getColumnsWidths,
  getFixedColumnPosition,
  getFixedEndColumnPosition,
  mapValidChildren,
} from '../../utils/fixedColumns';

const SHADOW_COLUMN_LEFT = 0;
const SHADOW_COLUMN_RIGHT = 1;

export interface TableRowProps extends BaseProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const TableRow = ({
  children,
  dataTestId,
  style,
  onClick,
}: TableRowProps) => {
  const isSelectable = Boolean(onClick);
  const {
    columnsLength,
    setFixedColumns,
    setFixedEndColumns,
    fixedColumnCount,
    fixedEndColumnCount,
    isColumnsFixed,
    setShowBoxShadow,
  } = useTableContext();
  const rowRef = useRef<HTMLTableRowElement>(null);
  let childrenColumns = children;

  if (isColumnsFixed && rowRef.current) {
    const fixedColumns: number[] = [];
    const fixedEndColumns: number[] = [];
    const fixedColumnsShadowIndexes: number[] = [];

    const columnsWidths = getColumnsWidths(rowRef.current);

    childrenColumns = mapValidChildren(children, (child, index) => {
      let fixedPosition = 0;
      const isFixed = index < fixedColumnCount;
      const isFixedEnd = index >= columnsLength - fixedEndColumnCount;

      if (isFixed) {
        fixedPosition = getFixedColumnPosition(index, columnsWidths);
        fixedColumns.push(index);
        fixedColumnsShadowIndexes[SHADOW_COLUMN_LEFT] = index;
      }

      if (isFixedEnd) {
        fixedPosition = getFixedEndColumnPosition(index, columnsWidths);
        fixedEndColumns.unshift(index);
        fixedColumnsShadowIndexes[SHADOW_COLUMN_RIGHT] =
          fixedColumnsShadowIndexes[1] ?? index;
      }

      return isFixed || isFixedEnd
        ? cloneElement(child, {
            ...child.props,
            'data-column-index': index,
            'data-fixed-position': fixedPosition,
          })
        : child;
    });

    setFixedColumns(fixedColumns);
    setFixedEndColumns(fixedEndColumns);
    setShowBoxShadow(fixedColumnsShadowIndexes);
  }

  return (
    <RowStyled
      ref={rowRef}
      {...(onClick && { onClick })}
      data-testid={dataTestId ?? 'table-row'}
      selectableRow={isSelectable}
      style={style}
    >
      {childrenColumns}
    </RowStyled>
  );
};
