import { ContainerKeyboardAvoiding, FormSignUp, LogoIcon } from '@/components';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  return (
    <ContainerKeyboardAvoiding>
      <SafeAreaView style={style.container}>
        <LogoIcon />
        <FormSignUp />
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
