import { createContext, useContext, ReactNode } from 'react';

export interface SidebarContextValue {
  isExpanded: boolean;
  isMobile: boolean;
  onToggle?: () => void;
}

interface SidebarContextProviderProps {
  value: SidebarContextValue;
  children: ReactNode;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export const SidebarContextProvider = ({
  value,
  children,
}: SidebarContextProviderProps) => {
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebarContext = (): SidebarContextValue => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar compound components must be used within Sidebar');
  }
  return context;
};
