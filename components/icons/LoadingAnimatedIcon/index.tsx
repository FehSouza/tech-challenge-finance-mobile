import { theme } from '@/theme';
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { LoadingIcon } from '../LoadingIcon';

interface LoadingAnimatedIconProps {
  color: keyof typeof theme.colors;
}

export const LoadingAnimatedIcon = ({ color }: LoadingAnimatedIconProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinValue, { toValue: 1, duration: 1000, easing: Easing.linear, useNativeDriver: true })
    );

    spin.start();

    return () => spin.stop();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <LoadingIcon color={color} />
    </Animated.View>
  );
};
