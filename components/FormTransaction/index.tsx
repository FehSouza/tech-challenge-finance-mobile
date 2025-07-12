import {
  CATEGORIES_TYPES_DICTIONARY,
  CATEGORIES_TYPES_DICTIONARY_MAP,
  CategoryTypeDictionaryValue,
} from '@/@types/category';
import {
  TRANSACTIONS_TYPES_DICTIONARY,
  TRANSACTIONS_TYPES_DICTIONARY_MAP,
  TransactionTypeDictionaryValue,
} from '@/@types/transaction';
import { addNewTransaction, updateTransaction } from '@/services';
import { useTransactionsSelect } from '@/states';
import { theme } from '@/theme';
import { maskCurrency, undoMaskCurrency } from '@/utils';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CategoriesOptionsSelect } from '../CategoriesOptionsSelect';
import { Button, Input } from '../shared';
import { TransactionDate } from '../TransactionDate';
import { TransactionOptionsSelect } from '../TransactionOptionsSelect';

const useFormTransaction = (id?: string) => {
  const router = useRouter();
  const navigation = useNavigation();
  const transactions = useTransactionsSelect();

  const transaction = useMemo(() => {
    if (!id) return null;
    const transaction = transactions.find((transaction) => transaction.id === id);
    if (!transaction) return null;
    return {
      ...transaction,
      type: TRANSACTIONS_TYPES_DICTIONARY[transaction.type],
      category: CATEGORIES_TYPES_DICTIONARY[transaction.category],
      date: new Date(transaction.date),
      value: maskCurrency(transaction.value.toString()),
    };
  }, [id, transactions]);

  const [type, setType] = useState<TransactionTypeDictionaryValue | null>(transaction?.type ?? null);
  const [title, setTitle] = useState(transaction?.title ?? '');
  const [amount, setAmount] = useState(transaction?.value ?? '');
  const [date, setDate] = useState<Date>(transaction?.date ?? new Date());
  const [category, setCategory] = useState<CategoryTypeDictionaryValue>(transaction?.category ?? 'Sem Categoria');
  const [attachment, setAttachment] = useState<string | null>(transaction?.attachment ?? null);
  const [error, setError] = useState({ type: '', title: '', amount: '', date: '' });
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(!!transaction?.attachment);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => setShowAdvancedOptions(false));
    return unsubscribe;
  }, [navigation]);

  const clearForm = () => {
    setType(null);
    setTitle('');
    setAmount('');
    setDate(new Date());
    setCategory('Sem Categoria');
    setAttachment(null);
    setError({ type: '', title: '', amount: '', date: '' });
  };

  const handleSubmit = async () => {
    setError({ type: '', title: '', amount: '', date: '' });
    if (!type) setError((prev) => ({ ...prev, type: 'Selecione o tipo da transação' }));
    if (!title) setError((prev) => ({ ...prev, title: 'Digite o título da transação' }));
    if (!amount) setError((prev) => ({ ...prev, amount: 'Digite o valor da transação' }));
    if (!date) setError((prev) => ({ ...prev, date: 'Selecione a data da transação' }));
    if (!type || !title || !amount || !date) return;
    const transaction = {
      type: TRANSACTIONS_TYPES_DICTIONARY_MAP[type],
      title,
      value: Number(undoMaskCurrency(amount)),
      date: date.toISOString(),
      category: CATEGORIES_TYPES_DICTIONARY_MAP[category],
      attachment,
    };

    if (!id) addNewTransaction(transaction);
    if (id) updateTransaction(id, { ...transaction, id });
    clearForm();
    router.back();
  };

  const handleSetDate = (newDate: Date | undefined) => {
    if (!newDate) return setError((prev) => ({ ...prev, date: 'Selecione a data da transação' }));
    setDate(newDate);
    setError((prev) => ({ ...prev, date: '' }));
  };

  const handleGoBack = () => router.back();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setAttachment(imageUri);
    }
  };

  return {
    type,
    title,
    amount,
    date,
    category,
    attachment,
    error,
    showAdvancedOptions,
    setType,
    setTitle,
    setAmount,
    handleSetDate,
    setCategory,
    setAttachment,
    setError,
    setShowAdvancedOptions,
    handleSubmit,
    handleGoBack,
    pickImage,
  };
};

interface FormTransactionProps {
  id?: string;
}

export const FormTransaction = ({ id }: FormTransactionProps) => {
  const {
    type,
    title,
    amount,
    date,
    category,
    attachment,
    error,
    showAdvancedOptions,
    setType,
    setTitle,
    setAmount,
    handleSetDate,
    setCategory,
    setAttachment,
    setShowAdvancedOptions,
    handleSubmit,
    handleGoBack,
    pickImage,
  } = useFormTransaction(id);
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
          keyboardType='numeric'
        />
        {error.amount && <Text style={style.messageError}>{error.amount}</Text>}
      </View>

      <View style={style.wrapper}>
        <TransactionDate placeholder='Selecione a data da transação' date={date} setDate={handleSetDate} />
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
          {!!attachment && (
            <View style={{ alignItems: 'center', marginVertical: 16 }}>
              <Pressable onPress={() => setAttachment(null)}>
                <Image source={{ uri: attachment }} style={{ width: 200, height: 200 }} />
              </Pressable>
            </View>
          )}
          <Button variant='outlined' onPress={pickImage}>
            {attachment ? 'Alterar imagem' : 'Adicionar imagem'}
          </Button>
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
