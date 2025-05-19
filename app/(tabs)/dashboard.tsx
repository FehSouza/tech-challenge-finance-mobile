import {
  BalanceValue,
  ButtonIcon,
  ContainerKeyboardAvoiding,
  ExtractSummary,
  Filter,
  PersonIcon,
  Search,
} from '@/components';
import { useInitializeTransactions } from '@/hooks';
import { useTransactionsSelect } from '@/states';
import { theme } from '@/theme';
import { balance } from '@/utils';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  const router = useRouter();
  const transactions = useTransactionsSelect();
  const balanceValue = balance(transactions);
  useInitializeTransactions();

  const handleNavigate = () => router.navigate(`/account`);

  return (
    <ContainerKeyboardAvoiding>
      <View style={style.balanceContainer}>
        <BalanceValue balance={balanceValue} />

        <ButtonIcon variant='input' styles={{ height: 40 }} onPress={handleNavigate}>
          <PersonIcon />
        </ButtonIcon>
      </View>

      <Text style={style.title}>Últimas transações</Text>

      <View style={style.controlsContainer}>
        <Search />
        <Filter />
      </View>

      <ExtractSummary />
    </ContainerKeyboardAvoiding>
  );
}

const style = StyleSheet.create({
  balanceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 25,
  },

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
