import { render, screen } from '@testing-library/react';

import { withProviders, useMedia } from '@dt-dds/react-core';

import { AppHeader } from './index';

import type { ResponsiveProps } from './utils/responsive';

jest.mock('@dt-dds/react-core', () => {
  const actual = jest.requireActual('@dt-dds/react-core');
  const mockUseMedia = jest.fn();

  const mockWithResponsive = (
    Component: React.ComponentType<ResponsiveProps>
  ) => {
    const ResponsiveComponent = (props: ResponsiveProps) => {
      if (props.hide) {
        const matches = mockUseMedia(props.hide);
        if (matches) return null;
      }
      if (props.show) {
        const matches = mockUseMedia(props.show);
        if (!matches) return null;
      }
      return <Component {...props} />;
    };
    ResponsiveComponent.displayName =
      Component.displayName || Component.name || 'Component';
    return ResponsiveComponent;
  };

  return {
    ...actual,
    useMedia: mockUseMedia,
    withResponsive: mockWithResponsive,
  };
});

describe('<AppHeader /> component', () => {
  const ProvidedAppHeader = withProviders(AppHeader);
  const mockUseMedia = useMedia as jest.Mock;

  beforeEach(() => {
    mockUseMedia.mockReset();
    mockUseMedia.mockReturnValue(false);
  });

  describe('Basic rendering', () => {
    it('renders AppHeader with compact type', () => {
      const { container } = render(
        <ProvidedAppHeader type='compact'>
          <AppHeader.Logo>
            <img alt='Logo' src='/test-logo.svg' />
          </AppHeader.Logo>
        </ProvidedAppHeader>
      );

      expect(container).toMatchSnapshot();
    });

    it('passes through HTML attributes to AppHeader', () => {
      const { container } = render(
        <ProvidedAppHeader
          className='custom-class'
          data-testid='app-header'
          id='custom-id'
          type='standard'
        >
          <AppHeader.Logo>
            <img alt='Logo' src='/test-logo.svg' />
          </AppHeader.Logo>
        </ProvidedAppHeader>
      );

      const header = container.querySelector('header');
      expect(header).toHaveAttribute('data-testid', 'app-header');
      expect(header).toHaveAttribute(
        'class',
        expect.stringContaining('custom-class')
      );
      expect(header).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('Compound components rendering', () => {
    it('renders AppName with name prop', () => {
      render(
        <ProvidedAppHeader>
          <AppHeader.AppName name='Test Application' />
        </ProvidedAppHeader>
      );

      expect(screen.getByText('Test Application')).toBeInTheDocument();
    });

    it('renders AppName with children prop', () => {
      render(
        <ProvidedAppHeader>
          <AppHeader.AppName>
            <span>Custom App Name</span>
          </AppHeader.AppName>
        </ProvidedAppHeader>
      );

      expect(screen.getByText('Custom App Name')).toBeInTheDocument();
    });

    it('renders Navigation with children', () => {
      render(
        <ProvidedAppHeader>
          <AppHeader.Navigation>
            <ul>
              <li>
                <a href='/home'>Home</a>
              </li>
            </ul>
          </AppHeader.Navigation>
        </ProvidedAppHeader>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renders Logo and Actions with children', () => {
      render(
        <ProvidedAppHeader>
          <AppHeader.Logo>
            <img alt='Logo' src='/test-logo.svg' />
          </AppHeader.Logo>
          <AppHeader.Actions>
            <button type='button'>User Menu</button>
          </AppHeader.Actions>
        </ProvidedAppHeader>
      );

      expect(screen.getByAltText('Logo')).toBeInTheDocument();
      expect(screen.getByText('User Menu')).toBeInTheDocument();
    });
  });

  describe('Props pass-through', () => {
    it('passes through HTML attributes to Logo', () => {
      const { container } = render(
        <ProvidedAppHeader>
          <AppHeader.Logo className='logo-class' data-testid='logo'>
            <img alt='Logo' src='/test-logo.svg' />
          </AppHeader.Logo>
        </ProvidedAppHeader>
      );

      const logoElement = container.querySelector('[data-testid="logo"]');
      expect(logoElement).toBeInTheDocument();
      expect(logoElement).toHaveClass('logo-class');
    });

    it('passes through HTML attributes to AppName', () => {
      const { container } = render(
        <ProvidedAppHeader>
          <AppHeader.AppName
            className='app-name-class'
            data-testid='app-name'
            name='Test App'
          />
        </ProvidedAppHeader>
      );

      const appNameElement = container.querySelector(
        '[data-testid="app-name"]'
      );
      expect(appNameElement).toBeInTheDocument();
      expect(appNameElement).toHaveClass('app-name-class');
    });

    it('passes through HTML attributes to Navigation', () => {
      const { container } = render(
        <ProvidedAppHeader>
          <AppHeader.Navigation className='nav-class' data-testid='nav'>
            <ul>
              <li>
                <a href='/home'>Home</a>
              </li>
            </ul>
          </AppHeader.Navigation>
        </ProvidedAppHeader>
      );

      const navElement = container.querySelector('[data-testid="nav"]');
      expect(navElement).toBeInTheDocument();
      expect(navElement).toHaveClass('nav-class');
      expect(navElement?.tagName).toBe('NAV');
    });

    it('passes through HTML attributes to Actions', () => {
      const { container } = render(
        <ProvidedAppHeader>
          <AppHeader.Actions className='actions-class' data-testid='actions'>
            <button type='button'>Actions</button>
          </AppHeader.Actions>
        </ProvidedAppHeader>
      );

      const actionsElement = container.querySelector('[data-testid="actions"]');
      expect(actionsElement).toBeInTheDocument();
      expect(actionsElement).toHaveClass('actions-class');
    });
  });

  describe('Component grouping', () => {
    it('groups AppName and Logo when siblings', () => {
      render(
        <ProvidedAppHeader type='compact'>
          <AppHeader.AppName
            data-testid='app-name-group-desktop'
            name='Desktop App'
          />
          <AppHeader.Logo data-testid='logo-group-desktop'>
            <img alt='Desktop Logo' src='/desktop-logo.svg' />
          </AppHeader.Logo>
          <AppHeader.Navigation position='center'>
            <ul>
              <li>
                <a href='/home'>Home</a>
              </li>
            </ul>
          </AppHeader.Navigation>
        </ProvidedAppHeader>
      );

      const appName = screen.getByTestId('app-name-group-desktop');
      const logo = screen.getByTestId('logo-group-desktop');

      expect(appName.parentElement).toBe(logo.parentElement);
    });

    it('leaves AppName and Logo separate when not adjacent', () => {
      const { container } = render(
        <ProvidedAppHeader type='compact'>
          <AppHeader.AppName
            data-testid='app-name-separated'
            name='Separated'
          />
          <AppHeader.Actions>
            <button type='button'>Action</button>
          </AppHeader.Actions>
          <AppHeader.Logo data-testid='logo-separated'>
            <img alt='Separated Logo' src='/separated-logo.svg' />
          </AppHeader.Logo>
        </ProvidedAppHeader>
      );

      const header = container.querySelector('header');
      const appName = screen.getByTestId('app-name-separated');
      const logo = screen.getByTestId('logo-separated');

      expect(appName.parentElement).toBe(header);
      expect(logo.parentElement).toBe(header);
    });
  });

  describe('Navigation right position', () => {
    it('renders Navigation with position="right"', () => {
      render(
        <ProvidedAppHeader>
          <AppHeader.Navigation data-testid='nav-right' position='right'>
            <ul>
              <li>
                <a href='/home'>Home</a>
              </li>
            </ul>
          </AppHeader.Navigation>
        </ProvidedAppHeader>
      );

      expect(screen.getByTestId('nav-right')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('groups Navigation and Actions when both are right and siblings in compact mode', () => {
      mockUseMedia.mockReturnValue(false);

      const { container } = render(
        <ProvidedAppHeader type='compact'>
          <AppHeader.Navigation data-testid='nav-right-group' position='right'>
            <ul>
              <li>
                <a href='/home'>Home</a>
              </li>
            </ul>
          </AppHeader.Navigation>
          <AppHeader.Actions data-testid='actions-right-group' position='right'>
            <button type='button'>Action</button>
          </AppHeader.Actions>
        </ProvidedAppHeader>
      );

      const header = container.querySelector('header');
      const navigation = screen.getByTestId('nav-right-group');
      const actions = screen.getByTestId('actions-right-group');

      expect(navigation.parentElement).toBe(actions.parentElement);
      expect(navigation.parentElement).not.toBe(header);
    });

    it('does not group Navigation and Actions when Actions position is left', () => {
      mockUseMedia.mockReturnValue(false);

      const { container } = render(
        <ProvidedAppHeader type='compact'>
          <AppHeader.Navigation
            data-testid='nav-right-separate'
            position='right'
          >
            <ul>
              <li>
                <a href='/home'>Home</a>
              </li>
            </ul>
          </AppHeader.Navigation>
          <AppHeader.Actions
            data-testid='actions-left-separate'
            position='left'
          >
            <button type='button'>Action</button>
          </AppHeader.Actions>
        </ProvidedAppHeader>
      );

      const header = container.querySelector('header');
      const navigation = screen.getByTestId('nav-right-separate');
      const actions = screen.getByTestId('actions-left-separate');

      expect(navigation.parentElement).toBe(header);
      expect(actions.parentElement).toBe(header);
    });

    it('does not group Navigation and Actions when they are not siblings', () => {
      mockUseMedia.mockReturnValue(false);

      const { container } = render(
        <ProvidedAppHeader type='compact'>
          <AppHeader.Navigation
            data-testid='nav-right-not-sibling'
            position='right'
          >
            <ul>
              <li>
                <a href='/home'>Home</a>
              </li>
            </ul>
          </AppHeader.Navigation>
          <AppHeader.Logo>
            <img alt='Logo' src='/logo.svg' />
          </AppHeader.Logo>
          <AppHeader.Actions
            data-testid='actions-right-not-sibling'
            position='right'
          >
            <button type='button'>Action</button>
          </AppHeader.Actions>
        </ProvidedAppHeader>
      );

      const header = container.querySelector('header');
      const navigation = screen.getByTestId('nav-right-not-sibling');
      const actions = screen.getByTestId('actions-right-not-sibling');

      expect(navigation.parentElement).toBe(header);
      expect(actions.parentElement).toBe(header);
    });

    it('does not group Navigation and Actions in standard mode with AppName', () => {
      mockUseMedia.mockReturnValue(false);

      const { container } = render(
        <ProvidedAppHeader type='standard'>
          <AppHeader.AppName name='Test App' />
          <AppHeader.Navigation
            data-testid='nav-right-standard'
            position='right'
          >
            <ul>
              <li>
                <a href='/home'>Home</a>
              </li>
            </ul>
          </AppHeader.Navigation>
          <AppHeader.Actions
            data-testid='actions-right-standard'
            position='right'
          >
            <button type='button'>Action</button>
          </AppHeader.Actions>
        </ProvidedAppHeader>
      );

      const header = container.querySelector('header');
      const navigation = screen.getByTestId('nav-right-standard');
      const actions = screen.getByTestId('actions-right-standard');

      expect(navigation.parentElement).toBe(header);
      expect(actions.parentElement).toBe(header);
    });
  });

  describe('Responsive behavior', () => {
    it('hides component when hide prop matches media query', () => {
      mockUseMedia.mockReturnValue(true);

      render(
        <ProvidedAppHeader>
          <AppHeader.Actions hide='(min-width: 768px)' position='left'>
            <button type='button'>Menu</button>
          </AppHeader.Actions>
        </ProvidedAppHeader>
      );

      expect(screen.queryByText('Menu')).not.toBeInTheDocument();
    });

    it('shows component when show prop matches media query', () => {
      mockUseMedia.mockReturnValue(true);

      render(
        <ProvidedAppHeader>
          <AppHeader.Actions position='left' show='(max-width: 767px)'>
            <button type='button'>Menu</button>
          </AppHeader.Actions>
        </ProvidedAppHeader>
      );

      expect(screen.getByText('Menu')).toBeInTheDocument();
    });

    it('hides component when show prop does not match media query', () => {
      mockUseMedia.mockReturnValue(false);

      render(
        <ProvidedAppHeader>
          <AppHeader.Actions position='left' show='(max-width: 767px)'>
            <button type='button'>Menu</button>
          </AppHeader.Actions>
        </ProvidedAppHeader>
      );

      expect(screen.queryByText('Menu')).not.toBeInTheDocument();
    });
  });

  describe('Context validation', () => {
    it('throws error when compound component used outside AppHeader', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(
          <div>
            <AppHeader.Logo>
              <img alt='Test' src='/test.svg' />
            </AppHeader.Logo>
          </div>
        );
      }).toThrow('AppHeader compound components must be used within AppHeader');

      consoleSpy.mockRestore();
    });
  });
});
