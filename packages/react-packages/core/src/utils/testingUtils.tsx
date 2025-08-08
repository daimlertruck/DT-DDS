import { defaultTheme } from '@dt-dds/themes';

import { Provider } from '../components';

export const withProviders = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return ({ ...props }: P) => {
    return (
      <Provider theme={defaultTheme}>
        <Component {...(props as P)} />
      </Provider>
    );
  };
};
