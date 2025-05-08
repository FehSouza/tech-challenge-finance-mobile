import { dispatchIsAuthenticated } from '@/states';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => dispatchIsAuthenticated(true);
  const handleRegister = () => router.navigate('/register');

  return (
    <View style={style.container}>
      <Text style={style.text}>LOGIN</Text>
      <Button title='Entrar' onPress={handleLogin} />
      <Button title='Criar conta' onPress={handleRegister} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },

  text: {
    color: theme.colors.white,
  },
});
