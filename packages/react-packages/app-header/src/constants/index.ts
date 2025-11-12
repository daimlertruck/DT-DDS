import { theme } from '@dt-dds/themes';

export const HEADER_HEIGHT = 64;
export const NAVIGATION_HEIGHT = 52;
export const APP_HEADER_Z_INDEX = 1;
export const THIRD_WIDTH = 'calc(100% / 3)';
export const LOGO_MAX_HEIGHT = '54px';
export const SIBLING_GROUP_GAP = theme.spacing.spacing_30;
export const SIBLING_GROUP_GAP_MOBILE = theme.spacing.spacing_20;

export const COMPOUND_COMPONENT_NAMES = {
  NAVIGATION: 'AppHeader.Navigation',
  APP_NAME: 'AppHeader.AppName',
  LOGO: 'AppHeader.Logo',
  ACTIONS: 'AppHeader.Actions',
} as const;
