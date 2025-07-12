import { TransactionItem } from '@/@types/transaction';

export const balance = (transactions: TransactionItem[]) => {
  const value = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') return acc + transaction.value;
    if (transaction.type === 'withdraw') return acc - transaction.value;
    if (transaction.type === 'transfer') return acc - transaction.value;
    return acc;
  }, 0);

  return value;
};
