import { Transaction } from '@/@types/transaction';
import { useTransactionsSelect } from '@/states';
import { theme } from '@/theme';
import { groupByMonthYear } from '@/utils';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../shared';
import { TransactionCard } from '../TransactionCard';

interface RenderSectionProps {
  item: { title: string; transactions: Transaction[] };
}

export const RenderSection = ({ item }: RenderSectionProps) => (
  <View>
    <Text style={style.sectionTitle}>{item.title}</Text>
    {item.transactions.map((transaction) => (
      <TransactionCard key={transaction.id} transaction={transaction} />
    ))}
  </View>
);

const renderedItems = 5;

export const ExtractSummary = () => {
  const router = useRouter();
  const handleNavigate = () => router.navigate(`/(tabs)/transactions`);
  const transactions = useTransactionsSelect();

  const transactionsSlice = transactions.slice(0, renderedItems);
  const grouped = groupByMonthYear(transactionsSlice);
  const groupedArray = Object.entries(grouped)?.map(([title, transactions]) => ({ title, transactions }));

  return (
    <View style={style.container}>
      {!transactionsSlice.length && <Text style={style.noTransactions}>Sem transações cadastradas</Text>}

      {!!transactionsSlice.length && (
        <View style={style.list}>
          {groupedArray.map((item) => (
            <RenderSection key={item.title} item={item} />
          ))}
        </View>
      )}

      {transactions.length > renderedItems && (
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

  sectionTitle: {
    paddingVertical: 8,
    fontFamily: theme.fontFamily.inter400,
    fontSize: 12,
    lineHeight: 15,
    color: theme.colors.white,
  },
});
