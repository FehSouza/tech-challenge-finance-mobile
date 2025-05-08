import { dispatchIsAuthenticated } from '@/states';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Register() {
  const router = useRouter();
  const handleCreateAccount = () => dispatchIsAuthenticated(true);

  return (
    <View style={style.container}>
      <Text style={style.text}>REGISTRO</Text>
      <Button title='Criar conta' onPress={handleCreateAccount} />
      <Button title='Voltar' onPress={router.back} />
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
