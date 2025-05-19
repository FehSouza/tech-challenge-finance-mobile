import { auth } from '@/FirebaseConfig';
import { dispatchIsAuthenticated } from '@/states';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input } from '../shared';

export const FormSignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      Alert.alert('As senhas não coincidem');
      return;
    }
    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) dispatchIsAuthenticated(true);
    } catch (error: any) {
      console.log('Error creating account:', error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  

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
        secureTextEntry
        textContentType='oneTimeCode'
        keyboardType='default'
      />
      <Input
        placeholder='Confirmar senha'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        textContentType='oneTimeCode'
        keyboardType='default'
      />
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
});
