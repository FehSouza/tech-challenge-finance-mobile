import { TransactionItem } from '@/@types/transaction';
import { PAGE_SIZE } from '@/constants';
import { groupByMonthYear } from '@/utils';

interface UseTransactionsProps {
  transactions: TransactionItem[];
  itemsPerPage?: number;
}

export const useGroupedTransactions = ({ transactions, itemsPerPage = PAGE_SIZE }: UseTransactionsProps) => {
  const transactionsSlice = transactions.slice(0, itemsPerPage);
  const grouped = groupByMonthYear(transactionsSlice);
  const groupedTransactions = Object.entries(grouped)?.map(([title, transactions]) => ({ title, transactions }));
  return { groupedTransactions, transactionsSlice };
};
