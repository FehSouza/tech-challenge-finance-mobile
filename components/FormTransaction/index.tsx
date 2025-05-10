import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from '../shared';

interface FormTransactionProps {
  id?: string;
}

export const FormTransaction = ({ id }: FormTransactionProps) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  return (
    <View style={style.form}>
      <Input placeholder='Select - Tipo da transação' />
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
          <Input placeholder='Select - Categoria da transação' />
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
