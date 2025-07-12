import { TransactionItem } from '@/@types/transaction';
import { PAGE_SIZE } from '@/constants';
import { useGroupedTransactions } from '@/hooks';
import { theme } from '@/theme';
import { StyleSheet, Text, View } from 'react-native';
import { Pagination } from '../Pagination';
import { TransactionCardGroup } from '../TransactionCardGroup';

interface TransactionListProps {
  transactions: TransactionItem[];
  itemsPerPage?: number;
}
export const TransactionList = ({ transactions, itemsPerPage = PAGE_SIZE }: TransactionListProps) => {
  const { transactionsSlice, groupedTransactions } = useGroupedTransactions({ transactions, itemsPerPage });

  return (
    <>
      <View style={style.transactionsContainer}>
        {!transactionsSlice.length && <Text style={style.noTransactions}>Sem transações cadastradas</Text>}

        {!!transactionsSlice.length && (
          <View>
            {groupedTransactions.map((item) => (
              <TransactionCardGroup key={item.title} item={item} />
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
