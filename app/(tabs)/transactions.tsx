import { Filter, Pagination, RenderSection, ReviewChart, Search } from '@/components';
import { TRANSACTIONS_MOCK } from '@/mock';
import { theme } from '@/theme';
import { groupByMonthYear } from '@/utils';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const itemsPerPage = 10;

export default function Transactions() {
  const transactionsSlice = TRANSACTIONS_MOCK?.slice(0, itemsPerPage);
  const grouped = groupByMonthYear(transactionsSlice);
  const groupedArray = Object.entries(grouped)?.map(([title, transactions]) => ({ title, transactions }));

  return (
    <ScrollView style={style.container}>
      <Text style={style.title}>Acompanhar</Text>

      <ReviewChart transactions={TRANSACTIONS_MOCK} />

      <View style={style.controlsContainer}>
        <Search />
        <Filter />
      </View>

      <View style={style.transactionsContainer}>
        {!transactionsSlice.length && <Text style={style.noTransactions}>Sem transações cadastradas</Text>}

        {!!transactionsSlice.length && (
          <View>
            {groupedArray.map((item) => (
              <RenderSection key={item.title} item={item} />
            ))}
          </View>
        )}
      </View>

      {!!transactionsSlice.length && <Pagination />}
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

  transactionsContainer: {
    marginTop: 16,
    paddingHorizontal: 25,
  },

  noTransactions: {
    marginTop: 8,
    fontFamily: theme.fontFamily.inter400,
    fontSize: 16,
    lineHeight: 18,
    color: theme.colors.gray600,
    textAlign: 'center',
  },
});
