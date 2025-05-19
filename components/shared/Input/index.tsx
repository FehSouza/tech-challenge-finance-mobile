import { theme } from '@/theme';
import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  placeholder: string;
  color?: 'primary' | 'error';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = ({ placeholder, color = 'primary', iconLeft, iconRight, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[style.container, style[color], isFocused && color !== 'error' && style.focused]}>
      {!!iconLeft && <View style={style.icon}>{iconLeft}</View>}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray400}
        style={style.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        textContentType='none'
        keyboardType='default'
        autoComplete='off'
        {...props}
      />

      {!!iconRight && <View style={style.icon}>{iconRight}</View>}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.gray800,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },

  primary: {
    borderColor: theme.colors.gray800,
  },

  error: {
    borderColor: theme.colors.error,
  },

  focused: {
    borderColor: theme.colors.secondary,
  },

  icon: {
    width: 16,
    height: 16,
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  input: {
    height: '100%',
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontFamily: theme.fontFamily.inter400,
    fontSize: 16,
    lineHeight: 18,
    color: theme.colors.white,
  },
});
