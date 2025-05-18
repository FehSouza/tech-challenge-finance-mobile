import { auth } from '@/FirebaseConfig';
import { dispatchIsAuthenticated } from '@/states';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from '../shared';

export const FormSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) dispatchIsAuthenticated(true);
    } catch (error: any) {
      console.log('Error signing in with email and password:', error);
      alert('Sign in failed: ' + error.message);
    }finally{
      setLoading(false);
    }
  };
  const handleRegister = () => router.navigate('/register');

  return (
    <View style={style.form}>
      <Input
        placeholder='E-mail'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <Input
        placeholder='Senha'
        value={password}
        onChangeText={setPassword}
        textContentType='password'
        secureTextEntry
      />
      <Button onPress={handleLogin} loading={loading}>Entrar</Button>
      <Button variant='outlined' onPress={handleRegister} loading={loading}>
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
