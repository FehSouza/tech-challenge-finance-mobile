import { Button, ContainerKeyboardAvoiding, Input, LogoIcon } from '@/components';
import { dispatchIsAuthenticated } from '@/states';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const router = useRouter();

  const handleCreateAccount = () => dispatchIsAuthenticated(true);

  return (
    <ContainerKeyboardAvoiding>
      <SafeAreaView style={style.container}>
        <LogoIcon />

        <View style={style.form}>
          <Input placeholder='E-mail' />
          <Input placeholder='Senha' />
          <Input placeholder='Confirmar senha' />
          <Button onPress={handleCreateAccount}>Criar conta</Button>
          <Button variant='outlined' onPress={router.back}>
            Voltar
          </Button>
        </View>
      </SafeAreaView>
    </ContainerKeyboardAvoiding>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 80,
  },

  form: {
    gap: 16,
    paddingHorizontal: 25,
  },
});
