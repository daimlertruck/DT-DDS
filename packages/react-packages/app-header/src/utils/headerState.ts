import type { NavPosition } from '../components/Navigation';

export type HeaderType = 'standard' | 'compact';

export interface HeaderState {
  isStandard: boolean;
  isCompact: boolean;
  isNavCenter: boolean;
  isNavLeft: boolean;
  isNavRight: boolean;
  isNavCompact: boolean;
  hasAppName: boolean;
  isActionsPositionRight: boolean;
}

export const computeHeaderState = (
  type: HeaderType,
  navPosition: NavPosition,
  appName: string | undefined,
  hasActionsPositionRight: boolean
): HeaderState => ({
  isStandard: type === 'standard',
  isCompact: type === 'compact',
  isNavCenter: navPosition === 'center',
  isNavLeft: navPosition === 'left',
  isNavRight: navPosition === 'right',
  isNavCompact: type === 'compact' || !appName,
  hasAppName: !!appName,
  isActionsPositionRight: hasActionsPositionRight,
});

export const shouldCenterLogo = (
  type: HeaderType,
  appName: string | undefined
): boolean => {
  return type === 'standard' && !!appName;
};
