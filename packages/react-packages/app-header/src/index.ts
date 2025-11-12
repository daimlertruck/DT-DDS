import React from 'react';

import { AppHeader as AppHeaderComponent } from './AppHeader';
import { Actions } from './components/Actions';
import { AppName } from './components/AppName';
import { Logo } from './components/Logo';
import { Navigation } from './components/Navigation';

import type { AppHeaderProps } from './AppHeader';
import type { ActionsProps } from './components/Actions';
import type { AppNameProps } from './components/AppName';
import type { LogoProps } from './components/Logo';
import type { NavigationProps } from './components/Navigation';

type AppHeaderComponentType = React.FC<AppHeaderProps> & {
  Logo: React.ComponentType<LogoProps>;
  AppName: React.ComponentType<AppNameProps>;
  Navigation: React.ComponentType<NavigationProps>;
  Actions: React.ComponentType<ActionsProps>;
};

export const AppHeader: AppHeaderComponentType = Object.assign(
  AppHeaderComponent,
  {
    Logo,
    AppName,
    Navigation,
    Actions,
  }
);

export type { HeaderType, HeaderState } from './utils';
export type { NavPosition } from './components/Navigation';
export type { AppHeaderProps } from './AppHeader';
export * from './components';
