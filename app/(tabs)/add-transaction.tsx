import { ContainerKeyboardAvoiding, FormTransaction } from '@/components';
import { theme } from '@/theme';
import { StyleSheet, Text } from 'react-native';

export default function AddTransaction() {
  return (
    <ContainerKeyboardAvoiding>
      <Text style={style.title}>Nova transação</Text>
      <FormTransaction />
    </ContainerKeyboardAvoiding>
  );
}

const style = StyleSheet.create({
  title: {
    width: '100%',
    fontFamily: theme.fontFamily.inter600,
    fontSize: 24,
    lineHeight: 28,
    color: theme.colors.white,
    textAlign: 'left',
    paddingHorizontal: 25,
    marginBottom: 32,
  },
});
