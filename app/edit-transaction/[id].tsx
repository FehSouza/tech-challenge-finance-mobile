import { ContainerKeyboardAvoiding, FormTransaction } from '@/components';
import { theme } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

export default function EditTransaction() {
  const { id } = useLocalSearchParams();
  if (!id) return null;

  return (
    <ContainerKeyboardAvoiding>
      <Text style={style.title}>Editar transação</Text>
      <FormTransaction id={Array.isArray(id) ? id[0] : id} />
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
  },
});
