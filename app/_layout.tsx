import { theme } from '@/theme';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold });

  return (
    <SafeAreaView style={[style.container, StyleSheet.absoluteFill]}>
      <StatusBar backgroundColor={theme.colors.black} barStyle='light-content' translucent />
      {!fontsLoaded && <Text>Carregando...</Text>}
      {fontsLoaded && <Slot />}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
});
