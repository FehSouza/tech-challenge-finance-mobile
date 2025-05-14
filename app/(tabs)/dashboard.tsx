import { BalanceValue } from '@/components';
import { theme } from '@/theme';
import { StyleSheet, View } from 'react-native';

export default function Dashboard() {
  return (
    <View style={style.container}>
      <BalanceValue balance={0} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    paddingVertical: 32,
  },
});
