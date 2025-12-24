const PAGINATION_THRESHOLD = 5;
const START_BOUNDARY = 3;
const END_OFFSET = 2;
const NEIGHBOR_COUNT = 1;

export const getPageNumbers = (
  currentPage: number,
  totalPages: number
): (number | 'ellipsis')[] => {
  if (totalPages <= PAGINATION_THRESHOLD) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const showLeftEllipsis = currentPage > START_BOUNDARY;
  const showRightEllipsis = currentPage < totalPages - END_OFFSET;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [1, 2, 3, 'ellipsis', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    'ellipsis',
    currentPage - NEIGHBOR_COUNT,
    currentPage,
    currentPage + NEIGHBOR_COUNT,
    'ellipsis',
    totalPages,
  ];
};
