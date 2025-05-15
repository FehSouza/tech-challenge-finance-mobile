import { BalanceValue, TransactionCard } from '@/components';
import { TRANSACTIONS_MOCK } from '@/mock';
import { theme } from '@/theme';
import { StyleSheet, View } from 'react-native';

export default function Dashboard() {
  return (
    <View style={style.container}>
      <BalanceValue balance={0} />

      <TransactionCard transaction={TRANSACTIONS_MOCK[0]} />
      <TransactionCard transaction={TRANSACTIONS_MOCK[1]} />
      <TransactionCard transaction={TRANSACTIONS_MOCK[3]} />
      <TransactionCard transaction={TRANSACTIONS_MOCK[4]} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    paddingVertical: 32,
  },
});
