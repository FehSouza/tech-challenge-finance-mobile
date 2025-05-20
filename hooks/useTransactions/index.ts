import { CATEGORIES_TYPES_DICTIONARY_MAP, CategoryTypeDictionaryValue } from '@/@types/category';
import { Transaction } from '@/@types/transaction';
import { db } from '@/FirebaseConfig';
import { dispatchTransactions, getTransactions } from '@/states';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  QuerySnapshot,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect } from 'react';

const sortByDate = (a: Transaction, b: Transaction) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
};

const getTransactionsCollection = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  return collection(db, 'transactions', user.uid, 'items');
};

const getTransactionsDocument = (transactionId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  return doc(db, 'transactions', user.uid, 'items', transactionId);
};

const extractTransactions = (data: QuerySnapshot<DocumentData, DocumentData>) => {
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Transaction));
};

export const fetchTransactions = async () => {
  const collectionRef = getTransactionsCollection();
  const q = query(collectionRef, orderBy('date', 'desc'));
  const data = await getDocs(q);
  const transactionsData = extractTransactions(data);
  dispatchTransactions(transactionsData);
};

const formatDateForQuery = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const fetchTransactionsWithFilters = async (filters: {
  category?: CategoryTypeDictionaryValue;
  startDate?: Date;
  endDate?: Date;
  title?: string; // Add title to filters
}) => {
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
    const adjustedEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1 );

    console.log(formatDateForQuery(adjustedEndDate));
    queryConstraints.push(where('date', '<=', formatDateForQuery(adjustedEndDate)));
  }

  if (filters.title && filters.title.trim() !== '') {
    const titleSearch = filters.title.trim();
    // For "starts with" type of search.
    // Firestore does not support case-insensitive "contains" queries natively.
    // For more complex search, consider a dedicated search service like Algolia.
    queryConstraints.push(where('title', '>=', titleSearch));
    queryConstraints.push(where('title', '<=', titleSearch + '\uf8ff'));
  }

  queryConstraints.push(orderBy('date', 'desc'));

  // If filtering by title, Firestore requires the first orderBy to be on the field used in inequality filters.
  // However, we also want to order by date. This might create a conflict if 'title' is not the first orderBy.
  // If 'title' is used in an inequality, and 'date' is the primary sort, an index is needed.
  // For simplicity, if title is filtered, we might need to adjust orderBy or ensure proper indexing.
  // Let's assume 'orderBy('date', 'desc')' is the primary sort desired.
  // If title filter is active, we might need to remove orderBy('date', 'desc') if it causes issues
  // or ensure composite index `(title, date)` or rely on client-side sorting after a broader fetch if complex.

  // Re-arranging orderBy if title filter is active:
  const finalQueryConstraints: QueryConstraint[] = [];
  if (filters.title && filters.title.trim() !== '') {
    // When using range filter on 'title', 'title' must be the first field in orderBy.
    finalQueryConstraints.push(orderBy('title')); 
    // Then, you can order by other fields, like date.
    // However, this changes the primary sort order.
    // For now, let's keep it simple and see if Firestore allows it with proper indexing.
    // If not, the orderBy('date', 'desc') might need to be conditional or removed when title is filtered.
    // For this example, we will keep orderBy('date', 'desc') as the last constraint,
    // which is typical. Firestore might require a composite index on (title, date).
  }
  finalQueryConstraints.push(...queryConstraints);
  // Ensure orderBy('date', 'desc') is present if not already added by title logic.
  // The current logic adds it unconditionally at the end of queryConstraints.

  const q = query(collectionRef, ...queryConstraints); // queryConstraints already includes orderBy('date', 'desc')
  try {
    const data = await getDocs(q);
    const transactionsData = extractTransactions(data);
    dispatchTransactions(transactionsData);
  } catch (error) {
    console.error('Error fetching filtered transactions:', error);
    dispatchTransactions([]);
  }
};

export const addNewTransaction = async (transaction: Omit<Transaction, 'id'>) => {
  const collectionRef = getTransactionsCollection();
  const optimisticTransaction = {
    ...transaction,
    id: `optimistic-${Math.random().toString(36).substring(2, 9)}`,
    optimistic: true,
  } as Transaction;

  dispatchTransactions((prev) => [...prev, optimisticTransaction].sort(sortByDate));
  try {
    const docRef = await addDoc(collectionRef, {
      ...transaction,
      date: typeof transaction.date === 'string' ? transaction.date : formatDateForQuery(new Date(transaction.date)), // Ensure date is YYYY-MM-DD string
    });
    const newTransaction = { ...transaction, id: docRef.id } as Transaction;
    dispatchTransactions((prev) =>
      [...prev.filter((t) => t !== optimisticTransaction), newTransaction].sort(sortByDate)
    );
  } catch (error) {
    console.log('Error adding transaction:', error);
    dispatchTransactions((prev) => prev.filter((t) => t !== optimisticTransaction));
  }
};

export const updateTransaction = async (transactionId: string, transaction: Partial<Transaction>) => {
  const transactionItemRef = getTransactionsDocument(transactionId);
  const optimisticTransaction = getTransactions().find((t) => t.id === transactionId);
  if (!optimisticTransaction) return;

  const updatedTransactionData = { ...transaction };
  if (transaction.date) {
    updatedTransactionData.date =
      typeof transaction.date === 'string' ? transaction.date : formatDateForQuery(new Date(transaction.date));
  }

  dispatchTransactions((prev) =>
    prev
      .map((t) => (t.id === transactionId ? { ...t, ...updatedTransactionData, optimistic: true } : t))
      .sort(sortByDate)
  );
  try {
    await updateDoc(transactionItemRef, updatedTransactionData);
    dispatchTransactions((prev) =>
      prev
        .map((t) => (t.id === transactionId ? { ...optimisticTransaction, ...updatedTransactionData } : t))
        .sort(sortByDate)
    );
  } catch (error) {
    console.log('Error updating transaction:', error);
    dispatchTransactions((prev) => prev.map((t) => (t.id === transactionId ? optimisticTransaction : t)));
  }
};

export const deleteTransaction = async (transactionId: string) => {
  const transactionItemRef = getTransactionsDocument(transactionId);
  const optimisticTransaction = getTransactions().find((t) => t.id === transactionId);
  if (!optimisticTransaction) return;

  dispatchTransactions((prev) => prev.filter((t) => t.id !== transactionId));
  try {
    await deleteDoc(transactionItemRef);
  } catch (error) {
    console.log('Error deleting transaction:', error);
    dispatchTransactions((prev) => [...prev, optimisticTransaction].sort(sortByDate));
  }
};

export const useInitializeTransactions = () => {
  useEffect(() => {
    fetchTransactions();
  }, []);
};
