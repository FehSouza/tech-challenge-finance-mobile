import { TransactionItem } from '@/@types/transaction';
import { theme } from '@/theme';
import { StyleSheet, Text, View } from 'react-native';
import { TransactionCard } from '../TransactionCard';

interface TransactionCardGroupProps {
  item: { title: string; transactions: TransactionItem[] };
}

export const TransactionCardGroup = ({ item }: TransactionCardGroupProps) => (
  <View>
    <Text style={style.sectionTitle}>{item.title}</Text>
    {item.transactions.map((transaction) => (
      <TransactionCard key={transaction.id} transaction={transaction} />
    ))}
  </View>
);

const style = StyleSheet.create({
  sectionTitle: {
    paddingVertical: 8,
    fontFamily: theme.fontFamily.inter400,
    fontSize: 12,
    lineHeight: 15,
    color: theme.colors.white,
  },
});
