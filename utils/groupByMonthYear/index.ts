import { MONTHS_DICTIONARY, Transaction } from '@/@types/transaction';
import dayjs from 'dayjs';

export const groupByMonthYear = (transactions: Transaction[]) => {
  if (!transactions.length) return {};

  const data = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!date) return acc;

    const [day, month, year] = date.split('/');
    const monthFormatted = dayjs(`${year}-${month}-${day}`).format('MMMM');
    const monthAndYear = `${MONTHS_DICTIONARY[monthFormatted as keyof typeof MONTHS_DICTIONARY]} - ${year}`;

    if (!acc[monthAndYear]) return { ...acc, [monthAndYear]: [transaction] }; // acc[monthAndYear] = [];
    return { ...acc, [monthAndYear]: [...acc[monthAndYear], transaction] };
  }, {} as Record<string, Transaction[]>);

  return data;
};
