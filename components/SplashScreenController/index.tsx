import { useIsFontReadySelect } from '@/states';
import { SplashScreen } from 'expo-router';
import { useEffect, useMemo } from 'react';

SplashScreen.preventAutoHideAsync();

interface SplashScreenControllerProps {
  children: React.ReactNode;
}
export const SplashScreenController = ({ children }: SplashScreenControllerProps) => {
  const isFontReady = useIsFontReadySelect();
  const isReady = useMemo(() => [isFontReady].every(Boolean), [isFontReady]);

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isFontReady]);

  return <>{children}</>;
};
