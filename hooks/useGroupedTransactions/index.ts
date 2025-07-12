import { TransactionItem } from '@/@types/transaction';
import { groupByMonthYear } from '@/utils';

interface UseTransactionsProps {
  transactions: TransactionItem[];
  itemsPerPage?: number;
}

export const useGroupedTransactions = ({ transactions, itemsPerPage }: UseTransactionsProps) => {
  const transactionsSlice = transactions.slice(0, itemsPerPage);
  const grouped = groupByMonthYear(transactionsSlice);
  const groupedTransactions = Object.entries(grouped)?.map(([title, transactions]) => ({ title, transactions }));
  return { groupedTransactions, transactionsSlice };
};
