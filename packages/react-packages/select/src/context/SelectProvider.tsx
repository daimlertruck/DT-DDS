import { UseSelectReturnValue } from 'downshift';
import { createContext, useContext, ReactNode } from 'react';

import { SelectOptionValue } from '../types';

type SelectContextType = {
  highlightedIndex: number | null;
  getItemProps: UseSelectReturnValue<SelectOptionValue>['getItemProps'];
  selectedItems: SelectOptionValue[];
  isMulti: boolean;
};

interface SelectContextState {
  getItemProps: UseSelectReturnValue<SelectOptionValue>['getItemProps'];
  isItemSelected: (item: string) => boolean;
  isMulti: boolean;
  isItemHighlighted: (index: number) => boolean;
}

const SelectContext = createContext<SelectContextState | undefined>(undefined);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
};

type SelectProviderProps = {
  children: ReactNode;
  value: SelectContextType;
};

export const SelectProvider = ({ children, value }: SelectProviderProps) => {
  const { highlightedIndex, selectedItems, ...rest } = value;
  const isItemHighlighted = (index: number) => index === highlightedIndex;

  const isItemSelected = (item: string) => {
    return !!selectedItems.find((selectedItem) => selectedItem.value === item);
  };

  return (
    <SelectContext.Provider
      value={{
        isItemHighlighted,
        isItemSelected,
        ...rest,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};
