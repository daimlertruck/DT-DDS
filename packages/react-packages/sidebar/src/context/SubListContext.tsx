import { createContext, useContext } from 'react';

export interface SubListContextValue {
  isNested: boolean;
}

export const SubListContext = createContext<SubListContextValue | null>(null);

export const useSubListContext = (): boolean => {
  const context = useContext(SubListContext);
  return context?.isNested ?? false;
};
