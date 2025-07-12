import { MONTHS_DICTIONARY, TransactionItem } from '@/@types/transaction';
import dayjs from 'dayjs';

export const groupByMonthYear = (transactions: TransactionItem[]) => {
  if (!transactions.length) return {};

  const data = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!date) return acc;

    const [day, month, year] = new Date(date).toLocaleDateString('pt-BR').split('/');
    const monthFormatted = dayjs(`${year}-${month}-${day}`).format('MMMM');
    const monthAndYear = `${MONTHS_DICTIONARY[monthFormatted as keyof typeof MONTHS_DICTIONARY]} - ${year}`;
    const key = `${year}${month.padStart(2, '0')}`;

    if (!acc[key]) return { ...acc, [key]: { title: monthAndYear, transactions: [transaction] } };
    const existingTransactions = acc[key].transactions;
    const newTransactions = [...existingTransactions, transaction];
    const grouped = { ...acc[key], transactions: newTransactions };
    return { ...acc, [key]: grouped };
  }, {} as Record<string, { title: string; transactions: TransactionItem[] }>);

  return data;
};
