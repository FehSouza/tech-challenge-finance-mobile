import { CATEGORIES_TYPES_DICTIONARY } from '@/@types/category';
import { Transaction, TRANSACTIONS_TYPES_DICTIONARY } from '@/@types/transaction';
import { theme } from '@/theme';
import { formatCurrency } from '@/utils';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ConditionTransactionIcon } from '../icons';

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const router = useRouter();

  const { id, type: typeKey, title, value, category: categoryKey } = transaction;
  const type = TRANSACTIONS_TYPES_DICTIONARY[typeKey] ?? '';
  const category = CATEGORIES_TYPES_DICTIONARY[categoryKey];
  const negative = typeKey === 'withdraw' || typeKey === 'transfer';

  let amount = value / 100;
  if (negative) amount *= -1;
  const isOptimistic = id.startsWith('optimistic');

  const handleNavigate = () => {
    if (isOptimistic) return;
    router.navigate(`/edit-transaction/${id}`);
  };

  return (
    <TouchableOpacity
      style={[style.transaction, isOptimistic ? style.optimistic : undefined]}
      onPress={handleNavigate}
      activeOpacity={0.8}
    >
      <ConditionTransactionIcon condition={typeKey} />

      <View style={style.wrapperTitle}>
        <Text style={style.titleText}>{title}</Text>
        {category && category !== 'Sem Categoria' && <Text style={style.categoryText}>{category}</Text>}
      </View>

      <View style={style.wrapperAmount}>
        <Text style={style.amountText}>{formatCurrency(amount)}</Text>
        <Text style={[style.typeText, negative && style.typeTextNegative]}>{type}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray800,
  },

  optimistic: {
    opacity: 0.5,
  },

  wrapperTitle: {
    gap: 2,
  },

  wrapperAmount: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 2,
  },

  titleText: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 14,
    lineHeight: 17,
    color: theme.colors.white,
  },

  categoryText: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 12,
    lineHeight: 15,
    color: theme.colors.secondary,
  },

  amountText: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 14,
    lineHeight: 17,
    color: theme.colors.white,
  },

  typeText: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 12,
    lineHeight: 15,
    color: theme.colors.primary,
  },

  typeTextNegative: {
    color: theme.colors.error,
  },
});
