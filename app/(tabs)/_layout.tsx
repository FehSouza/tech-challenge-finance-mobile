import { AddIcon, HomeIcon, TransactionsIcon } from '@/components';
import { theme } from '@/theme';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabsLayout() {
  const isOs = Platform.OS === 'ios';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: isOs ? 75 : 50,
          paddingTop: 6,
          backgroundColor: theme.colors.gray800,
          borderTopWidth: 0,
        },
        tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' },
        tabBarLabel: () => null,
      }}
    >
      <Tabs.Screen
        name='dashboard'
        options={{
          tabBarIcon: ({ focused }) => <HomeIcon color={focused ? theme.colors.primary : theme.colors.gray500} />,

        }}

      />
      <Tabs.Screen
        name='add-transaction'
        options={{
          tabBarIcon: ({ focused }) => <AddIcon color={focused ? theme.colors.primary : theme.colors.gray500} />,
        }}
      />
      <Tabs.Screen
        name='transactions'
        options={{
          tabBarIcon: ({ focused }) => (
            <TransactionsIcon color={focused ? theme.colors.primary : theme.colors.gray500} />
          ),
        }}
      />
    </Tabs>
  );
}
