import { dispatchTransactions } from '@/states';
import { sortTransactionByDate } from '@/utils';
import { getDocs, orderBy, query } from 'firebase/firestore';
import { extractTransactions, getTransactionsCollection } from '../utils';

export const fetchTransactions = async () => {
  const collectionRef = getTransactionsCollection();
  const q = query(collectionRef, orderBy('date', 'asc'));
  const data = await getDocs(q);
  const transactionsData = extractTransactions(data);
  dispatchTransactions(transactionsData.sort(sortTransactionByDate));
};
