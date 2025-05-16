import { Button, CategoriesOptionsSelect, ContainerKeyboardAvoiding, TransactionDate } from '@/components';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Filter() {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <ContainerKeyboardAvoiding>
      <Text style={style.title}>Filtrar</Text>

      <View style={style.wrapper}>
        <Text style={style.subTitle}>Categoria</Text>
        <CategoriesOptionsSelect />
      </View>

      <View style={style.wrapper}>
        <Text style={style.subTitle}>Data</Text>
        <TransactionDate placeholder='Selecione a data inicial' />
        <TransactionDate placeholder='Selecione a data final' />
      </View>

      <View style={style.buttonsContainer}>
        <View style={style.button}>
          <Button variant='outlined'>Limpar</Button>
        </View>
        <View style={style.button}>
          <Button>Filtrar</Button>
        </View>
      </View>

      <View style={style.wrapper}>
        <Button variant='input' onPress={handleGoBack}>
          Cancelar
        </Button>
      </View>
    </ContainerKeyboardAvoiding>
  );
}

const style = StyleSheet.create({
  title: {
    width: '100%',
    paddingHorizontal: 25,
    fontFamily: theme.fontFamily.inter600,
    fontSize: 24,
    lineHeight: 28,
    color: theme.colors.white,
  },

  wrapper: {
    width: '100%',
    paddingHorizontal: 25,
    marginTop: 18,
    gap: 16,
  },

  subTitle: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 12,
    lineHeight: 15,
    color: theme.colors.white,
  },

  buttonsContainer: {
    paddingHorizontal: 25,
    marginTop: 'auto',
    flexDirection: 'row',
    gap: 25,
    paddingTop: 48,
    justifyContent: 'space-between',
  },

  button: {
    flex: 1,
  },
});
