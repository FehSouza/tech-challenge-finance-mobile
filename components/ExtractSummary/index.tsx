import { useGroupedTransactions } from '@/hooks';
import { useTransactionsFilterSelect } from '@/states';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../shared';
import { TransactionCardGroup } from '../TransactionCardGroup';

const itemsPerPage = 5;

export const ExtractSummary = () => {
  const router = useRouter();
  const handleNavigate = () => router.navigate(`/(tabs)/transactions`);
  const transactions = useTransactionsFilterSelect();
  const { transactionsSlice, groupedTransactions } = useGroupedTransactions({ transactions, itemsPerPage });

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

      {transactions.length > itemsPerPage && (
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
