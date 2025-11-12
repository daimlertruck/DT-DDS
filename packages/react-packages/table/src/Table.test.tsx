import { render, screen, within, waitFor } from '@testing-library/react';

import '@emotion/jest';

import { withProviders } from '@dt-dds/react-core';

import { TableHeadProps, TableDataCellProps } from './components';
import { default as Table, TableProps } from './Table';

const COLUMNS = ['Column 1', 'Column 2', 'Column 3', 'Column 4'];
const ROWS = [
  [
    'Row 1 - content 1',
    'Row 1 - content 2',
    'Row 1 - content 3',
    'Row 1 - content 4',
  ],
  [
    'Row 2 - content 1',
    'Row 2 - content 2',
    'Row 2 - content 3',
    'Row 2 - content 4',
  ],
  [
    'Row 3 - content 1',
    'Row 3 - content 2',
    'Row 3 - content 3',
    'Row 3 - content 4',
  ],
];

const ProvidedTable = withProviders(Table);

const renderTableWithProps = (
  {
    isFixed,
    hasFixedHeader,
    textAlign,
    columnWidth,
  }: TableProps & TableHeadProps & TableDataCellProps = {
    isFixed: false,
    hasFixedHeader: false,
    textAlign: 'left',
    columnWidth: '',
  }
) => {
  const fixedColumnCount = 1;
  const fixedEndColumnCount = 2;

  return render(
    <ProvidedTable
      fixedColumnCount={fixedColumnCount}
      fixedEndColumnCount={fixedEndColumnCount}
      isFixed={isFixed}
    >
      <Table.Head hasFixedHeader={hasFixedHeader}>
        <Table.Row>
          {COLUMNS.map((column: string) => (
            <Table.ColumnHeader
              key={`column-header-${column}`}
              textAlign={textAlign}
            >
              {column}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {ROWS.map((row: string[]) => (
          <Table.Row key={row.toString()} onClick={jest.fn()}>
            {row.map((content: string, i: number) => (
              <Table.DataCell
                columnWidth={columnWidth}
                key={`column-${COLUMNS[i]}-${content}`}
                textAlign={textAlign}
              >
                {content}
              </Table.DataCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </ProvidedTable>
  );
};

describe('<Table /> component', () => {
  let mockIntersectionObserve: jest.SpyInstance;

  beforeEach(() => {
    mockIntersectionObserve = jest.spyOn(window, 'IntersectionObserver');
    mockIntersectionObserve.mockImplementationOnce((callback) => {
      callback([{ isIntersecting: false }]);
      return { observe: jest.fn(), disconnect: jest.fn() };
    });
  });

  it('renders a Basic Table', () => {
    const { container } = renderTableWithProps({ isFixed: true });

    expect(container).toMatchSnapshot();
  });

  it('renders a Basic Table without fixed columns', () => {
    const { container } = render(
      <ProvidedTable>
        <Table.Head>
          <Table.Row>
            {COLUMNS.map((column: string) => (
              <Table.ColumnHeader
                key={`column-header-${column}`}
                textAlign='left'
              >
                {column}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {ROWS.map((row: string[]) => (
            <Table.Row key={row.toString()}>
              {row.map((content: string, i: number) => (
                <Table.DataCell
                  columnWidth=''
                  key={`column-${COLUMNS[i]}-${content}`}
                  textAlign='left'
                >
                  {content}
                </Table.DataCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </ProvidedTable>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders a Composable Table with a custom data structure', () => {
    renderTableWithProps();

    // Test head columns are rendered
    COLUMNS.forEach((column: string) => {
      const cell = within(screen.getByTestId('table-head'))
        .getByText(column)
        .closest('th');

      const utils = within(cell!);

      expect(utils.getByText(column)).toBeInTheDocument();
    });

    // Test rows content are in rendered
    ROWS.forEach((row: string[]) => {
      row.forEach((cell: string) => {
        const dataCell = screen.getByText(cell).closest('td');
        const utils = within(dataCell!);

        expect(utils.getByText(cell)).toBeInTheDocument();
      });
    });
  });

  it('applies the expected styles when Table has Fixed Header', () => {
    renderTableWithProps({ hasFixedHeader: true });

    const theadElement = screen.getByTestId('table-head');

    expect(theadElement).toHaveStyleRule('position', 'sticky');
  });

  it('applies custom column Width to table data cell', () => {
    renderTableWithProps({ columnWidth: '20px' });

    const tdElements = screen.getAllByTestId('table-data-cell');

    tdElements.map(async (e) => {
      await waitFor(() => expect(e).toHaveStyleRule('max-width', '20px'));
    });
  });

  it('applies the expected styles when Table has text aligned center', () => {
    renderTableWithProps({ textAlign: 'center' });

    const thElements = screen.getAllByTestId('table-column-header');
    const tdElements = screen.getAllByTestId('table-data-cell');

    expect(thElements).toHaveLength(4);
    thElements.map((e) => {
      expect(e).toHaveStyleRule('text-align', 'center');
    });

    tdElements.map((e) => {
      expect(e).toHaveStyleRule('text-align', 'center');
    });
  });

  it('applies the expected styles when Table has fixed columns', () => {
    renderTableWithProps();

    const fixedColumn = screen.getByText('Column 1');
    const fixedEndColumn1 = screen.getByText('Column 3');
    const fixedEndColumn2 = screen.getByText('Column 4');

    expect(fixedColumn).toHaveStyleRule('position', 'sticky');
    expect(fixedEndColumn1).toHaveStyleRule('position', 'sticky');
    expect(fixedEndColumn2).toHaveStyleRule('position', 'sticky');
  });
});
