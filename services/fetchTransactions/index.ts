import { dispatchTransactions } from '@/states';
import { getDocs, orderBy, query } from 'firebase/firestore';
import { extractTransactions, getTransactionsCollection } from '../utils';

export const fetchTransactions = async () => {
  const collectionRef = getTransactionsCollection();
  const q = query(collectionRef, orderBy('date', 'desc'));
  const data = await getDocs(q);
  const transactionsData = extractTransactions(data);
  dispatchTransactions(transactionsData);
};
