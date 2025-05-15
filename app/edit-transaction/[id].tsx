import { ButtonIcon, ContainerKeyboardAvoiding, FormTransaction, TrashIcon } from '@/components';
import { theme } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function EditTransaction() {
  const { id } = useLocalSearchParams();
  if (!id) return null;

  return (
    <ContainerKeyboardAvoiding>
      <View style={style.container}>
        <Text style={style.title}>Editar transação</Text>

        <ButtonIcon color='error'>
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
  },

  title: {
    fontFamily: theme.fontFamily.inter600,
    fontSize: 24,
    lineHeight: 28,
    color: theme.colors.white,
    textAlign: 'left',
  },
});
