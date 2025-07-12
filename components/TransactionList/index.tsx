import { TransactionItem } from '@/@types/transaction';
import { theme } from '@/theme';
import { groupByMonthYear } from '@/utils';
import { StyleSheet, Text, View } from 'react-native';
import { RenderSection } from '../ExtractSummary';
import { Pagination } from '../Pagination';

interface TransactionListProps {
  transactions: TransactionItem[];
  itemsPerPage?: number;
}
export const TransactionList = ({ transactions, itemsPerPage = 5 }: TransactionListProps) => {
  const transactionsSlice = transactions.slice(0, itemsPerPage);
  const grouped = groupByMonthYear(transactionsSlice);
  const groupedArray = Object.entries(grouped)?.map(([title, transactions]) => ({ title, transactions }));

  return (
    <>
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
    </>
  );
};

const style = StyleSheet.create({
  transactionsContainer: {
    marginTop: 16,
    paddingHorizontal: 25,
  },
  noTransactions: {
    marginTop: 8,
    fontFamily: theme.fontFamily.inter400,
    fontSize: 16,
    lineHeight: 18,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
});
