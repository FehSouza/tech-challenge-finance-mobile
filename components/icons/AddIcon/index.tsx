import { theme } from '@/theme';
import Svg, { Path } from 'react-native-svg';

export const AddIcon = ({ color = theme.colors.gray500 }) => {
  return (
    <Svg width='25' height='24' viewBox='0 0 25 24' fill='none'>
      <Path d='M12.5 5V19M5.5 12H19.5' stroke={color} stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
    </Svg>
  );
};
