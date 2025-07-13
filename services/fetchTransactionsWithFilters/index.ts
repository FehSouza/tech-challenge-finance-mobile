import { CATEGORIES_TYPES_DICTIONARY_MAP, CategoryTypeDictionaryValue } from '@/@types/category';
import { SimpleCache } from '@/libs';
import { dispatchPagination, dispatchTransactionsFilter, getPagination } from '@/states';
import { sortTransactionByDate } from '@/utils';
import {
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  startAfter,
  where,
} from 'firebase/firestore';
import { extractTransactions, formatDateForQuery, getTransactionsCollection } from '../utils';

interface FetchTransactionsWithFiltersInternalParams {
  category?: CategoryTypeDictionaryValue;
  startDate?: Date;
  endDate?: Date;
  title?: string;
  concat?: boolean;
  pageSize: number;
  lastVisible: DocumentSnapshot | null;
}

const fetchTransactionsWithFiltersInternal = async ({
  pageSize,
  lastVisible,
  ...filters
}: FetchTransactionsWithFiltersInternalParams) => {
  const collectionRef = getTransactionsCollection();
  const queryConstraints: QueryConstraint[] = [];

  if (filters.category) {
    const filterCategory = filters.category as keyof typeof CATEGORIES_TYPES_DICTIONARY_MAP;
    const firestoreCategoryKey = CATEGORIES_TYPES_DICTIONARY_MAP[filterCategory];

    if (firestoreCategoryKey) queryConstraints.push(where('category', '==', firestoreCategoryKey));
    else console.warn(`Category value "${filterCategory}" did not map to a Firestore key.`);
  }
  queryConstraints.push(orderBy('date', 'desc'));

  if (filters.startDate) queryConstraints.push(where('date', '>=', formatDateForQuery(filters.startDate)));

  if (filters.endDate) {
    const endDate = new Date(filters.endDate);
    const adjustedEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1);

    queryConstraints.push(where('date', '<=', formatDateForQuery(adjustedEndDate)));
  }

  if (filters.title && filters.title.trim() !== '') {
    const titleSearch = filters.title.trim();
    queryConstraints.push(orderBy('title'));
    queryConstraints.push(where('title', '>=', titleSearch));
    queryConstraints.push(where('title', '<=', titleSearch + '\uf8ff'));
  }

  if (lastVisible) {
    queryConstraints.push(startAfter(lastVisible));
  }

  queryConstraints.push(limit(pageSize));

  const q = query(collectionRef, ...queryConstraints);
  try {
    const snapshot = await getDocs(q);
    const transactionsData = extractTransactions(snapshot).sort(sortTransactionByDate);
    const isLastPage = transactionsData.length < pageSize;
    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
    dispatchPagination((prev) => ({ ...prev, isLastPage, lastVisible }));
    if (!filters.concat) dispatchTransactionsFilter(transactionsData);
    if (filters.concat) dispatchTransactionsFilter((p) => [...p, ...transactionsData].sort(sortTransactionByDate));
  } catch (error) {
    console.error('Error fetching filtered transactions:', error);
    dispatchTransactionsFilter([]);
  }
};

export const fetchTransactionsWithFiltersCached = new SimpleCache({ fetcher: fetchTransactionsWithFiltersInternal });

interface FetchTransactionsWithFiltersParams {
  category?: CategoryTypeDictionaryValue;
  startDate?: Date;
  endDate?: Date;
  title?: string;
  concat?: boolean;
}

export const fetchTransactionsWithFilters = async (filters: FetchTransactionsWithFiltersParams) => {
  const { pageSize, lastVisible } = getPagination();
  const params: FetchTransactionsWithFiltersInternalParams = { ...filters, pageSize, lastVisible };
  await fetchTransactionsWithFiltersCached.fetch(params);
};
