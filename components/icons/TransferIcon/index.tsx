import Svg, { Path } from 'react-native-svg';

export const TransferIcon = () => {
  return (
    <Svg width='34' height='34' viewBox='0 0 34 34' fill='none'>
      <Path
        d='M30 0H4C1.79086 0 0 1.79086 0 4V30C0 32.2091 1.79086 34 4 34H30C32.2091 34 34 32.2091 34 30V4C34 1.79086 32.2091 0 30 0Z'
        fill='#181818'
      />
      <Path
        d='M19 11.875L21.5 14.375M21.5 14.375L19 16.875M21.5 14.375H15.25M14 18.125L11.5 20.625M11.5 20.625L14 23.125M11.5 20.625H17.125'
        stroke='#3400D0'
        stroke-width='1.25'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </Svg>
  );
};
