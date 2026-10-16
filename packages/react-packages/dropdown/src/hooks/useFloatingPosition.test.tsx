import { useCallback, useEffect, useRef, useState } from 'react';

import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import { DROPDOWN_MENU_Z_INDEX } from '@dt-dds/react-core';

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

interface FakeResizeObserver {
  callback: ResizeObserverCallback;
  observe: jest.Mock;
  unobserve: jest.Mock;
  disconnect: jest.Mock;
  targets: Set<Element>;
  disconnected: boolean;
}

const originalResizeObserver = window.ResizeObserver;

function installResizeObserver() {
  const instances: FakeResizeObserver[] = [];

  class ResizeObserverFake {
    constructor(callback: ResizeObserverCallback) {
      const instance: FakeResizeObserver = {
        callback,
        targets: new Set(),
        disconnected: false,
        observe: jest.fn((target: Element) => {
          instance.targets.add(target);
        }),
        unobserve: jest.fn((target: Element) => {
          instance.targets.delete(target);
        }),
        disconnect: jest.fn(() => {
          instance.targets.clear();
          instance.disconnected = true;
        }),
      };
      instances.push(instance);
      return instance as unknown as ResizeObserverFake;
    }
  }

  window.ResizeObserver =
    ResizeObserverFake as unknown as typeof ResizeObserver;

  // Invokes the callback of every live observer that watches `target`,
  // as the browser does when that element changes size.
  const fire = (target: Element) => {
    instances
      .filter((ro) => !ro.disconnected && ro.targets.has(target))
      .forEach((ro) =>
        ro.callback(
          [{ target } as ResizeObserverEntry],
          ro as unknown as ResizeObserver
        )
      );
  };

  return { instances, fire };
}

type MenuProps = {
  onRender?: (style: React.CSSProperties) => void;
  open?: boolean;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  matchWidth?: boolean;
  offsetX?: number;
  offsetY?: number;
  minViewportPadding?: number;
  anchorRect: DOMRect;
  menuRect?: DOMRect;
  // Renders the menu only after an effect, as core's Portal does.
  mountMenuLate?: boolean;
};

const menuTestId = 'menu';

