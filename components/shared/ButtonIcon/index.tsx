import { theme } from '@/theme';
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

interface ButtonIconProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'texted' | 'outlined' | 'contained' | 'input';
  color?: 'primary' | 'secondary' | 'error';
  styles?: StyleProp<ViewStyle>;
}

export const ButtonIcon = ({
  children,
  variant = 'contained',
  color = 'primary',
  styles,
  ...props
}: ButtonIconProps) => {
  const buttonStyle = [style.base, style[`${variant}_${color}`]];

  return (
    <TouchableOpacity style={[buttonStyle, styles]} activeOpacity={0.8} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  base: {
    minWidth: 40,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 6,
  },

  // Cores por variante
  contained_primary: {
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  contained_secondary: {
    backgroundColor: theme.colors.secondary,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
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
  outlined_secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.secondary,
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
  texted_secondary: {
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
  input_secondary: {
    backgroundColor: theme.colors.secondary,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
  },
  input_error: {
    backgroundColor: theme.colors.error,
    borderWidth: 2,
    borderColor: theme.colors.error,
  },
});
