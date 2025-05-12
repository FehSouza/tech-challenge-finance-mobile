import { theme } from '@/theme';
import { StyleProp, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'texted' | 'outlined' | 'contained' | 'input';
  color?: 'primary' | 'error';
  textAlign?: 'left' | 'center' | 'right';
  textActive?: boolean;
  styles?: StyleProp<ViewStyle>;
}

export const Button = ({
  variant = 'contained',
  color = 'primary',
  textAlign = 'center',
  textActive,
  styles,
  children,
  ...props
}: ButtonProps) => {
  const buttonStyle = [style.base, style[`${variant}_${color}`]];

  const textStyle = [
    style.textBase,
    style[`text_${variant}_${color}`],
    style[`text_${textAlign}`],
    textActive && style.textActive,
  ];

  return (
    <TouchableOpacity style={[buttonStyle, styles]} activeOpacity={0.8} {...props}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  base: {
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  textBase: {
    width: '100%',
    fontFamily: theme.fontFamily.inter600,
    fontSize: 16,
    lineHeight: 18,
  },

  // Cores por variante
  contained_primary: {
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  contained_error: {
    backgroundColor: theme.colors.error,
    borderWidth: 2,
    borderColor: theme.colors.error,
  },

  outlined_primary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  outlined_error: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.error,
  },

  texted_primary: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  texted_error: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  input_primary: {
    backgroundColor: theme.colors.gray800,
    borderWidth: 2,
    borderColor: theme.colors.gray800,
  },
  input_error: {
    backgroundColor: theme.colors.error,
    borderWidth: 2,
    borderColor: theme.colors.error,
  },

  // Cores do texto por variante
  text_contained_primary: {
    color: theme.colors.white,
  },
  text_contained_error: {
    color: theme.colors.white,
  },

  text_outlined_primary: {
    color: theme.colors.primary,
  },
  text_outlined_error: {
    color: theme.colors.error,
  },

  text_texted_primary: {
    color: theme.colors.primary,
  },
  text_texted_error: {
    color: theme.colors.error,
  },

  text_input_primary: {
    fontFamily: theme.fontFamily.inter400,
    color: theme.colors.gray400,
  },
  text_input_error: {
    fontFamily: theme.fontFamily.inter400,
    color: theme.colors.error,
  },

  // Alinhamentos
  text_left: {
    textAlign: 'left',
  },
  text_center: {
    textAlign: 'center',
  },
  text_right: {
    textAlign: 'right',
  },

  // Texto ativo
  textActive: {
    color: theme.colors.white,
  },
});
