import { theme } from '@/theme';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: theme.colors.green600,
        tabBarInactiveBackgroundColor: theme.colors.gray800,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: theme.colors.gray800,
          height: 50,
        },
        tabBarItemStyle: {
          height: 42,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 4,
        },
      }}
    >
      <Tabs.Screen name='dashboard' options={{ title: '', tabBarIcon: () => null }} />
      <Tabs.Screen name='explore' options={{ title: '', tabBarIcon: () => null }} />
    </Tabs>
  );
}
