import { CATEGORIES_TYPES_DICTIONARY_MAP, CategoryTypeDictionaryValue } from '@/@types/category';
import { dispatchPagination, dispatchTransactionsFilter, getPagination } from '@/states';
import { getDocs, limit, orderBy, query, QueryConstraint, startAfter, where } from 'firebase/firestore';
import { extractTransactions, formatDateForQuery, getTransactionsCollection } from '../utils';

export const fetchTransactionsWithFilters = async (filters: {
  category?: CategoryTypeDictionaryValue;
  startDate?: Date;
  endDate?: Date;
  title?: string;
  concat?: boolean;
}) => {
  const { pageSize, lastVisible } = getPagination();
  const collectionRef = getTransactionsCollection();
  const queryConstraints: QueryConstraint[] = [];

  if (filters.category) {
    const filterCategory = filters.category as keyof typeof CATEGORIES_TYPES_DICTIONARY_MAP;
    const firestoreCategoryKey = CATEGORIES_TYPES_DICTIONARY_MAP[filterCategory];

    if (firestoreCategoryKey) queryConstraints.push(where('category', '==', firestoreCategoryKey));
    else console.warn(`Category value "${filterCategory}" did not map to a Firestore key.`);
  }

  if (filters.startDate) queryConstraints.push(where('date', '>=', formatDateForQuery(filters.startDate)));

  if (filters.endDate) {
    const endDate = new Date(filters.endDate);
    const adjustedEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1);

    console.log(formatDateForQuery(adjustedEndDate));
    queryConstraints.push(where('date', '<=', formatDateForQuery(adjustedEndDate)));
  }

  if (filters.title && filters.title.trim() !== '') {
    const titleSearch = filters.title.trim();
    queryConstraints.push(where('title', '>=', titleSearch));
    queryConstraints.push(where('title', '<=', titleSearch + '\uf8ff'));
  }

  queryConstraints.push(orderBy('date', 'desc'));

  const finalQueryConstraints: QueryConstraint[] = [];
  if (filters.title && filters.title.trim() !== '') finalQueryConstraints.push(orderBy('title'));
  finalQueryConstraints.push(...queryConstraints);

  if (lastVisible) {
    queryConstraints.push(startAfter(lastVisible));
  }

  queryConstraints.push(limit(pageSize));

  const q = query(collectionRef, ...queryConstraints);
  try {
    const snapshot = await getDocs(q);
    const transactionsData = extractTransactions(snapshot);
    const isLastPage = transactionsData.length < pageSize;
    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
    dispatchPagination((prev) => ({ ...prev, isLastPage, lastVisible }));
    if (!filters.concat) dispatchTransactionsFilter(transactionsData);
    if (filters.concat) dispatchTransactionsFilter((prev) => [...prev, ...transactionsData]);
  } catch (error) {
    console.error('Error fetching filtered transactions:', error);
    dispatchTransactionsFilter([]);
  }
};
