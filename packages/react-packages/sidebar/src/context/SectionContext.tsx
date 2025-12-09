import { createContext, useContext } from 'react';

import type { SectionVariant } from '../types';

export interface SectionContextValue {
  variant: SectionVariant;
}

export const SectionContext = createContext<SectionContextValue | null>(null);

export const useSectionContext = (): SectionVariant => {
  const context = useContext(SectionContext);
  return context?.variant ?? 'default';
};
