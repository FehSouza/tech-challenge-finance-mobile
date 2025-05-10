import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CategoriesOptionsSelect } from '../CategoriesOptionsSelect';
import { Button, Input } from '../shared';
import { TransactionOptionsSelect } from '../TransactionOptionsSelect';

interface FormTransactionProps {
  id?: string;
}

export const FormTransaction = ({ id }: FormTransactionProps) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  return (
    <View style={style.form}>
      <TransactionOptionsSelect />
      <Input placeholder='Digite o título da transação' />
      <Input placeholder='Digite o valor da transação' />
      <Input placeholder='Data da transação' />

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
    gap: 16,
    paddingHorizontal: 25,
  },
});
