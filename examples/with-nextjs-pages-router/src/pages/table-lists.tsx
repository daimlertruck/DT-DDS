import Head from 'next/head';
import {
  Typography,
  Table,
  Avatar,
  AvatarSize,
  AvatarType,
  Tag,
  TagColor,
  Tooltip,
  IconButton,
  MoreVerticalIcon,
  InfoOutlineIcon,
  daimlertruckTheme as theme,
} from '@dt-dds/react';

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
    <Avatar size={AvatarSize.Small} title={title} type={AvatarType.Primary} />
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

export default function TableLists() {
  return (
    <>
      <Head>
        <title>Demo App - Table Lists</title>
        <meta name='description' content='Demo App' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div>
        <Typography
          element='h2'
          fontStyles='h4Bold'
          color='grey_90'
          style={{ marginBottom: '25px' }}
        >
          Table Lists
        </Typography>

        <Table isFixed={true}>
          <Table.Head hasFixedHeader={false}>
            <Table.Row>
              {columns.map((column: string) => (
                <Table.ColumnHeader
                  dataTestId='test'
                  key={`column-header-${column}`}
                  style={{
                    padding: '16px',
                    backgroundColor: theme.palette.surface.dark,
                    color: theme.palette.content.contrast,
                  }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                  >
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
    </>
  );
}
