import Svg, { Path } from 'react-native-svg';

export const FilterIcon = () => {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <Path
        d='M4 6H13M4 12H11M4 18H11M15 15L18 18M18 18L21 15M18 18V6'
        stroke='#F7FAFC'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
};
