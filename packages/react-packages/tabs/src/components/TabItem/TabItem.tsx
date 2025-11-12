import { ReactNode, useRef } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import { TabItemStyled } from './TabItem.styled';
import { Variant } from '../../types';

export interface TabItemProps extends BaseProps {
  activeTab?: number;
  variant?: Variant;
  index?: number;
  isDisabled?: boolean;
  label: string;
  icon?: ReactNode;
  handleChange?: (value: number) => void;
}

export const TabItem = ({
  activeTab,
  dataTestId,
  isDisabled,
  index,
  variant,
  label,
  icon,
  handleChange,
}: TabItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const handleOnClick = () => {
    if (!ref || !ref.current || !ref.current.parentElement) return;

    const elementClientRect = ref.current.getBoundingClientRect();
    const parentClientRect = ref.current.parentElement.getBoundingClientRect();

    if (elementClientRect.left < parentClientRect.left) {
      ref.current.parentElement.scroll({
        left:
          ref.current.parentElement.scrollLeft -
          (parentClientRect.left - elementClientRect.left),
        behavior: 'smooth',
      });
    }

    if (parentClientRect.right < elementClientRect.right) {
      ref.current.parentElement.scroll({
        left:
          ref.current.parentElement.scrollLeft +
          (elementClientRect.right - parentClientRect.right),
        behavior: 'smooth',
      });
    }

    handleChange!(index!);
  };

  return (
    <TabItemStyled
      active={activeTab === index}
      data-testid={dataTestId ? dataTestId : `tab-item-${index}`}
      disabled={isDisabled}
      onClick={handleOnClick}
      ref={ref}
      role='tab'
      tabIndex={activeTab === index ? 0 : -1}
      variant={variant!}
    >
      {icon}
      {label}
    </TabItemStyled>
  );
};
