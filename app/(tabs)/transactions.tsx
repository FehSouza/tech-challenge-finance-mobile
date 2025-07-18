import { Filter, Pagination, ReviewChart, Search, TransactionList } from '@/components';
import { useTransactionsFilterSelect } from '@/states';
import { theme } from '@/theme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Transactions() {
  const filteredTransactions = useTransactionsFilterSelect();

  return (
    <ScrollView style={style.container}>
      <Text style={style.title}>Acompanhar</Text>
      <ReviewChart transactions={filteredTransactions} />
      <View style={style.controlsContainer}>
        <Search />
        <Filter />
      </View>
      <TransactionList transactions={filteredTransactions} itemsPerPage={filteredTransactions.length} />
      <Pagination />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    paddingTop: 32,
  },

  title: {
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
