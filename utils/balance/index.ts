import { Transaction } from '@/@types/transaction';

export const balance = (transactions: Transaction[]) => {
  const value = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') return acc + transaction.value;
    if (transaction.type === 'withdraw') return acc - transaction.value;
    if (transaction.type === 'transfer') return acc - transaction.value;
    return acc;
  }, 0);

  return value;
};
