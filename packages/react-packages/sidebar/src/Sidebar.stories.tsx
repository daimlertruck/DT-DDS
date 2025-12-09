import { useEffect } from 'react';

import { useTheme } from '@emotion/react';

import { AppHeader } from '@dt-dds/react-app-header';
import { Avatar } from '@dt-dds/react-avatar';
import { Box } from '@dt-dds/react-box';
import { useMedia } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { IconButton } from '@dt-dds/react-icon-button';
import { Typography } from '@dt-dds/react-typography';

import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MINI } from './constants';
import { useSidebar } from './hooks';
import { type SidebarProps, Sidebar } from './Sidebar';

import type { Meta, StoryObj } from '@storybook/react';

interface SidebarStory extends Omit<SidebarProps, 'isExpanded'> {
  isExpanded?: boolean;
  showMainHeader?: boolean;
}

const AppHeaderLayout = ({
  isMobile,
  toggleSidebar,
}: {
  isMobile: boolean;
  toggleSidebar: () => void;
}) => {
  const theme = useTheme();
  return (
    <AppHeader
      style={{
        borderBottom: `1px solid ${theme.palette.border.default}`,
      }}
      type='compact'
    >
      <AppHeader.Logo>
        <Typography
          color='primary.default'
          element='p'
          fontStyles={`${isMobile ? 'h6' : 'h5'}`}
          id='brandName'
        >
          Daimler Truck
        </Typography>
      </AppHeader.Logo>

      <AppHeader.AppName name='My App' />

      <AppHeader.Actions position='right'>
        <IconButton
          ariaLabel='search'
          dataTestId='search-btn'
          onClick={() => null}
          size='medium'
          variant='default'
        >
          <Icon aria-expanded={false} code='search' />
        </IconButton>
        <IconButton
          ariaLabel='internationalization'
          dataTestId='language-btn'
          onClick={() => null}
          size='medium'
          variant='default'
        >
          <Icon aria-expanded={false} code='language' />
        </IconButton>
        <Box
          style={{
            flexFlow: 'row nowrap',
            gap: theme.spacing.spacing_30,
          }}
        >
          {isMobile ? null : (
            <Typography
              color='primary.default'
              element='p'
              fontStyles='bodySmBold'
              id='userName'
            >
              John Doe
            </Typography>
          )}
          <IconButton
            aria-controls='userName'
            aria-expanded='false'
            aria-haspopup='true'
            ariaLabel='User Menu'
          >
            <Avatar size='medium' title='John Doe' />
          </IconButton>
        </Box>
        {isMobile ? (
          <IconButton
            ariaLabel='Toggle sidebar'
            onClick={toggleSidebar}
            size='medium'
            variant='default'
          >
            <Icon code='menu_open' />
          </IconButton>
        ) : null}
      </AppHeader.Actions>
    </AppHeader>
  );
};

const StoryLayout = ({
  children,
  isExpanded,
  isMobile,
  showMainHeader,
  toggleSidebar,
}: {
  children: React.ReactNode;
  isExpanded: boolean;
  isMobile: boolean;
  showMainHeader: boolean;
  toggleSidebar: () => void;
}) => {
  const theme = useTheme();
  const spacerWidth = isMobile
    ? 0
    : isExpanded
    ? SIDEBAR_WIDTH
    : SIDEBAR_WIDTH_MINI;

  return (
    <div
      style={{
        width: '100%',
        height: '550px',
        overflow: 'hidden',
        backgroundColor: theme.palette.surface.contrast,
        display: 'flex',
        flexFlow: 'row nowrap',
      }}
    >
      <div
        style={{
          width: spacerWidth,
          flexShrink: 0,
          transition: 'width 0.2s ease-in-out',
        }}
      />
      {showMainHeader ? (
        <AppHeaderLayout isMobile={isMobile} toggleSidebar={toggleSidebar} />
      ) : null}
      {children}
      <main
        style={{
          display: 'flex',
          flex: '1 1 0%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.surface.light,
          padding: theme.spacing.spacing_60,
        }}
      >
        <Typography color='content.default' fontStyles='bodyLgRegular'>
          Main content area
        </Typography>
      </main>
    </div>
  );
};

