import { BalanceValue, Button, ContainerKeyboardAvoiding, ExtractSummary, Filter, Search } from '@/components';
import { auth } from '@/FirebaseConfig';
import { addTransaction, useInitializeTransactions } from '@/hooks';
import { TRANSACTIONS_MOCK } from '@/mock';
import { useTransactionsSelect } from '@/states';
import { theme } from '@/theme';
import { balance } from '@/utils';
import { signOut } from 'firebase/auth';
import { StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  useInitializeTransactions();
  const transactions = useTransactionsSelect();
  const balanceValue = balance(TRANSACTIONS_MOCK);
  console.log('transactions', transactions);

  const handleSignOut = async () => await signOut(auth);

  const handleAdd = async () => {
    await addTransaction({
      type: 'transfer',
      date: '13/05/2025',
      value: 5000,
      category: 'other expenses',
      title: 'Presente Fulano',
      attachment: null,
    });
  };

  return (
    <ContainerKeyboardAvoiding>
      <BalanceValue balance={balanceValue} />

      <Text style={style.title}>Últimas transações {transactions.length}</Text>

      <View style={style.controlsContainer}>
        <Search />
        <Filter />
      </View>

      <ExtractSummary />
      <Button variant='outlined' onPress={handleSignOut}>
        Logout
      </Button>
      <Button variant='outlined' onPress={handleAdd}>
        add
      </Button>
    </ContainerKeyboardAvoiding>
  );
}

const style = StyleSheet.create({
  title: {
    width: '100%',
    marginTop: 32,
    paddingHorizontal: 25,
    fontFamily: theme.fontFamily.inter600,
    fontSize: 24,
    lineHeight: 28,
    color: theme.colors.white,
  },

  controlsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
    paddingHorizontal: 25,
  },
});
