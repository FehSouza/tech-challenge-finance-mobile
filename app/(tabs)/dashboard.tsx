import { BalanceValue, ExtractSummary, Filter, Search } from '@/components';
import { TRANSACTIONS_MOCK } from '@/mock';
import { theme } from '@/theme';
import { balance } from '@/utils';
import { StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  const balanceValue = balance(TRANSACTIONS_MOCK);

  return (
    <View style={style.container}>
      <BalanceValue balance={balanceValue} />

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
