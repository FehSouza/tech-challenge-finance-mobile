import { storage } from '@/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { deleteObject, ref } from 'firebase/storage';
import { Alert } from 'react-native';
import { fetchTransactionsCached } from '../fetchTransactions';
import { fetchTransactionsWithFiltersCached } from '../fetchTransactionsWithFilters';

export const deleteImage = async (url: any) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    Alert.alert('No user found!');
    return;
  }

  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
    fetchTransactionsCached.clear();
    fetchTransactionsWithFiltersCached.clear();
  } catch (error: any) {
    console.error('Error deleting image: ', error);
    Alert.alert('Delete failed!', error.message);
  }
};
