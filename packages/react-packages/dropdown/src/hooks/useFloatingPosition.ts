import { RefObject, useLayoutEffect, useState } from 'react';

import { DROPDOWN_MENU_Z_INDEX } from '@dt-dds/react-core';

import { DropdownPlacement } from '../types';

type UseFloatingPositionProps<T> = {
  offsetX?: number;
  offsetY?: number;
  matchWidth?: boolean;
  minViewportPadding?: number;
  placement?: DropdownPlacement;
  menuRef?: RefObject<T>;
};

function basePos({
  placement,
  anchor,
  menuWidth,
  menuHeight,
  offsetX,
  offsetY,
}: {
  placement: DropdownPlacement;
  anchor: DOMRect;
  menuWidth: number;
  menuHeight: number;
  offsetX: number;
  offsetY: number;
}) {
  switch (placement) {
    case 'bottom':
      return { top: anchor.bottom + offsetY, left: anchor.left + offsetX };
    case 'top':
      return {
        top: anchor.top - offsetY - menuHeight,
        left: anchor.left + offsetX,
      };
    case 'right':
      return { top: anchor.top + offsetY, left: anchor.right + offsetX };
    case 'left':
      return {
        top: anchor.top + offsetY,
        left: anchor.left - offsetX - menuWidth,
      };
  }
}

export function useFloatingPosition<T extends HTMLElement = HTMLElement>(
  anchorEl: RefObject<HTMLElement | null | undefined>,
  open: boolean,
  {
    offsetX = 0,
    offsetY = 4,
    matchWidth = true,
    minViewportPadding = 8,
    placement = 'bottom',
    menuRef,
  }: UseFloatingPositionProps<T> = {}
) {
  const [style, setStyle] = useState<React.CSSProperties>({
    visibility: 'hidden',
    position: 'fixed',
  });
  const [isAnchorInViewport, setIsAnchorInViewport] = useState(true);

  useLayoutEffect(() => {
    if (!open || !anchorEl?.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStyle({
        visibility: 'hidden',
        position: 'fixed',
      });
      setIsAnchorInViewport(false);
      return;
    }

    const anchorElement = anchorEl?.current;
    const menuElement = menuRef?.current;

    const updatePosition = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const anchor = anchorElement.getBoundingClientRect();
      const menuRect = menuElement?.getBoundingClientRect();

      const isOutOfViewport =
        anchor.bottom < 0 ||
        anchor.right < 0 ||
        anchor.top >= vh ||
        anchor.left >= vw;

      if (isOutOfViewport) {
        setIsAnchorInViewport(false);
        setStyle({
          visibility: 'hidden',
          position: 'fixed',
        });
        return;
      }

      setIsAnchorInViewport(true);

      const menuWidth = matchWidth
        ? anchor.width
        : menuRect?.width ?? anchor.width;
      const menuHeight = menuRect?.height ?? 0;

      let { top, left } = basePos({
        placement,
        anchor,
        menuWidth,
        menuHeight,
        offsetX,
        offsetY,
      });

      const maxLeft = Math.max(
        minViewportPadding,
        vw - menuWidth - minViewportPadding
      );
      const maxTop = Math.max(
        minViewportPadding,
        vh - menuHeight - minViewportPadding
      );

      left = Math.max(minViewportPadding, Math.min(left, maxLeft));
      top = Math.max(minViewportPadding, Math.min(top, maxTop));

      setStyle({
        position: 'fixed',
        top,
        left,
        width: matchWidth ? anchor.width : undefined,
        maxWidth: matchWidth ? anchor.width : 300,
        boxSizing: 'border-box',
        zIndex: DROPDOWN_MENU_Z_INDEX,
      });
    };

    updatePosition();

    const ro = new ResizeObserver(updatePosition);

    ro.observe(anchorElement);

    if (menuElement) {
      ro.observe(menuElement);
    }

    // Capture allows updates on nested scroll containers, not only window.
    const scrollOpts: AddEventListenerOptions = {
      passive: true,
      capture: true,
    };
    const resizeOpts: AddEventListenerOptions = { passive: true };
    window.addEventListener('scroll', updatePosition, scrollOpts);
    window.addEventListener('resize', updatePosition, resizeOpts);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', updatePosition, scrollOpts);
      window.removeEventListener('resize', updatePosition, resizeOpts);
    };
  }, [
    menuRef,
    anchorEl,
    open,
    placement,
    offsetX,
    offsetY,
    matchWidth,
    minViewportPadding,
  ]);

  return { style, isAnchorInViewport };
}
