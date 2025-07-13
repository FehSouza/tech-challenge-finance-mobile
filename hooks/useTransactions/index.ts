import { fetchTransactionsCached, fetchTransactionsWithFilters } from '@/services';
import { useEffect } from 'react';

export const useInitializeTransactions = () => {
  useEffect(() => {
    fetchTransactionsCached.fetch();
    fetchTransactionsWithFilters({});
  }, []);
};
