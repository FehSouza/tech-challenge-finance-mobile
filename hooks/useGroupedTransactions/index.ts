import { TransactionItem } from '@/@types/transaction';
import { PAGE_SIZE } from '@/constants';
import { groupByMonthYear } from '@/utils';

interface UseTransactionsProps {
  transactions: TransactionItem[];
  itemsPerPage?: number;
}

const convertGroupedToArray = (grouped: ReturnType<typeof groupByMonthYear>) => {
  const entries = Object.entries(grouped);
  const extracted = entries.map(([key, { title, transactions }]) => ({ key, title, transactions }));
  const sorted = extracted.sort((a, b) => Number(b.key) - Number(a.key));
  return sorted;
};

export const useGroupedTransactions = ({ transactions, itemsPerPage = PAGE_SIZE }: UseTransactionsProps) => {
  const transactionsSlice = transactions.slice(0, itemsPerPage);
  const grouped = groupByMonthYear(transactionsSlice);
  const groupedTransactions = convertGroupedToArray(grouped);
  return { groupedTransactions, transactionsSlice };
};
