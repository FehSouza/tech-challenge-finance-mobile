import { ButtonIcon, ContainerKeyboardAvoiding, FormTransaction, TrashIcon } from '@/components';
import { deleteTransaction } from '@/hooks';
import { theme } from '@/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function EditTransaction() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  if (!id) return null;

  const handleDeleteTransaction = () => {
    if (Array.isArray(id)) {
      console.error('ID should not be an array');
      return;
    }
    deleteTransaction(id);
    router.back();
  };

  return (
    <ContainerKeyboardAvoiding>
      <View style={style.container}>
        <Text style={style.title}>Editar transação</Text>

        <ButtonIcon color='error' onPress={handleDeleteTransaction}>
          <TrashIcon />
        </ButtonIcon>
      </View>

      <FormTransaction id={Array.isArray(id) ? id[0] : id} />
    </ContainerKeyboardAvoiding>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 25,
    marginBottom: 32,
  },

  title: {
    fontFamily: theme.fontFamily.inter600,
    fontSize: 24,
    lineHeight: 28,
    color: theme.colors.white,
    textAlign: 'left',
  },
});