const SidebarDemo = (props: SidebarStory) => {
  const theme = useTheme();
  const isMobile = useMedia(`(max-width: ${theme.breakpoints.mq3}px)`);

  // Use useSidebar hook to manage state externally
  const { isExpanded, setIsExpanded, toggleSidebar } = useSidebar({
    isExpanded: props.isExpanded ?? !isMobile,
  });

  const showMainHeader = props.showMainHeader ?? false;

  const mainHeaderheight = isMobile ? 72 : 64;

  const offsetTop = showMainHeader ? mainHeaderheight : 0;

  const mockHref =
    typeof window !== 'undefined' ? window.location.pathname : '/';

  // Sync Storybook control with hook state
  useEffect(() => {
    if (props.isExpanded !== undefined) {
      setIsExpanded(props.isExpanded);
    }
  }, [props.isExpanded, setIsExpanded]);

  return (
    <StoryLayout
      isExpanded={isExpanded}
      isMobile={isMobile}
      showMainHeader={showMainHeader}
      toggleSidebar={toggleSidebar}
    >
      <Sidebar
        ariaLabel='Sidebar navigation'
        isExpanded={isExpanded}
        offsetTop={props.offsetTop || offsetTop}
        onToggle={toggleSidebar}
        placement={props.placement}
      >
        <Sidebar.Header show={`(max-width: ${theme.breakpoints.mq3}px)`}>
          <Sidebar.Item>
            <Sidebar.Toggle />
            <Typography color='primary.default' element='h2' fontStyles='h5'>
              Daimler Truck
            </Typography>
          </Sidebar.Item>
        </Sidebar.Header>

        <Sidebar.Divider show={`(max-width: ${theme.breakpoints.mq3}px)`} />

        <Sidebar.Content>
          <Sidebar.Section>
            <Sidebar.Item href='/'>
              <Icon code='dashboard' />
              Dashboard
            </Sidebar.Item>
          </Sidebar.Section>
          <Sidebar.Divider />
          <Sidebar.Section title='Sales Management'>
            <Sidebar.Item href={mockHref}>
              <Icon code='finance' />
              Sales & Quotes
              <Sidebar.SubList>
                <Sidebar.Item href={mockHref}>All Quotes</Sidebar.Item>
                <Sidebar.Item href='/sales-and-quotes/pending'>
                  Pending Quotes
                </Sidebar.Item>
                <Sidebar.Item href='/sales-and-quotes/new'>
                  New Quote
                </Sidebar.Item>
              </Sidebar.SubList>
            </Sidebar.Item>
          </Sidebar.Section>

          <Sidebar.Divider />

          <Sidebar.Section title='Customer Management'>
            <Sidebar.Item href='/credit-applications'>
              <Icon code='credit_score' />
              Credit Applications
            </Sidebar.Item>
            <Sidebar.Item href='/contracts'>
              <Icon code='contract_edit' />
              Contracts
            </Sidebar.Item>
            <Sidebar.Item href='/customers'>
              <Icon code='person_pin' />
              Customers
            </Sidebar.Item>
          </Sidebar.Section>
        </Sidebar.Content>

        <Sidebar.Footer>
          <Sidebar.Item href='/dashboard'>
            <Icon code='book' />
            <Typography color='inherit' element='span' fontStyles='bodyMdBold'>
              Terms of Use
            </Typography>
          </Sidebar.Item>
          <Sidebar.Item>
            <IconButton ariaLabel='User profile' onClick={() => null}>
              <Avatar size='medium' title='Account' type='thumbnail' />
            </IconButton>
            <Typography
              color='inherit'
              element='span'
              fontStyles='bodyMdBold'
              onClick={() => null}
              onKeyDown={() => null}
              role='button'
              tabIndex={0}
            >
              Account
            </Typography>
          </Sidebar.Item>
        </Sidebar.Footer>

        <Sidebar.Divider hide={`(max-width: ${theme.breakpoints.mq3}px)`} />

        <Sidebar.Footer hide={`(max-width: ${theme.breakpoints.mq3}px)`}>
          <Sidebar.Item>
            <Sidebar.Toggle />
            <Typography
              color='inherit'
              element='span'
              fontStyles='bodyMdBold'
              onClick={toggleSidebar}
              onKeyDown={toggleSidebar}
              role='button'
              tabIndex={0}
            >
              Collapse
            </Typography>
          </Sidebar.Item>
        </Sidebar.Footer>
      </Sidebar>
    </StoryLayout>
  );
};

