import { Button, ContainerKeyboardAvoiding, Input, LogoIcon } from '@/components';
import { dispatchIsAuthenticated } from '@/states';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => dispatchIsAuthenticated(true);
  const handleRegister = () => router.navigate('/register');

  return (
    <ContainerKeyboardAvoiding>
      <SafeAreaView style={style.container}>
        <LogoIcon />

        <View style={style.form}>
          <Input placeholder='E-mail' />
          <Input placeholder='Senha' />
          <Button onPress={handleLogin}>Entrar</Button>
          <Button variant='outlined' onPress={handleRegister}>
            Criar conta
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
