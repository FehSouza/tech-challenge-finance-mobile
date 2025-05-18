import { Button } from '@/components';
import { auth } from '@/FirebaseConfig';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { StyleSheet, Text, View } from 'react-native';

export default function Account() {
  const router = useRouter();

  const handleGoBack = () => router.back();
  const handleSignOut = async () => await signOut(auth);

  return (
    <View style={style.container}>
      <Text style={style.title}>Minha conta</Text>

      <Text style={style.text}>Seja bem-vindo, {auth.currentUser?.displayName || auth.currentUser?.email}!</Text>

      <Text style={style.text}>Página em desenvolvimento. Em breve, novidades por aqui!</Text>

      <View style={style.controlsContainer}>
        <Button onPress={handleGoBack}>Voltar para o dashboard</Button>

        <Button variant='input' onPress={handleSignOut}>
          Logout
        </Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    paddingTop: 32,
  },

  title: {
    paddingHorizontal: 25,
    fontFamily: theme.fontFamily.inter600,
    fontSize: 24,
    lineHeight: 28,
    color: theme.colors.white,
  },

  text: {
    marginTop: 32,
    paddingHorizontal: 25,
    fontFamily: theme.fontFamily.inter400,
    fontSize: 14,
    lineHeight: 17,
    color: theme.colors.white,
  },

  controlsContainer: {
    gap: 16,
    marginTop: 32,
    paddingHorizontal: 25,
  },
});
