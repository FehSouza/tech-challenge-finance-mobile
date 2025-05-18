import { auth } from '@/FirebaseConfig';
import { dispatchIsAuthenticated } from '@/states';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from '../shared';

export const FormSignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) return setError('As senhas não coincidem');
    try {
      setLoading(true);
      if (!email || !password || !confirmPassword) return setError('Preencha todos os campos');
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) dispatchIsAuthenticated(true);
    } catch (error: any) {
      console.log('Error creating account:', error);
      if (error.message.includes('auth/invalid-email')) return setError('E-mail inválido');
      if (error.message.includes('auth/weak-password')) return setError('A senha deve ter pelo menos 6 caracteres');
      if (error.message.includes('auth/email-already-in-use')) return setError('E-mail ja cadastrado');
      setError('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError('');
  };

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
        secureTextEntry
        textContentType='oneTimeCode'
        keyboardType='default'
        color={!!error ? 'error' : 'primary'}
      />
      <Input
        placeholder='Confirmar senha'
        value={confirmPassword}
        onChangeText={(value) => onChange(setConfirmPassword, value)}
        secureTextEntry
        textContentType='oneTimeCode'
        keyboardType='default'
        color={!!error ? 'error' : 'primary'}
      />
      {!!error && <Text style={style.messageError}>{error}</Text>}
      <Button onPress={handleCreateAccount} loading={loading}>
        Criar conta
      </Button>
      <Button variant='outlined' onPress={router.back} loading={loading}>
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

  messageError: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 14,
    lineHeight: 16,
    color: theme.colors.error,
  },
});
