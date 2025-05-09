import { theme } from '@/theme';
import Svg, { Path } from 'react-native-svg';

export const TransactionsIcon = ({ color = theme.colors.gray500 }) => {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <Path d='M4 4H10V12H4V4Z' stroke={color} stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
      <Path d='M4 16H10V20H4V16Z' stroke={color} stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
      <Path d='M14 12H20V20H14V12Z' stroke={color} stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
      <Path d='M14 4H20V8H14V4Z' stroke={color} stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
    </Svg>
  );
};
