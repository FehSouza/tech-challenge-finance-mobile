import { theme } from '@/theme';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonIconProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'texted' | 'outlined' | 'contained' | 'input';
  color?: 'primary' | 'secondary' | 'error';
}

export const ButtonIcon = ({ variant = 'contained', color = 'primary', children, ...props }: ButtonIconProps) => {
  const buttonStyle = [style.base, style[`${variant}_${color}`]];

  return (
    <TouchableOpacity style={buttonStyle} activeOpacity={0.8} {...props}>
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
    backgroundColor: theme.colors.gray600,
    borderWidth: 2,
    borderColor: theme.colors.gray600,
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
    borderColor: theme.colors.gray600,
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
    backgroundColor: theme.colors.gray600,
    borderWidth: 2,
    borderColor: theme.colors.gray600,
  },
  input_error: {
    backgroundColor: theme.colors.error,
    borderWidth: 2,
    borderColor: theme.colors.error,
  },
});
