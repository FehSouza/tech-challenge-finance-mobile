import { fetchTransactions, fetchTransactionsWithFilters } from '@/services';
import { useEffect } from 'react';

export const useInitializeTransactions = () => {
  useEffect(() => {
    fetchTransactions();
    fetchTransactionsWithFilters({});
  }, []);
};
