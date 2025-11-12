import { Avatar } from '@dt-dds/react-avatar';
import { Box } from '@dt-dds/react-box';
import { useMedia } from '@dt-dds/react-core';
import { Icon } from '@dt-dds/react-icon';
import { IconButton } from '@dt-dds/react-icon-button';
import { Typography } from '@dt-dds/react-typography';
import { theme } from '@dt-dds/themes';

import { AppHeader, type AppHeaderProps, type NavPosition } from './index';

import type { Meta, StoryObj } from '@storybook/react';

interface AppHeaderStory extends AppHeaderProps {
  appName?: string;
  navPosition?: NavPosition;
  hasNavigation?: boolean;
}

// Wrapper that uses useMedia hook to detect mobile
const AppHeaderStoryWrapper = ({
  type = 'standard',
  appName,
  navPosition = 'center',
  hasNavigation = true,
  ...rest
}: AppHeaderStory) => {
  const isMobile = useMedia(`(max-width: ${theme.breakpoints.mq3}px)`);
  const isDesktop = useMedia(`(min-width: ${theme.breakpoints.mq4}px)`);

  const pages = [
    { label: 'Home', link: '/home' },
    { label: 'About', link: '/about' },
    { label: 'Contact', link: '/contact' },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '200px',
        backgroundColor: theme.palette.surface.light,
      }}
    >
      <AppHeader type={type} {...rest}>
        <AppHeader.Actions
          position='left'
          show={`(max-width: ${theme.breakpoints.mq3}px)`}
        >
          <IconButton
            ariaLabel='menu'
            dataTestId='hamburger-menu-icon'
            onClick={() => null}
            size='large'
          >
            <Icon aria-expanded={false} code='menu' />
          </IconButton>
        </AppHeader.Actions>

        <AppHeader.Logo>
          {type === 'standard' && !isMobile ? (
            <img
              alt='Daimler Truck'
              src='./images/daimler_truck.svg'
              style={{
                height: isDesktop ? '20px' : '15px',
                width: 'auto',
              }}
            />
          ) : (
            <Typography
              color='primary.default'
              element='p'
              fontStyles={`${isMobile ? 'h6' : 'h5'}`}
              id='brandName'
            >
              Daimler Truck
            </Typography>
          )}
        </AppHeader.Logo>

        {appName ? <AppHeader.AppName name={appName} /> : null}

        {hasNavigation ? (
          <AppHeader.Navigation
            position={navPosition || 'center'}
            show={`(min-width: ${theme.breakpoints.mq3}px)`}
          >
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: theme.spacing.spacing_60,
              }}
            >
              {pages.map((page) => (
                <li key={page.label}>
                  <a
                    href={page.link}
                    style={{
                      textTransform: 'capitalize',
                      color: theme.palette.content.dark,
                      transition: 'color 0.2s ease-in-out',
                    }}
                  >
                    {page.label}
                  </a>
                </li>
              ))}
            </ul>
          </AppHeader.Navigation>
        ) : null}

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
              aria-controls='userMenu'
              aria-expanded='false'
              aria-haspopup='true'
              aria-labelledby='userName'
              ariaLabel='User Menu'
              type='button'
            >
              <Avatar size='medium' title='John Doe' />
            </IconButton>
          </Box>
        </AppHeader.Actions>
      </AppHeader>
    </div>
  );
};

