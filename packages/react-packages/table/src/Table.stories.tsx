import { Meta, StoryObj } from '@storybook/react';

import { IconButton } from '@dt-dds/react';
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

const InfoOutline = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill='currentColor'
      height='24'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z' />
    </svg>
  );
};

const MoreVertical = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill='currentColor'
      height='24'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z' />
    </svg>
  );
};

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
    <MoreVertical />
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
                      <InfoOutline height={16} width={16} />
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
                      <InfoOutline height={16} width={16} />
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
