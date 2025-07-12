import { TransactionItem } from '@/@types/transaction';

export const sortTransactionByDate = (a: TransactionItem, b: TransactionItem) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
};
