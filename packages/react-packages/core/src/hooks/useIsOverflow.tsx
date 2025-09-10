import { useTheme } from '@emotion/react';
import { useCallback, useRef, useState } from 'react';

import useDebounceResize from './useDebounceResize';
import useMedia from './useMedia';

export const useIsOverflow = <T extends HTMLElement>() => {
  const childrenRef = useRef<T>(null);
  const theme = useTheme();
  const isDesktop = useMedia(`(min-width: ${theme.breakpoints.mq3}px)`);
  const [overflow, setOverflow] = useState<boolean>(false);

  const truncateResize = useCallback(() => {
    if (!childrenRef.current || !isDesktop) {
      return;
    }

    const isOverflowed =
      childrenRef.current.scrollWidth > childrenRef.current.clientWidth;

    if (isOverflowed !== overflow) setOverflow(isOverflowed);
  }, [childrenRef, isDesktop, overflow]);

  useDebounceResize(truncateResize);

  return { overflow, childrenRef };
};
