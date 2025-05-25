import { Transaction } from '@/@types/transaction';

export const sortTransactionByDate = (a: Transaction, b: Transaction) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA.getTime() - dateB.getTime();
};
