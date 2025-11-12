import { ComponentType, ReactElement } from 'react';

import { useMedia } from '@dt-dds/react-core';

export interface ResponsiveProps {
  hide?: string;
  show?: string;
}

/**
 * Higher-order component that adds responsive functionality to any component.
 *
 * @example
 * ```tsx
 * // Hide on desktop
 * <AppHeader.Navigation hide="(min-width: 768px)">
 *
 * // Show only on mobile (equivalent to hide="(min-width: 768px)")
 * <AppHeader.Navigation show="(max-width: 767px)">
 *
 * const Navigation = withResponsive(({ children, ...props }: NavigationProps) => {
 *   const { state } = useAppHeaderContext();
 *   return <NavigationStyled state={state}>{children}</NavigationStyled>;
 * });
 * ```
 */
export const withResponsive = <P extends ResponsiveProps>(
  Component: ComponentType<Omit<P, keyof ResponsiveProps>>
): ComponentType<P> => {
  const ResponsiveComponent = (props: P): ReactElement | null => {
    const hideMatches = useMedia(props.hide || '(max-width: 0px)');
    const showMatches = useMedia(props.show || '(max-width: 0px)');

    // Hide prop takes precedence if both are provided
    if (props.hide && hideMatches) return null;
    if (props.show && !showMatches) return null;

    // Strip responsive props before passing to component
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hide, show, ...componentProps } = props;

    return (
      <Component {...(componentProps as Omit<P, keyof ResponsiveProps>)} />
    );
  };

  ResponsiveComponent.displayName =
    Component.displayName || Component.name || 'Component';

  return ResponsiveComponent;
};
