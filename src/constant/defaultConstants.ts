import { DashboardItem } from '@/__mocks__/dashboard/types';

export const SEARCH_RESULT_DEFAULT_VALUE: SearchResultType = {
  loading: false,
  results: [],
};

export interface SearchResultType {
  loading: boolean;
  results: DashboardItem[];
}
