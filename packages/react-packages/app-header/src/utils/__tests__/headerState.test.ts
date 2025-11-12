import { computeHeaderState, shouldCenterLogo } from '../headerState';

describe('headerState utils', () => {
  it('computes header state for standard layout with app name', () => {
    const state = computeHeaderState('standard', 'center', 'App', true);
    expect(state).toMatchObject({
      isStandard: true,
      isCompact: false,
      isNavCenter: true,
      isNavLeft: false,
      isNavRight: false,
      isNavCompact: false,
      hasAppName: true,
      isActionsPositionRight: true,
    });
  });

  it('computes header state for compact layout without app name', () => {
    const state = computeHeaderState('compact', 'left', undefined, true);
    expect(state).toMatchObject({
      isStandard: false,
      isCompact: true,
      isNavCenter: false,
      isNavLeft: true,
      isNavRight: false,
      isNavCompact: true,
      hasAppName: false,
      isActionsPositionRight: true,
    });
  });

  it('computes header state for right navigation position', () => {
    const state = computeHeaderState('compact', 'right', undefined, true);
    expect(state).toMatchObject({
      isStandard: false,
      isCompact: true,
      isNavCenter: false,
      isNavLeft: false,
      isNavRight: true,
      isNavCompact: true,
      hasAppName: false,
      isActionsPositionRight: true,
    });
  });

  it('determines when logo should be centered', () => {
    expect(shouldCenterLogo('standard', 'App')).toBe(true);
    expect(shouldCenterLogo('compact', 'App')).toBe(false);
    expect(shouldCenterLogo('standard', undefined)).toBe(false);
  });
});