const meta: Meta<AppHeaderStory> = {
  title: 'Compound Components/AppHeader',
  component: AppHeader,
  parameters: {
    docs: {
      description: {
        component:
          'AppHeader is a flexible compound component that provides a complete application header with support for multiple layouts, responsive behavior, and customizable sections including logo, app name, navigation, and action buttons.',
      },
      source: {
        transform: (
          code: string,
          storyContext: {
            args?: {
              type?: 'standard' | 'compact';
              appName?: string;
              hasNavigation?: boolean;
              navPosition?: 'center' | 'left' | 'right';
            };
          }
        ) => {
          const type = storyContext.args?.type || 'standard';
          const appName = storyContext.args?.appName || 'App Name';
          const hasNavigation = storyContext.args?.hasNavigation || true;
          const navPosition = storyContext.args?.navPosition || 'center';
          const isStandard = type === 'standard';

          const appBarCode = `
import { useTheme } from '@emotion/react';
import { useMedia } from '@dt-dds/react-core';


const theme = useTheme();
const isMobile = useMedia(\`(max-width: \${theme.breakpoints.mq3}px)\`);
const isDesktop = useMedia(\`(min-width: \${theme.breakpoints.mq4}px)\`);

<AppHeader type="${type}" {...rest}>
  <AppHeader.Actions
    position='left'
    show={\`(max-width: \${theme.breakpoints.mq3}px)\`}
  >
  <IconButton
    ariaLabel='menu'
    dataTestId='hamburger-menu-icon'
    onClick={() => null}
    size='large'
  >
    <Icon aria-expanded={false} code='menu' />
  </IconButton>
</AppHeader.Actions>

<AppHeader.Logo>
  ${
    isStandard
      ? `\{!isMobile ? (
  <img 
    src={'./images/daimler_truck.svg'} 
    alt='Daimler Truck'
    style={{ 
      height: isDesktop ? '20px' : '15px', 
      width: 'auto'
    }} 
  />
  ) : (
  <Typography
    color='primary.default'
    element='p'
    fontStyles={\`$\{isMobile ? 'h6' : 'h5'}\`\}
    id='brandName'
  >
    Daimler Truck
  </Typography>
  )}`
      : `<Typography
    color='primary.default'
    element='p'
    fontStyles={\`$\{isMobile ? 'h6' : 'h5'}\`\}
    id='brandName'
  >
    Daimler Truck
  </Typography>`
  }
</AppHeader.Logo>

${appName ? `<AppHeader.AppName name="${appName}" />` : ''}

${
  hasNavigation
    ? `<AppHeader.Navigation 
  position="${navPosition}" 
  show={\`(min-width: \${theme.breakpoints.mq3}px)\`}>
  <ul style={{ 
    listStyle: 'none', 
    padding: 0, 
    margin: 0, 
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: theme.spacing.spacing_60, 
  }}>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</AppHeader.Navigation>`
    : ''
}

<AppHeader.Actions position="right">
  <IconButton
    onClick={() => null}
    ariaLabel='search'
    dataTestId='search-btn'
    size='medium'
    variant='default'
  >
    <Icon code='search' aria-expanded={false} />
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
  <Box style={{ 
    flexFlow: 'row nowrap', 
    gap: theme.spacing.spacing_30 
  }}>
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
      aria-haspopup='true'
      aria-controls='userMenu'
      aria-expanded='false'
      ariaLabel='User Menu'
    >
      <Avatar size='medium' title='John Doe' />
    </IconButton>
  </Box>
  </AppHeader.Actions>
</AppHeader>`.trim();
          return appBarCode;
        },
      },
    },
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'center',
  },
  argTypes: {
    type: {
      options: ['standard', 'compact'],
      control: { type: 'inline-radio' },
      description: 'The type of AppHeader layout',
    },
    appName: {
      control: { type: 'text' },
      description: 'AppName text content',
    },
    navPosition: {
      options: ['center', 'left', 'right'],
      control: { type: 'inline-radio' },
      description: 'Navigation position',
    },
  },
  render: (args: AppHeaderStory) => <AppHeaderStoryWrapper {...args} />,
};

export default meta;

type Story = StoryObj<AppHeaderStory>;

export const Default: Story = {
  name: 'Standard center nav',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'center',
  },
};

export const StandardWithLeftNavigation: Story = {
  name: 'Standard left nav',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    navPosition: 'left',
  },
};

export const StandardWithNoNavigation: Story = {
  name: 'Standard no nav',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    type: 'standard',
    appName: 'App Name',
    hasNavigation: false,
  },
};

export const Compact: Story = {
  name: 'Compact center nav',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'center',
  },
};

export const CompactWithLeftNavigation: Story = {
  name: 'Compact left nav',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    navPosition: 'left',
  },
};

export const Minimal: Story = {
  name: 'Compact no nav',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    type: 'compact',
    appName: 'App Name',
    hasNavigation: false,
  },
};
