import { theme } from '@/theme';
import { maskCurrency } from '@/utils';
import { useRouter } from 'expo-router';
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
  const router = useRouter();
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [amount, setAmount] = useState('');

  const handleGoBack = () => router.back();

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
        <TransactionDate placeholder='Selecione a data da transação' />
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

      {id && (
        <Button variant='input' onPress={handleGoBack}>
          Cancelar
        </Button>
      )}
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
