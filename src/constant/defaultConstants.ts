import { DashboardItem } from '@/__mocks__/dashboard/types';

export const SEARCH_RESULT_DEFAULT_VALUE: SearchResultType = {
  loading: false,
  results: [],
};

export interface SearchResultType {
  loading: boolean;
  results: DashboardItem[];
}

export const PAGINATION_DEFAULT_VALUE: PaginationDefaultType = {
  pageNo: 1,
  pageSize: 5,
};

export interface PaginationDefaultType {
  pageNo: number;
  pageSize: number;
}
