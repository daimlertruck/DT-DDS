import { Meta, StoryObj } from '@storybook/react';

import { IconButton, InfoOutlineIcon, MoreVerticalIcon } from '@dt-dds/react';
import { Avatar } from '@dt-dds/react-avatar';
import { Tag, TagColor } from '@dt-dds/react-tag';
import { Tooltip } from '@dt-dds/react-tooltip';

import { TableHeadProps } from './components';
import { default as Table, TableProps } from './Table';

const columns = [
  'Name',
  'Email',
  'Role',
  'Status',
  'Phone',
  'Department',
  'Location',
  'Actions',
];

const rows = [
  [
    'John Doe',
    'john@example.com',
    'Developer',
    'green',
    '+123456789',
    'Engineering',
    'New York',
    '',
  ],
  [
    'Jane Smith',
    'jane@example.com',
    'Designer',
    'yellow',
    '+987654321',
    'Design',
    'San Francisco',
    '',
  ],
  [
    'Alice Johnson',
    'alice@example.com',
    'Manager',
    'grey',
    '+135792468',
    'Management',
    'Los Angeles',
    '',
  ],
  [
    'Bob Brown',
    'bob@example.com',
    'Engineer',
    'green',
    '+246813579',
    'Engineering',
    'Chicago',
    '',
  ],
];

const columnSizes: { [key: string]: string } = {
  Name: '200px',
  Status: '120px',
  Actions: 'fit-content',
};

const renderAvatarWithTitle = (title: string) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <Avatar size='small' title={title} />
    {title}
  </div>
);

const renderTag = (content: string) => {
  const tagColor =
    {
      green: 'success',
      yellow: 'warning',
      grey: 'secondary',
    }[content] || 'secondary';

  return (
    <Tag border='rounded' color={tagColor as TagColor} size='small'>
      {
        {
          green: 'ACTIVE',
          yellow: 'PENDING',
          grey: 'DEACTIVATED',
        }[content]
      }
    </Tag>
  );
};

const renderContent = (colIndex: number, content: string) => {
  const columnName = columns[colIndex];
  const cellContent = {
    Name: renderAvatarWithTitle(content),
    Status: renderTag(content),
    Actions: renderActionsButton(),
  }[columnName];

  return cellContent ?? content;
};

const renderActionsButton = () => (
  <IconButton>
    <MoreVerticalIcon />
  </IconButton>
);

const meta: Meta<TableProps & TableHeadProps> = {
  title: 'Data Display/Table',
  component: Table,
  render: ({ isFixed, hasFixedHeader }) => (
    <div
      style={{ ...(hasFixedHeader && { height: '200px', overflow: 'auto' }) }}
    >
      <Table isFixed={isFixed}>
        <Table.Head hasFixedHeader={hasFixedHeader}>
          <Table.Row>
            {columns.map((column: string) => (
              <Table.ColumnHeader
                dataTestId='test'
                key={`column-header-${column}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {column}
                  {column === 'Status' && (
                    <Tooltip>
                      <InfoOutlineIcon height={16} width={16} />
                      <Tooltip.Content>
                        Pending: Yellow | Active: Green | Deactivated: Grey
                      </Tooltip.Content>
                    </Tooltip>
                  )}
                </div>
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row: string[]) => (
            <Table.Row key={row.toString()}>
              {row.map((content: string, i: number) => (
                <Table.DataCell
                  columnWidth={columnSizes[columns[i]]}
                  key={`column-${columns[i]}-${content}`}
                >
                  {renderContent(i, content)}
                </Table.DataCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};

export const Default: StoryObj<TableProps & TableHeadProps> = {
  args: {
    isFixed: false,
    hasFixedHeader: false,
  },
};

export default meta;
const fixedColumnCount = 1;
const fixedEndColumnCount = 2;

export const TableWithPinnedColumns: Meta<TableProps & TableHeadProps> = {
  title: 'Table',
  component: Table,
  render: () => (
    <div style={{ width: '500px', overflow: 'auto' }}>
      <Table
        fixedColumnCount={fixedColumnCount}
        fixedEndColumnCount={fixedEndColumnCount}
      >
        <Table.Head>
          <Table.Row>
            {columns.map((column: string) => (
              <Table.ColumnHeader
                dataTestId='test'
                key={`column-header-${column}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {column}
                  {column === 'Status' && (
                    <Tooltip>
                      <InfoOutlineIcon height={16} width={16} />
                      <Tooltip.Content>
                        Pending: Yellow | Active: Green | Deactivated: Grey
                      </Tooltip.Content>
                    </Tooltip>
                  )}
                </div>
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row: string[]) => (
            <Table.Row key={row.toString()}>
              {row.map((content: string, i: number) => (
                <Table.DataCell
                  columnWidth={columnSizes[columns[i]]}
                  key={`column-${columns[i]}-${content}`}
                  style={{
                    ...(columns[i] === 'Actions' && {
                      minWidth: '65px',
                    }),
                  }}
                >
                  {renderContent(i, content)}
                </Table.DataCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};
