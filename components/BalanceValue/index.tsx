import { dispatchShowBalanceValue, useShowBalanceValue } from '@/states';
import { theme } from '@/theme';
import { formatCurrency, storageGetItem } from '@/utils';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EyeCloseIcon, EyeIcon } from '../icons';

interface BalanceValueProps {
  balance: number;
}

export const BalanceValue = ({ balance }: BalanceValueProps) => {
  const [showBalanceValue] = useShowBalanceValue();

  const handleShowValue = () => dispatchShowBalanceValue(!showBalanceValue);

  const isNegative = balance < 0;

  useEffect(() => {
    const loadShowBalanceValue = async () => {
      const value = await storageGetItem('showBalanceValue');
      if (value) dispatchShowBalanceValue(value);
    };

    loadShowBalanceValue();
  }, []);

  return (
    <View>
      <Text style={style.title}>Minha carteira</Text>

      <TouchableOpacity style={style.button} onPress={handleShowValue} activeOpacity={0.8}>
        {showBalanceValue ? <EyeIcon /> : <EyeCloseIcon />}
        <Text style={[style.text, isNegative && style.textNegative]}>
          {showBalanceValue ? formatCurrency(balance / 100) || '0,00' : '*****'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    paddingLeft: 31,
    fontFamily: theme.fontFamily.inter600,
    fontSize: 24,
    lineHeight: 28,
    color: theme.colors.white,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  text: {
    fontFamily: theme.fontFamily.inter600,
    fontSize: 24,
    lineHeight: 29,
    color: theme.colors.primary,
  },

  textNegative: {
    color: theme.colors.error,
  },
});
