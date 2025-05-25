import { Transaction } from '@/@types/transaction';
import { dispatchTransactions, dispatchTransactionsFilter } from '@/states';
import { sortTransactionByDate } from '@/utils';
import { addDoc } from 'firebase/firestore';
import { formatDateForQuery, getTransactionsCollection } from '../utils';

export const addNewTransaction = async (transaction: Omit<Transaction, 'id'>) => {
  const collectionRef = getTransactionsCollection();
  const optimisticTransaction = {
    ...transaction,
    id: `optimistic-${Math.random().toString(36).substring(2, 9)}`,
    optimistic: true,
  } as Transaction;

  dispatchTransactions((prev) => [...prev, optimisticTransaction].sort(sortTransactionByDate));
  dispatchTransactionsFilter((prev) => [...prev, optimisticTransaction].sort(sortTransactionByDate));
  try {
    const docRef = await addDoc(collectionRef, {
      ...transaction,
      date: typeof transaction.date === 'string' ? transaction.date : formatDateForQuery(new Date(transaction.date)), // Ensure date is YYYY-MM-DD string
    });
    const newTransaction = { ...transaction, id: docRef.id } as Transaction;
    dispatchTransactions((prev) =>
      [...prev.filter((t) => t !== optimisticTransaction), newTransaction].sort(sortTransactionByDate)
    );
    dispatchTransactionsFilter((prev) =>
      [...prev.filter((t) => t !== optimisticTransaction), newTransaction].sort(sortTransactionByDate)
    );
  } catch (error) {
    console.log('Error adding transaction:', error);
    dispatchTransactions((prev) => prev.filter((t) => t !== optimisticTransaction));
    dispatchTransactionsFilter((prev) => prev.filter((t) => t !== optimisticTransaction));
  }
};
