import { ComponentType, ReactElement } from 'react';

import { useMedia } from '../hooks';

import type { ResponsiveProps } from '../types';

/**
 * Higher-order component that adds responsive show/hide behavior
 * based on CSS media queries.
 */
export const withResponsive = <P extends ResponsiveProps>(
  Component: ComponentType<Omit<P, keyof ResponsiveProps>>
): ComponentType<P> => {
  const ResponsiveComponent = (props: P): ReactElement | null => {
    const { hide, show, ...componentProps } = props;

    const hideMatches = useMedia(hide || '(max-width: 0px)');
    const showMatches = useMedia(show || '(max-width: 0px)');

    if (hide && hideMatches) return null;
    if (show && !showMatches) return null;

    return (
      <Component {...(componentProps as Omit<P, keyof ResponsiveProps>)} />
    );
  };

  ResponsiveComponent.displayName =
    Component.displayName || Component.name || 'Component';

  return ResponsiveComponent;
};
