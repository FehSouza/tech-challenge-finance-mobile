import { TransactionItem } from '@/@types/transaction';
import { dispatchTransactions, dispatchTransactionsFilter } from '@/states';
import { sortTransactionByDate } from '@/utils';
import { addDoc } from 'firebase/firestore';
import { fetchTransactionsCached } from '../fetchTransactions';
import { fetchTransactionsWithFiltersCached } from '../fetchTransactionsWithFilters';
import { uploadImage } from '../uploadImage';
import { formatDateForQuery, getTransactionsCollection } from '../utils';

export const addNewTransaction = async (transaction: Omit<TransactionItem, 'id'>) => {
  const collectionRef = getTransactionsCollection();
  const optimisticTransaction = {
    ...transaction,
    id: `optimistic-${Math.random().toString(36).substring(2, 9)}`,
    optimistic: true,
  } as TransactionItem;

  dispatchTransactions((prev) => [...prev, optimisticTransaction].sort(sortTransactionByDate));
  dispatchTransactionsFilter((prev) => [...prev, optimisticTransaction].sort(sortTransactionByDate));
  try {
    if (transaction.attachment && typeof transaction.attachment === 'string') {
      const attachmentUrl = await uploadImage(transaction.attachment);
      if (attachmentUrl) transaction.attachment = attachmentUrl;
    }
    const docRef = await addDoc(collectionRef, {
      ...transaction,
      date: typeof transaction.date === 'string' ? transaction.date : formatDateForQuery(new Date(transaction.date)), // Ensure date is YYYY-MM-DD string
    });
    const newTransaction = { ...transaction, id: docRef.id } as TransactionItem;
    dispatchTransactions((prev) =>
      [...prev.filter((t) => t !== optimisticTransaction), newTransaction].sort(sortTransactionByDate)
    );
    dispatchTransactionsFilter((prev) =>
      [...prev.filter((t) => t !== optimisticTransaction), newTransaction].sort(sortTransactionByDate)
    );
    fetchTransactionsCached.clear();
    fetchTransactionsWithFiltersCached.clear();
  } catch (error) {
    console.log('Error adding transaction:', error);
    dispatchTransactions((prev) => prev.filter((t) => t !== optimisticTransaction));
    dispatchTransactionsFilter((prev) => prev.filter((t) => t !== optimisticTransaction));
  }
};
