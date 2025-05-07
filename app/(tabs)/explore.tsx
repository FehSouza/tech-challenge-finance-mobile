import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Explorer() {
  const router = useRouter();

  const handleLogin = () => router.replace('/(public)');

  return (
    <View style={style.container}>
      <Text style={style.text}>EXPLORER</Text>
      <Button title='Sair' onPress={handleLogin} />
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
