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

  queryConstraints.push(orderBy('date', 'desc'));

  const q = query(collectionRef, ...queryConstraints);
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
