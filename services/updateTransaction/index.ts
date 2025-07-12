import { TransactionItem } from '@/@types/transaction';
import { dispatchTransactions, dispatchTransactionsFilter, getTransactions } from '@/states';
import { sortTransactionByDate } from '@/utils';
import { updateDoc } from 'firebase/firestore';
import { deleteImage } from '../deleteImage';
import { uploadImage } from '../uploadImage';
import { formatDateForQuery, getTransactionsDocument } from '../utils';

export const updateTransaction = async (transactionId: string, transaction: Partial<TransactionItem>) => {
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
      .sort(sortTransactionByDate)
  );
  dispatchTransactionsFilter((prev) =>
    prev
      .map((t) => (t.id === transactionId ? { ...t, ...updatedTransactionData, optimistic: true } : t))
      .sort(sortTransactionByDate)
  );
  try {
    if (optimisticTransaction.attachment && !transaction.attachment) {
      deleteImage(optimisticTransaction.attachment);
    }
    if (updatedTransactionData.attachment && typeof updatedTransactionData.attachment === 'string') {
      const attachmentUrl = await uploadImage(updatedTransactionData.attachment);
      if (attachmentUrl) updatedTransactionData.attachment = attachmentUrl;
    }
    await updateDoc(transactionItemRef, updatedTransactionData);
    dispatchTransactions((prev) =>
      prev
        .map((t) => (t.id === transactionId ? { ...optimisticTransaction, ...updatedTransactionData } : t))
        .sort(sortTransactionByDate)
    );
    dispatchTransactionsFilter((prev) =>
      prev
        .map((t) => (t.id === transactionId ? { ...optimisticTransaction, ...updatedTransactionData } : t))
        .sort(sortTransactionByDate)
    );
  } catch (error) {
    console.log('Error updating transaction:', error);
    dispatchTransactions((prev) => prev.map((t) => (t.id === transactionId ? optimisticTransaction : t)));
    dispatchTransactionsFilter((prev) => prev.map((t) => (t.id === transactionId ? optimisticTransaction : t)));
  }
};
