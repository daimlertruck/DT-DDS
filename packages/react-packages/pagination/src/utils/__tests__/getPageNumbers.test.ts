import { getPageNumbers } from '../getPageNumbers';

describe('getPageNumbers', () => {
  const toTokens = (
    currentPage: number,
    lastPage: number,
    direction: 'FORWARD' | 'BACKWARD' = 'FORWARD'
  ) => {
    const {
      pages,
      shouldRenderFirstPage,
      shouldRenderLastPage,
      shouldRenderLeftEllipsis,
      shouldRenderRightEllipsis,
    } = getPageNumbers(currentPage, lastPage, direction);

    return [
      ...(shouldRenderFirstPage ? ['1'] : []),
      ...(shouldRenderLeftEllipsis ? ['...'] : []),
      ...pages.map(String),
      ...(shouldRenderRightEllipsis ? ['...'] : []),
      ...(shouldRenderLastPage ? [String(lastPage)] : []),
    ];
  };

  it('should render all pages without ellipsis when there are at most 5 pages', () => {
    expect(getPageNumbers(3, 5)).toStrictEqual({
      pages: [1, 2, 3, 4, 5],
      shouldRenderFirstPage: false,
      shouldRenderLastPage: false,
      shouldRenderLeftEllipsis: false,
      shouldRenderRightEllipsis: false,
    });
  });

  it('should follow the ascending sequence for 10 pages', () => {
    expect(toTokens(1, 10)).toStrictEqual(['1', '2', '3', '...', '10']);
    expect(toTokens(2, 10)).toStrictEqual(['1', '2', '3', '...', '10']);
    expect(toTokens(3, 10)).toStrictEqual(['2', '3', '4', '...', '10']);
    expect(toTokens(4, 10)).toStrictEqual(['3', '4', '5', '...', '10']);
    expect(toTokens(5, 10)).toStrictEqual(['4', '5', '6', '...', '10']);
    expect(toTokens(6, 10)).toStrictEqual(['5', '6', '7', '...', '10']);
    expect(toTokens(7, 10)).toStrictEqual(['6', '7', '8', '...', '10']);
  });

  it('should switch to last-three-pages layout for the last three pages', () => {
    expect(toTokens(8, 10)).toStrictEqual(['1', '...', '8', '9', '10']);
    expect(toTokens(9, 10)).toStrictEqual(['1', '...', '8', '9', '10']);
    expect(toTokens(10, 10)).toStrictEqual(['1', '...', '8', '9', '10']);
  });

  it('should follow the descending sequence for 10 pages', () => {
    expect(toTokens(10, 10, 'BACKWARD')).toStrictEqual([
      '1',
      '...',
      '8',
      '9',
      '10',
    ]);
    expect(toTokens(9, 10, 'BACKWARD')).toStrictEqual([
      '1',
      '...',
      '8',
      '9',
      '10',
    ]);
    expect(toTokens(8, 10, 'BACKWARD')).toStrictEqual([
      '1',
      '...',
      '7',
      '8',
      '9',
    ]);
    expect(toTokens(7, 10, 'BACKWARD')).toStrictEqual([
      '1',
      '...',
      '6',
      '7',
      '8',
    ]);
    expect(toTokens(6, 10, 'BACKWARD')).toStrictEqual([
      '1',
      '...',
      '5',
      '6',
      '7',
    ]);
    expect(toTokens(5, 10, 'BACKWARD')).toStrictEqual([
      '1',
      '...',
      '4',
      '5',
      '6',
    ]);
    expect(toTokens(4, 10, 'BACKWARD')).toStrictEqual([
      '1',
      '...',
      '3',
      '4',
      '5',
    ]);
    expect(toTokens(3, 10, 'BACKWARD')).toStrictEqual([
      '1',
      '2',
      '3',
      '...',
      '10',
    ]);
    expect(toTokens(2, 10, 'BACKWARD')).toStrictEqual([
      '1',
      '2',
      '3',
      '...',
      '10',
    ]);
    expect(toTokens(1, 10, 'BACKWARD')).toStrictEqual([
      '1',
      '2',
      '3',
      '...',
      '10',
    ]);
  });

  it('should never render more than one ellipsis token in both directions', () => {
    for (let page = 1; page <= 10; page += 1) {
      const forwardEllipsisCount = toTokens(page, 10, 'FORWARD').filter(
        (token) => token === '...'
      ).length;
      const backwardEllipsisCount = toTokens(page, 10, 'BACKWARD').filter(
        (token) => token === '...'
      ).length;

      expect(forwardEllipsisCount).toBeLessThanOrEqual(1);
      expect(backwardEllipsisCount).toBeLessThanOrEqual(1);
    }
  });

  it('should clamp current page when cursor would go out of bounds', () => {
    expect(toTokens(0, 10, 'FORWARD')).toStrictEqual(
      toTokens(1, 10, 'FORWARD')
    );
    expect(toTokens(-10, 10, 'FORWARD')).toStrictEqual(
      toTokens(1, 10, 'FORWARD')
    );
    expect(toTokens(11, 10, 'FORWARD')).toStrictEqual(
      toTokens(10, 10, 'FORWARD')
    );

    expect(toTokens(0, 10, 'BACKWARD')).toStrictEqual(
      toTokens(1, 10, 'BACKWARD')
    );
    expect(toTokens(-10, 10, 'BACKWARD')).toStrictEqual(
      toTokens(1, 10, 'BACKWARD')
    );
    expect(toTokens(11, 10, 'BACKWARD')).toStrictEqual(
      toTokens(10, 10, 'BACKWARD')
    );
  });
});
