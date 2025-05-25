import { createReStateMethods } from '@raulpesilva/re-state';
import { DocumentSnapshot } from 'firebase/firestore';

const PAGINATION_KEY = 'pagination';
type PaginationState = {
  pageSize: number;
  isLastPage: boolean;
  lastVisible: DocumentSnapshot | null;
};
const initialValue = {
  pageSize: 3,
  isLastPage: true,
  lastVisible: null,
} as PaginationState;

const methods = createReStateMethods(PAGINATION_KEY, initialValue);
export const { dispatchPagination, usePaginationSelect, getPagination } = methods;
export const clearPaginationState = () => dispatchPagination(initialValue);
