import { dispatchIsAuthenticated } from '@/states';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from '../shared';

export const FormSignUp = () => {
  const router = useRouter();

  const handleCreateAccount = () => dispatchIsAuthenticated(true);

  return (
    <View style={style.form}>
      <Input placeholder='E-mail' />
      <Input placeholder='Senha' />
      <Input placeholder='Confirmar senha' />
      <Button onPress={handleCreateAccount}>Criar conta</Button>
      <Button variant='outlined' onPress={router.back}>
        Voltar
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
