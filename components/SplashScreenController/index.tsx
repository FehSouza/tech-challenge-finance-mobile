import { auth } from '@/FirebaseConfig';
import { dispatchIsAuthenticated, useIsFontReadySelect } from '@/states';
import { SplashScreen } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useMemo, useState } from 'react';

SplashScreen.preventAutoHideAsync();

interface SplashScreenControllerProps {
  children: React.ReactNode;
}
export const SplashScreenController = ({ children }: SplashScreenControllerProps) => {
  const isFontReady = useIsFontReadySelect();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const isReady = useMemo(() => [isFontReady, isAuthReady].every(Boolean), [isFontReady, isAuthReady]);

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) dispatchIsAuthenticated(true);
      else dispatchIsAuthenticated(false);
      setIsAuthReady(true);
    });
    return () => {
      unSub();
    };
  }, []);

  return <>{children}</>;
};
