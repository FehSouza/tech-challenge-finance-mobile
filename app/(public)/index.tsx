import { ContainerKeyboardAvoiding, FormSignIn, LogoIcon } from '@/components';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  return (
    <ContainerKeyboardAvoiding>
      <SafeAreaView style={style.container}>
        <LogoIcon />
        <FormSignIn />
      </SafeAreaView>
    </ContainerKeyboardAvoiding>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 80,
  },
});
