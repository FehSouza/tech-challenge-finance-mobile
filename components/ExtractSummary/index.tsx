import { PAGE_SIZE } from '@/constants';
import { useTransactionsFilterSelect, useTransactionsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button } from '../shared';
import { TransactionList } from '../TransactionList';

const useExtractSummary = () => {
  const router = useRouter();
  const handleNavigate = () => router.navigate(`/(tabs)/transactions`);
  const transactions = useTransactionsSelect();
  const filteredTransactions = useTransactionsFilterSelect();

  const showViewAllButton = transactions.length > PAGE_SIZE;

  return {
    filteredTransactions,
    showViewAllButton,
    handleNavigate,
  };
};

export const ExtractSummary = () => {
  const { filteredTransactions, showViewAllButton, handleNavigate } = useExtractSummary();
  return (
    <View style={style.container}>
      <TransactionList transactions={filteredTransactions} />

      {showViewAllButton && (
        <View style={style.viewAllContainer}>
          <Button variant='input' onPress={handleNavigate}>
            Ver todas as transações
          </Button>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },

  viewAllContainer: {
    paddingHorizontal: 25,
    marginTop: 32,
  },
});
