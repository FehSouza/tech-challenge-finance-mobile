import { Transaction } from '@/@types/transaction';
import { db } from '@/FirebaseConfig';
import { dispatchTransactions, getTransactions } from '@/states';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, query, QuerySnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

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
  const q = query(collectionRef);
  const data = await getDocs(q);
  const transactionsData = extractTransactions(data);
  dispatchTransactions(transactionsData);
  console.log(JSON.stringify(transactionsData, null, 2));
};

export const addTransaction = async (
  transaction: Pick<Transaction, 'type' | 'date' | 'value' | 'category' | 'title' | 'attachment'>
) => {
  const collectionRef = getTransactionsCollection();
  const optimisticTransaction = {
    ...transaction,
    id: `optimistic-${Math.random().toString(36).substring(2, 9)}`,
  } as Transaction;

  dispatchTransactions((prev) => [...prev, optimisticTransaction]);
  try {
    const docRef = await addDoc(collectionRef, transaction);
    const newTransaction = { ...transaction, id: docRef.id } as Transaction;
    dispatchTransactions((prev) => [...prev.filter((t) => t !== optimisticTransaction), newTransaction]);
  } catch (error) {
    console.log('Error adding transaction:', error);
    dispatchTransactions((prev) => prev.filter((t) => t !== optimisticTransaction));
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
    dispatchTransactions((prev) => [...prev, optimisticTransaction]);
  }
};

export const useInitializeTransactions = () => {
  useEffect(() => {
    fetchTransactions();
  }, []);
};
