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

    if (!acc[monthAndYear]) return { ...acc, [monthAndYear]: [transaction] }; // acc[monthAndYear] = [];
    return { ...acc, [monthAndYear]: [...acc[monthAndYear], transaction] };
  }, {} as Record<string, TransactionItem[]>);

  return data;
};
