import { theme } from '@/theme';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface ContainerKeyboardAvoidingProps {
  children: React.ReactNode;
}

export const ContainerKeyboardAvoiding = ({ children }: ContainerKeyboardAvoidingProps) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
    <KeyboardAvoidingView behavior={behavior} style={style.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={style.content} keyboardShouldPersistTaps='handled'>
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },

  content: {
    flexGrow: 1,
    alignItems: 'center',
    gap: 32,
    paddingVertical: 32,
  },
});
