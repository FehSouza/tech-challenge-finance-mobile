import { dispatchIsAuthenticated } from '@/states';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from '../shared';

export const FormSignIn = () => {
  const router = useRouter();

  const handleLogin = () => dispatchIsAuthenticated(true);
  const handleRegister = () => router.navigate('/register');

  return (
    <View style={style.form}>
      <Input placeholder='E-mail' />
      <Input placeholder='Senha' />
      <Button onPress={handleLogin}>Entrar</Button>
      <Button variant='outlined' onPress={handleRegister}>
        Criar conta
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    gap: 16,
    paddingHorizontal: 25,
  },
});
