import { dispatchTransactions, dispatchTransactionsFilter, getTransactions } from '@/states';
import { sortTransactionByDate } from '@/utils';
import { deleteDoc } from 'firebase/firestore';
import { deleteImage } from '../deleteImage';
import { fetchTransactionsCached } from '../fetchTransactions';
import { fetchTransactionsWithFiltersCached } from '../fetchTransactionsWithFilters';
import { getTransactionsDocument } from '../utils';

export const deleteTransaction = async (transactionId: string) => {
  const transactionItemRef = getTransactionsDocument(transactionId);
  const optimisticTransaction = getTransactions().find((t) => t.id === transactionId);
  if (!optimisticTransaction) return;

  dispatchTransactions((prev) => prev.filter((t) => t.id !== transactionId));
  dispatchTransactionsFilter((prev) => prev.filter((t) => t.id !== transactionId));
  try {
    await deleteDoc(transactionItemRef);
    if (optimisticTransaction.attachment) deleteImage(optimisticTransaction.attachment);
    fetchTransactionsCached.clear();
    fetchTransactionsWithFiltersCached.clear();
  } catch (error) {
    console.log('Error deleting transaction:', error);
    dispatchTransactions((prev) => [...prev, optimisticTransaction].sort(sortTransactionByDate));
    dispatchTransactionsFilter((prev) => [...prev, optimisticTransaction].sort(sortTransactionByDate));
  }
};
