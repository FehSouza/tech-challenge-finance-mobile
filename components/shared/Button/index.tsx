import { theme } from '@/theme';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'texted' | 'outlined' | 'contained';
  color?: 'primary' | 'error';
}

export const Button = ({ variant = 'contained', color = 'primary', children, ...props }: ButtonProps) => {
  const buttonStyle = [style.base, style[`${variant}_${color}`]];
  const textStyle = [style.textBase, style[`text_${variant}_${color}`]];

  return (
    <TouchableOpacity style={buttonStyle} activeOpacity={0.8} {...props}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  base: {
    width: 'auto',
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  textBase: {
    fontFamily: theme.fontFamily.inter600,
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
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
});
