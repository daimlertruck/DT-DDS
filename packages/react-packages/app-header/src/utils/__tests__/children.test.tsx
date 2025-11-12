import React from 'react';

import {
  extractProp,
  findChildByType,
  findChildByTypeAndProp,
  findChildIndexByTypeAndProp,
  findChildIndices,
  getDisplayName,
} from '../children';

describe('children utils', () => {
  const MockActions = ({
    children,
    position, // eslint-disable-line @typescript-eslint/no-unused-vars
  }: {
    children: React.ReactNode;
    position?: string;
  }) => <div>{children}</div>;
  MockActions.displayName = 'AppHeader.Actions';

  const MockLogo = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  MockLogo.displayName = 'AppHeader.Logo';

  const MockAppName = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  MockAppName.displayName = 'AppHeader.AppName';

  const MockNavigation = ({
    children,
    position, // eslint-disable-line @typescript-eslint/no-unused-vars
  }: {
    children: React.ReactNode;
    position?: string;
  }) => <nav>{children}</nav>;
  MockNavigation.displayName = 'AppHeader.Navigation';

  it('derives component display name', () => {
    const element = <MockAppName>App</MockAppName>;
    expect(getDisplayName(element as React.ReactElement)).toBe(
      'AppHeader.AppName'
    );
  });

  it('finds child by display name including nested structures', () => {
    const target = (
      <>
        <MockNavigation>
          <MockActions>Action</MockActions>
        </MockNavigation>
        <div>
          <MockAppName>Nested</MockAppName>
        </div>
      </>
    ).props.children as React.ReactNode;

    const found = findChildByType(target, 'AppHeader.AppName');
    expect(found?.type).not.toBeUndefined();
    expect(getDisplayName(found as React.ReactElement)).toBe(
      'AppHeader.AppName'
    );
  });

  it('returns null when child type is not found', () => {
    const nodes = (
      <>
        <MockActions>Action</MockActions>
        <MockLogo>Logo</MockLogo>
      </>
    ).props.children as React.ReactNode;

    expect(findChildByType(nodes, 'NonExistent')).toBeNull();
  });

  it('finds child by type and prop value', () => {
    const children = (
      <>
        <MockNavigation position='left'>Nav Left</MockNavigation>
        <MockNavigation position='right'>Nav Right</MockNavigation>
        <MockActions>Action</MockActions>
      </>
    ).props.children as React.ReactNode;

    const found = findChildByTypeAndProp(
      children,
      'AppHeader.Navigation',
      'position',
      'right'
    );

    expect(found).not.toBeNull();
    expect(getDisplayName(found as React.ReactElement)).toBe(
      'AppHeader.Navigation'
    );
    expect((found as React.ReactElement).props.position).toBe('right');
  });

  it('returns null when child with matching type and prop is not found', () => {
    const children = (
      <>
        <MockNavigation position='left'>Nav</MockNavigation>
        <MockActions>Action</MockActions>
      </>
    ).props.children as React.ReactNode;

    expect(
      findChildByTypeAndProp(
        children,
        'AppHeader.Navigation',
        'position',
        'right'
      )
    ).toBeNull();
  });

  it('finds child index by type and prop value', () => {
    const children = (
      <>
        <MockNavigation position='left'>Nav Left</MockNavigation>
        <MockNavigation position='right'>Nav Right</MockNavigation>
        <MockActions position='right'>Action</MockActions>
      </>
    ).props.children as React.ReactNode;

    const index = findChildIndexByTypeAndProp(
      children,
      'AppHeader.Actions',
      'position',
      'right'
    );

    expect(index).toBe(2);
  });

  it('returns -1 when child index with matching type and prop is not found', () => {
    const children = (
      <>
        <MockNavigation position='left'>Nav</MockNavigation>
        <MockActions position='left'>Action</MockActions>
      </>
    ).props.children as React.ReactNode;

    expect(
      findChildIndexByTypeAndProp(
        children,
        'AppHeader.Actions',
        'position',
        'right'
      )
    ).toBe(-1);
  });

  it('extracts prop when element is valid and falls back to default otherwise', () => {
    const element = <MockNavigation position='left'>Nav</MockNavigation>;
    const defaultValue = 'center';

    expect(extractProp(element, 'position', defaultValue)).toBe('left');
    expect(extractProp(null, 'position', defaultValue)).toBe('center');
  });

  it('finds indices for provided target names', () => {
    const tree = (
      <>
        <MockActions>Action</MockActions>
        <MockAppName>App</MockAppName>
        <MockLogo>Logo</MockLogo>
      </>
    ).props.children as React.ReactNode;

    const indices = findChildIndices(tree, [
      'AppHeader.AppName',
      'AppHeader.Logo',
      'AppHeader.Actions',
    ]);

    expect(indices).toEqual({
      'AppHeader.Actions': 0,
      'AppHeader.AppName': 1,
      'AppHeader.Logo': 2,
    });
  });
});