const meta: Meta<SidebarStory> = {
  title: 'Compound Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A compound component for building navigation sidebars. State is managed externally via `useSidebar` hook.',
      },
    },
  },
  args: {
    isExpanded: true,
    placement: 'left',
    offsetTop: 0,
  },
  argTypes: {
    isExpanded: {
      control: 'boolean',
      description: 'Controls sidebar expanded/collapsed state',
      defaultValue: {
        summary: true,
      },
    },
    placement: {
      control: {
        type: 'inline-radio',
      },
      options: ['left', 'right'],
      description: 'Sidebar position on desktop',
      defaultValue: {
        summary: 'left',
      },
    },
    offsetTop: {
      control: 'number',
      description: 'Sidebar top offset in pixels',
      defaultValue: {
        summary: 0,
      },
    },
  },
  render: (args: SidebarStory) => <SidebarDemo {...args} />,
};

export default meta;

type Story = StoryObj<SidebarStory>;

const defaultUsageCode = `
import { useTheme } from '@emotion/react';
import { useMedia } from '@dt-dds/react-core';

import { Icon } from '@dt-dds/react-icon';
import { Typography } from '@dt-dds/react-typography';
import { Sidebar, useSidebar } from '@dt-dds/react-sidebar';

const App = () => {
  const theme = useTheme();
  const isMobile = useMedia(\`(max-width: \${theme.breakpoints.mq3}px)\`);

  const { isExpanded, toggleSidebar } = useSidebar({
    isExpanded: !isMobile,
  });

  return (
    <Sidebar isExpanded={isExpanded} onToggle={toggleSidebar}>
      <Sidebar.Header show={\`(max-width: \${theme.breakpoints.mq3}px)\`}>
        <Sidebar.Item>
          <Sidebar.Toggle />
          <Typography color='primary.default' element='h2' fontStyles='h5'>
            Daimler Truck
          </Typography>
        </Sidebar.Item>
      </Sidebar.Header>
      
      <Sidebar.Divider show={\`(max-width: \${theme.breakpoints.mq3}px)\`} />
      
      <Sidebar.Content>
        <Sidebar.Section>
          <Sidebar.Item href='/'>
            <Icon code='dashboard' />
            Dashboard
          </Sidebar.Item>
        </Sidebar.Section>

        <Sidebar.Divider />

        <Sidebar.Section title="Section Two">
          <Sidebar.Item href="/sales-and-quotes/all">
            <Icon code="finance" />
            Sales & Quotes
            <Sidebar.SubList>
              <Sidebar.Item href='/sales-and-quotes/all'>
                All Quotes
              </Sidebar.Item>
              <Sidebar.Item href='/sales-and-quotes/pending'>
                Pending Quotes
              </Sidebar.Item>
              <Sidebar.Item href='/sales-and-quotes/new'>
                New Quote
              </Sidebar.Item>
            </Sidebar.SubList>
          </Sidebar.Item>
        </Sidebar.Section>

        <Sidebar.Divider />

        <Sidebar.Section title="Section Three">
          <Sidebar.Item href="/credit-applications">
            <Icon code="credit_score" />
            Credit Applications
          </Sidebar.Item>
          <Sidebar.Item href="/contracts">
            <Icon code="contract_edit" />
            Contracts
          </Sidebar.Item>
          <Sidebar.Item href="/customers">
            <Icon code="person_pin" />
            Customers
          </Sidebar.Item>
        </Sidebar.Section>
      </Sidebar.Content>
      
      <Sidebar.Footer>
        <Sidebar.Item href='/terms-of-use'>
          <Icon code='book' />
          <Typography color='inherit' element='span' fontStyles='bodyMdBold'>
            Terms of Use
          </Typography>
        </Sidebar.Item>
        <Sidebar.Item>
          <IconButton ariaLabel='User profile' onClick={() => null}>
            <Avatar size='medium' title='Account' type='thumbnail' />
          </IconButton>
          <Typography
            color='inherit'
            element='span'
            fontStyles='bodyMdBold'
            onClick={() => null}
            onKeyDown={() => null}
            role='button'
            tabIndex={0}
          >
            Account
          </Typography>
        </Sidebar.Item>
      </Sidebar.Footer>

      <Sidebar.Divider hide={\`(max-width: \${theme.breakpoints.mq3}px)\`} />
      
      <Sidebar.Footer hide={\`(max-width: \${theme.breakpoints.mq3}px)\`}>
        <Sidebar.Item>
          <Sidebar.Toggle />
          <Typography color='inherit' element='span' fontStyles='bodyMdBold'>
            Collapse
          </Typography>
        </Sidebar.Item>
      </Sidebar.Footer>
    </Sidebar>
  );
};
`;

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      source: {
        code: defaultUsageCode,
        language: 'tsx',
      },
    },
  },
};

