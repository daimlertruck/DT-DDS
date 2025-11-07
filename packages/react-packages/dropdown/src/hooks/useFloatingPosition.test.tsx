import { DROPDOWN_MENU_Z_INDEX } from '@dt-dds/react-core';
import { render, screen } from '@testing-library/react';
import { useRef } from 'react';

import '@testing-library/jest-dom';
import { useFloatingPosition } from './useFloatingPosition';

type RectInit = { left: number; top: number; width: number; height: number };

const makeRect = ({ left, top, width, height }: RectInit): DOMRect =>
  ({
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    toJSON: () => ({}),
  } as DOMRect);

function spyRect(el: HTMLElement, rect: DOMRect) {
  return jest.spyOn(el, 'getBoundingClientRect').mockImplementation(() => rect);
}

type MenuProps = {
  open?: boolean;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  matchWidth?: boolean;
  offsetX?: number;
  offsetY?: number;
  minViewportPadding?: number;
  anchorRect: DOMRect;
  menuRect?: DOMRect;
};

const menuTestId = 'menu';

const Menu = ({
  open = true,
  placement = 'bottom',
  matchWidth = true,
  offsetX,
  offsetY,
  minViewportPadding,
  anchorRect,
  menuRect,
}: MenuProps) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { style } = useFloatingPosition(anchorRef, open, {
    placement,
    matchWidth,
    offsetX,
    offsetY,
    minViewportPadding,
    menuRef,
  });

  return (
    <div>
      <div
        data-testid='anchor'
        ref={(n) => {
          anchorRef.current = n;
          if (n) spyRect(n, anchorRect);
        }}
      />
      <div
        data-testid={menuTestId}
        ref={(n) => {
          menuRef.current = n;
          if (n && menuRect) spyRect(n, menuRect);
        }}
        style={style}
      />
    </div>
  );
};

describe('useFloatingPosition', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1000,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      configurable: true,
    });
  });

  test('should return hidden and fixed style if closed', () => {
    render(
      <Menu
        anchorRect={makeRect({ left: 0, top: 0, width: 100, height: 40 })}
        open={false}
      />
    );

    const menu = screen.getByTestId(menuTestId);
    expect(menu).toHaveStyle({ visibility: 'hidden', position: 'fixed' });
  });

  test('bottom: computes top/left and width when matchWidth=true', () => {
    render(
      <Menu
        anchorRect={makeRect({ left: 10, top: 10, width: 100, height: 40 })}
        open
      />
    );
    const menu = screen.getByTestId(menuTestId);

    expect(menu).toHaveStyle({
      position: 'fixed',
      top: '54px',
      left: '10px',
      width: '100px',
      maxWidth: '100px',
      boxSizing: 'border-box',
      zIndex: String(DROPDOWN_MENU_Z_INDEX),
    });
  });

  test('top + matchWidth=false uses menuRect height and maxWidth=300', () => {
    render(
      <Menu
        anchorRect={makeRect({ left: 50, top: 100, width: 120, height: 30 })}
        matchWidth={false}
        menuRect={makeRect({ left: 0, top: 0, width: 80, height: 20 })}
        open
        placement='top'
      />
    );

    const menu = screen.getByTestId(menuTestId);

    expect(menu).toHaveStyle({ top: '76px', left: '50px', maxWidth: '300px' });
  });

  test('clamps on right placement when menu would overflow viewport', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 200,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 150,
      configurable: true,
    });

    render(
      <Menu
        anchorRect={makeRect({ left: 20, top: 20, width: 50, height: 40 })}
        matchWidth={false}
        menuRect={makeRect({ left: 0, top: 0, width: 120, height: 60 })}
        minViewportPadding={8}
        offsetX={10}
        offsetY={0}
        open
        placement='right'
      />
    );

    const menu = screen.getByTestId(menuTestId);

    // left = 20+50+10 = 80; maxLeft = 200 - 120 - 8 = 72
    expect(menu).toHaveStyle({ left: '72px', top: '20px' });
  });

  test('clamps on left placement and minimum top padding', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 200,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 150,
    });

    render(
      <Menu
        anchorRect={makeRect({ left: 10, top: 5, width: 40, height: 30 })}
        matchWidth={false}
        menuRect={makeRect({ left: 0, top: 0, width: 100, height: 40 })}
        minViewportPadding={16}
        offsetX={5}
        open
        placement='left'
      />
    );

    const menu = screen.getByTestId(menuTestId);

    // left = 10 - 5 - 100 = -95 -> clamp to 16; top 5, below padding -> clamp to 16
    expect(menu).toHaveStyle({ left: '16px', top: '16px' });
  });
});