const Menu = ({
  onRender,
  open = true,
  placement = 'bottom',
  matchWidth = true,
  offsetX,
  offsetY,
  minViewportPadding,
  anchorRect,
  menuRect,
  mountMenuLate = false,
}: MenuProps) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [menuEl, setMenuEl] = useState<HTMLDivElement | null>(null);
  const [showMenu, setShowMenu] = useState(!mountMenuLate);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowMenu(true);
  }, []);

  const menuRef = useCallback(
    (n: HTMLDivElement | null) => {
      if (n && menuRect) spyRect(n, menuRect);
      setMenuEl(n);
    },
    [menuRect]
  );

  const { style } = useFloatingPosition(anchorRef, open, {
    placement,
    matchWidth,
    offsetX,
    offsetY,
    minViewportPadding,
    menuElement: menuEl,
  });

  onRender?.(style);

  return (
    <div>
      <div
        data-testid='anchor'
        ref={(n) => {
          anchorRef.current = n;
          if (n) spyRect(n, anchorRect);
        }}
      />
      {showMenu && <div data-testid={menuTestId} ref={menuRef} style={style} />}
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

  afterEach(() => {
    window.ResizeObserver = originalResizeObserver;
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

  test('should measure a menu that mounts after the first layout effect', () => {
    render(
      <Menu
        anchorRect={makeRect({ left: 50, top: 100, width: 120, height: 30 })}
        matchWidth={false}
        menuRect={makeRect({ left: 0, top: 0, width: 80, height: 20 })}
        mountMenuLate
        open
        placement='top'
      />
    );

    // top = 100 - 4 - 20 = 76 (96 if the menu height were never read)
    expect(screen.getByTestId(menuTestId)).toHaveStyle({ top: '76px' });
  });

  describe('when the menu resizes after open (matchWidth=false)', () => {
    const anchorRect = makeRect({ left: 600, top: 10, width: 100, height: 40 });
    // First measurement: the menu still spans the viewport (width: 100%).
    const wideMenuRect = makeRect({ left: 0, top: 0, width: 1000, height: 80 });
    // After maxWidth: 300 applies, the menu shrinks.
    const cappedMenuRect = makeRect({
      left: 0,
      top: 0,
      width: 300,
      height: 80,
    });

    const renderResizingMenu = (onRender?: MenuProps['onRender']) => {
      const ro = installResizeObserver();
      const props = {
        anchorRect,
        matchWidth: false,
        offsetX: -200,
        onRender,
        open: true,
        placement: 'bottom' as const,
      };
      const utils = render(<Menu {...props} menuRect={wideMenuRect} />);
      const menu = screen.getByTestId(menuTestId);

      // left = 600 - 200 = 400; maxLeft = max(8, 1000 - 1000 - 8) = 8
      expect(menu).toHaveStyle({ left: '8px' });

      utils.rerender(<Menu {...props} menuRect={cappedMenuRect} />);
      expect(menu).toHaveStyle({ left: '8px' });

      act(() => ro.fire(menu));

      return { ...utils, ro, menu, props };
    };

    test('should recompute left when the menu resizes after open', () => {
      const { menu } = renderResizingMenu();

      // left = 400; maxLeft = 1000 - 300 - 8 = 692; top = 50 + 4 = 54
      expect(menu).toHaveStyle({ left: '400px', top: '54px' });
    });

    test('should keep maxWidth 300px after the menu resizes', () => {
      const { menu } = renderResizingMenu();

      expect(menu).toHaveStyle({ maxWidth: '300px' });
      expect(menu.style.width).toBe('');
    });

    test("should keep a widened menu inside the viewport's right edge", () => {
      const ro = installResizeObserver();
      const props = {
        anchorRect: makeRect({ left: 880, top: 20, width: 100, height: 32 }),
        matchWidth: false,
        open: true,
        placement: 'bottom' as const,
      };
      const { rerender } = render(
        <Menu
          {...props}
          menuRect={makeRect({ left: 0, top: 0, width: 80, height: 40 })}
        />
      );
      const menu = screen.getByTestId(menuTestId);

      // left = 880; maxLeft = 1000 - 80 - 8 = 912
      expect(menu).toHaveStyle({ left: '880px' });

      rerender(
        <Menu
          {...props}
          menuRect={makeRect({ left: 0, top: 0, width: 200, height: 40 })}
        />
      );
      act(() => ro.fire(menu));

      // maxLeft = 1000 - 200 - 8 = 792
      expect(menu).toHaveStyle({ left: '792px' });
    });

    test('should observe the menu and the anchor, and disconnect on close and unmount', () => {
      const ro = installResizeObserver();
      const props = {
        anchorRect,
        matchWidth: false,
        menuRect: cappedMenuRect,
        offsetX: -200,
      };
      const { rerender, unmount } = render(<Menu {...props} open />);
      const menu = screen.getByTestId(menuTestId);
      const anchor = screen.getByTestId('anchor');

      // The observer created before the menu node reached state is replaced.
      const live = ro.instances.filter((instance) => !instance.disconnected);
      expect(live).toHaveLength(1);
      const [first] = live;
      expect(first.observe).toHaveBeenCalledTimes(2);
      expect(first.observe).toHaveBeenCalledWith(menu);
      expect(first.observe).toHaveBeenCalledWith(anchor);

      rerender(<Menu {...props} open={false} />);
      expect(first.disconnect).toHaveBeenCalledTimes(1);
      expect(ro.instances.every((instance) => instance.disconnected)).toBe(
        true
      );

      rerender(<Menu {...props} open />);
      const second = ro.instances[ro.instances.length - 1];
      expect(second).not.toBe(first);
      expect(second.targets.has(menu)).toBe(true);

      unmount();
      expect(second.disconnect).toHaveBeenCalledTimes(1);
    });
  });
});