const customLinkCode = `
import Link from 'next/link'; // or react-router-dom, etc.

<Sidebar.Item>
  <Link href="/dashboard">
    <Icon code="dashboard" />
    Dashboard
  </Link>
</Sidebar.Item>
`;

export const WithCustomLink: Story = {
  name: 'With custom link element',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Use your own link component (Next.js, React Router, etc.) by wrapping it inside `Sidebar.Item`.',
      },
      source: {
        code: customLinkCode,
        language: 'tsx',
      },
    },
  },
  args: {},
};

const withMainHeaderCode = `
import { useTheme } from '@emotion/react';
import { useMedia } from '@dt-dds/react-core';

import { Typography } from '@dt-dds/react-typography';
import { IconButton } from '@dt-dds/react-icon-button';

import { AppHeader } from '@dt-dds/react-app-header';
import { Sidebar, useSidebar } from '@dt-dds/react-sidebar';

const App = () => {
  const theme = useTheme();
  const isMobile = useMedia(\`(max-width: \${theme.breakpoints.mq3}px)\`);

  const { isExpanded, toggleSidebar } = useSidebar({
    isExpanded: !isMobile,
  });

  // AppHeader height
  const offsetTop = isMobile ? 72 : 64;

  return (
    <AppHeader type='compact'>
      <AppHeader.Logo>
        <Typography color='primary.default' element='p' fontStyles='h5'>
          Daimler Truck
        </Typography>
      </AppHeader.Logo>
      
      <AppHeader.AppName name='My App' />
      
      <AppHeader.Actions position='right' show={\`(max-width: \${theme.breakpoints.mq3}px)\`}>
        <IconButton ariaLabel='Toggle sidebar' onClick={toggleSidebar} size='medium' variant='default'>
          <Icon code='menu_open' />
        </IconButton>
      </AppHeader.Actions>
    </AppHeader>

    <Sidebar isExpanded={isExpanded} offsetTop={offsetTop} onToggle={toggleSidebar}>
      // Sidebar content
    </Sidebar>
  );
};
`;

export const withMainHeader: Story = {
  name: 'With AppHeader',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Use with `AppHeader` compound component to create a complete web application shell.',
      },
      source: {
        code: withMainHeaderCode,
        language: 'tsx',
      },
    },
  },
  args: {
    showMainHeader: true,
  },
};
