import { BalanceValue, ExtractSummary, Filter, Search } from '@/components';
import { TRANSACTIONS_MOCK } from '@/mock';
import { theme } from '@/theme';
import { StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  const balance = TRANSACTIONS_MOCK.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') return acc + transaction.value;
    if (transaction.type === 'withdraw') return acc - transaction.value;
    if (transaction.type === 'transfer') return acc - transaction.value;
    return acc;
  }, 0);

  return (
    <View style={style.container}>
      <BalanceValue balance={balance} />

      <Text style={style.title}>Últimas transações</Text>

      <View style={style.controlsContainer}>
        <Search />
        <Filter />
      </View>

      <ExtractSummary />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    paddingVertical: 32,
  },

  title: {
    marginTop: 32,
    paddingHorizontal: 25,
    fontFamily: theme.fontFamily.inter600,
    fontSize: 24,
    lineHeight: 28,
    color: theme.colors.white,
  },

  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
    paddingHorizontal: 25,
  },
});
