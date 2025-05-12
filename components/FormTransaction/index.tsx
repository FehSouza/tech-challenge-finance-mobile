import { theme } from '@/theme';
import { maskCurrency } from '@/utils';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CategoriesOptionsSelect } from '../CategoriesOptionsSelect';
import { Button, Input } from '../shared';
import { TransactionDate } from '../TransactionDate';
import { TransactionOptionsSelect } from '../TransactionOptionsSelect';

interface FormTransactionProps {
  id?: string;
}

export const FormTransaction = ({ id }: FormTransactionProps) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [amount, setAmount] = useState('');

  return (
    <View style={style.form}>
      <View style={style.wrapper}>
        <TransactionOptionsSelect />
        <Text style={style.messageError}>Mensagem de erro</Text>
      </View>

      <View style={style.wrapper}>
        <Input placeholder='Digite o título da transação' />
        <Text style={style.messageError}>Mensagem de erro</Text>
      </View>

      <View style={style.wrapper}>
        <Input
          placeholder='Digite o valor da transação'
          value={amount}
          onChangeText={(value) => setAmount(maskCurrency(value))}
        />
        <Text style={style.messageError}>Mensagem de erro</Text>
      </View>

      <View style={style.wrapper}>
        <TransactionDate />
        <Text style={style.messageError}>Mensagem de erro</Text>
      </View>

      {!showAdvancedOptions && (
        <Button variant='outlined' onPress={() => setShowAdvancedOptions(true)}>
          Opções avançadas
        </Button>
      )}

      {showAdvancedOptions && (
        <>
          <CategoriesOptionsSelect />
          <Button variant='outlined'>Upload de arquivos</Button>
        </>
      )}

      <Button>{id ? 'Atualizar' : 'Concluir transação'}</Button>
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    width: '100%',
    gap: 16,
    paddingHorizontal: 25,
  },

  wrapper: {
    gap: 8,
  },

  messageError: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 14,
    lineHeight: 16,
    color: theme.colors.error,
  },
});
