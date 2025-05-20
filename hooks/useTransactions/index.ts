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
  QuerySnapshot,
  updateDoc
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

const fetchTransactions = async () => {
  const collectionRef = getTransactionsCollection();
  const q = query(collectionRef, orderBy('date', 'desc'));
  const data = await getDocs(q);
  const transactionsData = extractTransactions(data);
  dispatchTransactions(transactionsData);
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
    const docRef = await addDoc(collectionRef, transaction);
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

  dispatchTransactions((prev) =>
    prev.map((t) => (t.id === transactionId ? { ...t, ...transaction, optimistic: true } : t)).sort(sortByDate)
  );
  try {
    await updateDoc(transactionItemRef, transaction);
    dispatchTransactions((prev) =>
      prev.map((t) => (t.id === transactionId ? { ...optimisticTransaction, ...transaction } : t)).sort(sortByDate)
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
