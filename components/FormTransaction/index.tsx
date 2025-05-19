import { CategoryTypeDictionaryValue } from '@/@types/category';
import { TransactionTypeDictionaryValue } from '@/@types/transaction';
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

  const [type, setType] = useState<TransactionTypeDictionaryValue | null>(null);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [category, setCategory] = useState<CategoryTypeDictionaryValue | null>(null);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [error, setError] = useState({ type: '', title: '', amount: '', date: '' });

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleSubmit = () => {
    setError({ type: '', title: '', amount: '', date: '' });
    if (!type) setError((prev) => ({ ...prev, type: 'Selecione o tipo da transação' }));
    if (!title) setError((prev) => ({ ...prev, title: 'Digite o título da transação' }));
    if (!amount) setError((prev) => ({ ...prev, amount: 'Digite o valor da transação' }));
    if (!date) setError((prev) => ({ ...prev, date: 'Selecione a data da transação' }));
    if (!type || !title || !amount || !date) return;

    console.log({ type, title, amount, date, category, attachment });
  };

  const handleGoBack = () => router.back();

  return (
    <View style={style.form}>
      <View style={style.wrapper}>
        <TransactionOptionsSelect typeTransaction={type} setTypeTransaction={setType} />
        {error.type && <Text style={style.messageError}>{error.type}</Text>}
      </View>

      <View style={style.wrapper}>
        <Input placeholder='Digite o título da transação' value={title} onChangeText={setTitle} />
        {error.title && <Text style={style.messageError}>{error.title}</Text>}
      </View>

      <View style={style.wrapper}>
        <Input
          placeholder='Digite o valor da transação'
          value={amount}
          onChangeText={(value) => setAmount(maskCurrency(value))}
        />
        {error.amount && <Text style={style.messageError}>{error.amount}</Text>}
      </View>

      <View style={style.wrapper}>
        <TransactionDate placeholder='Selecione a data da transação' date={date} setDate={setDate} />
        {error.date && <Text style={style.messageError}>{error.date}</Text>}
      </View>

      {!showAdvancedOptions && (
        <Button variant='outlined' onPress={() => setShowAdvancedOptions(true)}>
          Opções avançadas
        </Button>
      )}

      {showAdvancedOptions && (
        <>
          <CategoriesOptionsSelect category={category} setCategory={setCategory} />
          <Button variant='outlined'>Upload de arquivos</Button>
        </>
      )}

      <Button onPress={handleSubmit}>{id ? 'Atualizar' : 'Concluir transação'}</Button>

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
