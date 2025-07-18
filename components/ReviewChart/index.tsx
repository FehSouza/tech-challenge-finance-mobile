import { TransactionItem, TRANSACTIONS_COLORS, TRANSACTIONS_TYPES_DICTIONARY, TransactionType } from '@/@types/transaction';
import { theme } from '@/theme';
import { balance, formatCurrency } from '@/utils';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

interface ReviewChartProps {
  transactions: TransactionItem[];
}

interface DataProps {
  value: number;
  name: string;
  color: string;
}

const getChartData = (transactions: TransactionItem[]): DataProps[] => {
  const values = transactions.reduce((acc, transaction) => {
    const type = transaction.type;
    const value = transaction.value / 100;

    if (!acc[type]) return { ...acc, [type]: { name: TRANSACTIONS_TYPES_DICTIONARY[type], type, value } };
    return { ...acc, [type]: { ...acc[type], value: acc[type].value + value } };
  }, {} as { [key: string]: { name: string; type: TransactionType; value: number } });

  return Object.values(values).map((entry) => ({
    value: entry.value,
    name: entry.name,
    color: TRANSACTIONS_COLORS[entry.type] ?? theme.colors.primary,
  }));
};

const LegendItem = ({ item }: { item: DataProps }) => {
  const name = item.name;
  const value = item.value;
  const color = item.color;

  return (
    <View style={style.legendItem}>
      <View style={[style.colorBox, { backgroundColor: color }]} />
      <Text style={style.legendText}>
        {name}: {formatCurrency(value)}
      </Text>
    </View>
  );
};

export const ReviewChart = ({ transactions }: ReviewChartProps) => {
  const data = getChartData(transactions);
  if (!data.length) return null;

  const balanceValue = balance(transactions);

  return (
    <View style={style.container}>
      <Text style={style.title}>Valores por Tipo de Transação</Text>

      <PieChart
        data={data}
        donut
        radius={100}
        innerRadius={60}
        innerCircleColor={theme.colors.black}
        centerLabelComponent={() => <Text style={style.label}>{formatCurrency(balanceValue / 100)}</Text>}
      />

      <View style={style.legendContainer}>
        {data.map((item, i) => (
          <LegendItem key={i} item={item} />
        ))}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 25,
  },

  title: {
    marginBottom: 16,
    fontFamily: theme.fontFamily.inter600,
    fontSize: 14,
    lineHeight: 17,
    color: theme.colors.white,
  },

  label: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 12,
    lineHeight: 15,
    color: theme.colors.secondary,
  },

  legendContainer: {
    marginTop: 16,
    gap: 4,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  colorBox: {
    width: 12,
    height: 12,
    borderRadius: 8,
  },

  legendText: {
    marginLeft: 4,
    fontFamily: theme.fontFamily.inter400,
    fontSize: 12,
    lineHeight: 15,
    color: theme.colors.secondary,
  },
});
