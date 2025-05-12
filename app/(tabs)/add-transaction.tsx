import { ContainerKeyboardAvoiding, FormTransaction } from '@/components';
import { theme } from '@/theme';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function AddTransaction() {
  return (
    <ContainerKeyboardAvoiding>
      <SafeAreaView style={style.container}>
        <Text style={style.title}>Nova transação</Text>
        <FormTransaction />
      </SafeAreaView>
    </ContainerKeyboardAvoiding>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 32,
    marginVertical: 32,
  },

  title: {
    width: '100%',
    fontFamily: theme.fontFamily.inter600,
    fontSize: 24,
    lineHeight: 28,
    color: theme.colors.white,
    textAlign: 'left',
    paddingHorizontal: 25,
  },
});
