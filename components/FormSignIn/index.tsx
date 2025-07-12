import { auth } from '@/FirebaseConfig';
import { dispatchIsAuthenticated } from '@/states';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from '../shared';

const useFormSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!email || !password) return setError('Preencha todos os campos');
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) dispatchIsAuthenticated(true);
    } catch (error: any) {
      console.log('Error signing in with email and password:', error);
      if (error.message.includes('auth/invalid-email')) return setError('E-mail inválido');
      if (error.message.includes('auth/wrong-password')) return setError('Senha incorreta');
      if (error.message.includes('auth/user-not-found')) return setError('Usuário não encontrado');
      setError('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError('');
  };

  const handleRegister = () => router.navigate('/register');

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleLogin,
    onChange,
    handleRegister,
  };
};

export const FormSignIn = () => {
  const { email, password, error, loading, setEmail, setPassword, handleLogin, onChange, handleRegister } =
    useFormSignIn();

  return (
    <View style={style.form}>
      <Input
        placeholder='E-mail'
        value={email}
        onChangeText={(value) => onChange(setEmail, value)}
        keyboardType='email-address'
        autoCapitalize='none'
        color={!!error ? 'error' : 'primary'}
      />
      <Input
        placeholder='Senha'
        value={password}
        onChangeText={(value) => onChange(setPassword, value)}
        textContentType='password'
        secureTextEntry
        color={!!error ? 'error' : 'primary'}
      />
      {!!error && <Text style={style.messageError}>{error}</Text>}
      <Button onPress={handleLogin} loading={loading}>
        Entrar
      </Button>
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

  messageError: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 14,
    lineHeight: 16,
    color: theme.colors.error,
  },
});
