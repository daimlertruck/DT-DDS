import { useEffect, useRef } from 'react';

import { BaseProps } from '@dt-dds/react-core';

import {
  DrawerContentStyled,
  ScrollableSectionObserverStyled,
} from './DrawerBody.styled';

export const DrawerBody = ({ children, style, dataTestId }: BaseProps) => {
  const scrollableSectionObserverRef = useRef<HTMLDivElement>(null);

  const handleScrollClass = (isSectionScrollable: boolean) => {
    const sectionElement = scrollableSectionObserverRef.current?.parentElement;
    if (sectionElement) {
      isSectionScrollable
        ? sectionElement.classList.add('hasScroll')
        : sectionElement.classList.remove('hasScroll');
    }
  };

  useEffect(() => {
    if (scrollableSectionObserverRef.current) {
      const observer = new IntersectionObserver(
        ([{ isIntersecting: isSectionObserverVisible }]) =>
          handleScrollClass(!isSectionObserverVisible)
      );

      observer.observe(scrollableSectionObserverRef.current);

      return () => observer.disconnect();
    }
  }, [scrollableSectionObserverRef]);

  return (
    <DrawerContentStyled
      data-testid={dataTestId ?? 'drawer-body'}
      style={style}
    >
      {children}
      <ScrollableSectionObserverStyled ref={scrollableSectionObserverRef} />
    </DrawerContentStyled>
  );
};
