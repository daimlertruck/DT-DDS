import React from 'react';

import { theme } from '@dt-dds/themes';

import { COMPOUND_COMPONENT_NAMES } from '../../constants';
import {
  areSiblings,
  groupNavigationAndActionsIfSiblings,
  groupSiblingComponents,
  shouldGroupNavigationAndActions,
} from '../composition';

import type { HeaderState } from '../headerState';
import type { Theme } from '@dt-dds/themes';

const createState = (overrides?: Partial<HeaderState>): HeaderState => ({
  isStandard: true,
  isCompact: false,
  isNavCenter: true,
  isNavLeft: false,
  isNavRight: false,
  isNavCompact: false,
  hasAppName: true,
  isActionsPositionRight: true,
  ...overrides,
});

describe('composition utils', () => {
  const MockActions = ({
    children,
    position,
  }: {
    children: React.ReactNode;
    position?: 'left' | 'right';
  }) => <div data-position={position}>{children}</div>;
  MockActions.displayName = COMPOUND_COMPONENT_NAMES.ACTIONS;

  const MockAppName = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  MockAppName.displayName = COMPOUND_COMPONENT_NAMES.APP_NAME;

  const MockLogo = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  MockLogo.displayName = COMPOUND_COMPONENT_NAMES.LOGO;

  const MockNavigation = ({
    children,
    position,
  }: {
    children: React.ReactNode;
    position?: 'left' | 'center' | 'right';
  }) => <nav data-position={position}>{children}</nav>;
  MockNavigation.displayName = COMPOUND_COMPONENT_NAMES.NAVIGATION;

  it('determines sibling indices correctly', () => {
    expect(areSiblings(1, 2)).toBe(true);
    expect(areSiblings(1, 3)).toBe(false);
  });

  it('groups adjacent sibling components', () => {
    const children = (
      <>
        <MockAppName>App</MockAppName>
        <MockLogo>Logo</MockLogo>
      </>
    ).props.children as React.ReactNode;

    const grouped = groupSiblingComponents(
      children,
      [COMPOUND_COMPONENT_NAMES.APP_NAME, COMPOUND_COMPONENT_NAMES.LOGO],
      false
    );

    expect(grouped).toHaveLength(1);
    const groupElement = grouped[0] as React.ReactElement;
    expect(groupElement.props.style.gap).toBeDefined();
  });

  it('skips grouping when siblings are not consecutive', () => {
    const children = (
      <>
        <MockAppName>App</MockAppName>
        <MockActions>Action</MockActions>
        <MockLogo>Logo</MockLogo>
      </>
    ).props.children as React.ReactNode;

    const grouped = groupSiblingComponents(
      children,
      [COMPOUND_COMPONENT_NAMES.APP_NAME, COMPOUND_COMPONENT_NAMES.LOGO],
      true
    );

    expect(grouped).toHaveLength(3);
  });

  it('knows when navigation and actions should be grouped', () => {
    expect(
      shouldGroupNavigationAndActions(
        createState({ isNavRight: true, isCompact: true })
      )
    ).toBe(true);
    expect(
      shouldGroupNavigationAndActions(
        createState({ isNavRight: true, isStandard: true, hasAppName: false })
      )
    ).toBe(true);
    expect(
      shouldGroupNavigationAndActions(
        createState({ isNavRight: false, isCompact: true })
      )
    ).toBe(false);
  });

  it('groups navigation and actions when they are siblings and right-aligned', () => {
    const childrenElement = (
      <>
        <MockNavigation position='right'>Nav</MockNavigation>
        <MockActions position='right'>Actions</MockActions>
      </>
    );
    const children = childrenElement.props.children as React.ReactNode;

    const result = groupNavigationAndActionsIfSiblings(
      children,
      false,
      theme as Theme
    );

    expect(Array.isArray(result)).toBe(true);
    const grouped = result as React.ReactElement[];
    expect(grouped[0].props.style.position).toBe('fixed');
  });

  it('returns original children when navigation and actions are not siblings', () => {
    const childrenElement = (
      <>
        <MockActions position='right'>Actions</MockActions>
        <div>Separator</div>
        <MockNavigation position='right'>Nav</MockNavigation>
      </>
    );
    const children = childrenElement.props.children as React.ReactNode;

    const result = groupNavigationAndActionsIfSiblings(
      children,
      false,
      theme as Theme
    );

    expect(result).toBe(children);
  });
});
