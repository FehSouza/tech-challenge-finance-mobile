import { dispatchIsAuthenticated } from '@/states';
import { theme } from '@/theme';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Transactions() {
  const handleLogout = () => dispatchIsAuthenticated(false);

  return (
    <View style={style.container}>
      <Text style={style.text}>Transactions</Text>
      <Button title='Sair' onPress={handleLogout} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },

  text: {
    color: theme.colors.white,
  },
});
