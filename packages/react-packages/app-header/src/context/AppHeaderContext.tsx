import { createContext, useContext, ReactNode } from 'react';

import type { HeaderState } from '../utils';

export interface AppHeaderContextValue {
  state: HeaderState;
  shouldCenterLogo: boolean;
  hasAppNameAsSibling: boolean;
  isMobile: boolean;
}

interface AppHeaderContextProviderProps {
  value: AppHeaderContextValue;
  children: ReactNode;
}

export const AppHeaderContext = createContext<AppHeaderContextValue | null>(
  null
);

export const AppHeaderContextProvider = ({
  value,
  children,
}: AppHeaderContextProviderProps) => {
  return (
    <AppHeaderContext.Provider value={value}>
      {children}
    </AppHeaderContext.Provider>
  );
};

export const useAppHeaderContext = (): AppHeaderContextValue => {
  const context = useContext(AppHeaderContext);
  if (!context) {
    throw new Error(
      'AppHeader compound components must be used within AppHeader'
    );
  }
  return context;
};
