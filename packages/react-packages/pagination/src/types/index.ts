import { Code } from '@dt-dds/icons';
import { BaseProps } from '@dt-dds/react-core';

export interface PaginationProps extends BaseProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  showItemsPerPage?: boolean;
  showItemsInfo?: boolean;
  itemsPerPageOptions?: number[];
}

export interface PaginationNavButtonProps {
  ariaLabel: string;
  tooltipLabel: string;
  icon: Code;
  targetPage: number;
  isDisabled: boolean;
  testId: string;
  onClick: (page: number) => void;
}
