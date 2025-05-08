import { SplashScreenController } from '@/components/SplashScreenController';
import { dispatchIsFontReady, useIsAuthenticatedSelect } from '@/states';
import { theme } from '@/theme';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainRoutes = () => {
  const isAuthenticated = useIsAuthenticatedSelect();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name='(public)' />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name='(tabs)' />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold });

  useEffect(() => {
    dispatchIsFontReady(fontsLoaded);
  }, [fontsLoaded]);

  return (
    <SafeAreaView style={[style.container, StyleSheet.absoluteFill]}>
      <StatusBar backgroundColor={theme.colors.black} barStyle='light-content' translucent />
      <SplashScreenController>
        <MainRoutes />
      </SplashScreenController>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
});
