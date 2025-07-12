import { PAGE_SIZE } from '@/constants';
import { useGroupedTransactions } from '@/hooks';
import { useTransactionsFilterSelect, useTransactionsSelect } from '@/states';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../shared';
import { TransactionCardGroup } from '../TransactionCardGroup';

const useExtractSummary = () => {
  const router = useRouter();
  const handleNavigate = () => router.navigate(`/(tabs)/transactions`);
  const transactions = useTransactionsSelect();
  const filteredTransactions = useTransactionsFilterSelect();
  const { transactionsSlice, groupedTransactions } = useGroupedTransactions({
    transactions: filteredTransactions,
    itemsPerPage: PAGE_SIZE,
  });

  const showViewAllButton = transactions.length > PAGE_SIZE;

  return {
    transactionsSlice,
    groupedTransactions,
    showViewAllButton,
    handleNavigate,
  };
};

export const ExtractSummary = () => {
  const { transactionsSlice, groupedTransactions, showViewAllButton, handleNavigate } = useExtractSummary();
  return (
    <View style={style.container}>
      {!transactionsSlice.length && <Text style={style.noTransactions}>Sem transações cadastradas</Text>}

      {!!transactionsSlice.length && (
        <View style={style.list}>
          {groupedTransactions.map((item) => (
            <TransactionCardGroup key={item.title} item={item} />
          ))}
        </View>
      )}

      {showViewAllButton && (
        <Button variant='input' onPress={handleNavigate}>
          Ver todas as transações
        </Button>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 25,
  },

  noTransactions: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 16,
    lineHeight: 18,
    color: theme.colors.secondary,
    textAlign: 'center',
  },

  list: {
    marginBottom: 32,
  },
});
