import {
  Children,
  isValidElement,
  RefObject,
  cloneElement,
  useCallback,
  useRef,
  useState,
  ReactNode,
} from 'react';

import { useTheme } from '@emotion/react';

import { useDebounceResize, useMedia } from '@dt-dds/react-core';

import { MoreHorizontalIcon } from '../../../../dt-dds-react/core';
import { Breadcrumb } from '../Breadcrumb';

const isBreadcrumbRefValid = (
  breadcrumbRef: RefObject<HTMLElement | null>,
  breadcrumbListRef: RefObject<HTMLElement | null>
) => {
  return !!breadcrumbRef.current && !!breadcrumbListRef.current;
};

export const useCollapsedBreadcrumb = (children: ReactNode) => {
  const breadcrumbRef = useRef<HTMLElement>(null);
  const breadcrumbListRef = useRef<HTMLUListElement>(null);
  const theme = useTheme();
  const isDesktop = useMedia(`(min-width: ${theme.breakpoints.mq3}px)`);
  const [visibleChildren, setVisibleChildren] = useState<ReactNode>(children);

  const breadcrumbResize = useCallback(() => {
    if (isDesktop || !isBreadcrumbRefValid(breadcrumbRef, breadcrumbListRef)) {
      setVisibleChildren(children);
      return;
    }

    const childrenArray = Children.toArray(children);
    const isBreadcrumbsTooLarge =
      breadcrumbListRef.current!.scrollWidth >
      breadcrumbRef.current!.clientWidth;

    if (isBreadcrumbsTooLarge) {
      const lastChild = childrenArray[childrenArray.length - 1];
      const modifiedChildren = [
        childrenArray[0],
        <Breadcrumb.Item key='more-icon'>
          <MoreHorizontalIcon />
        </Breadcrumb.Item>,
        isValidElement(lastChild)
          ? cloneElement(lastChild, {
              ...lastChild.props,
              style: { overflow: 'hidden' },
            })
          : lastChild,
      ];

      setVisibleChildren(modifiedChildren);
    }
  }, [children, isDesktop, breadcrumbRef, breadcrumbListRef]);

  useDebounceResize(breadcrumbResize);

  return { visibleChildren, breadcrumbRef, breadcrumbListRef };
};
