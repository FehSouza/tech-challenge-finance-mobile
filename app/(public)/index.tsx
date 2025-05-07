import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => router.replace('/(tabs)/dashboard');
  const handleRegister = () => router.replace('/(public)/register');

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
