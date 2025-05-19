import { auth } from '@/FirebaseConfig';
import { dispatchIsAuthenticated, dispatchUser, useIsFontReadySelect } from '@/states';
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
  console.log('isReady', isReady);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      dispatchUser(user);
      dispatchIsAuthenticated(!!user);
      setIsAuthReady(true);
      console.log('User state changed:', user);
    });

    return unSub;
  }, []);

  return <>{children}</>;
};
