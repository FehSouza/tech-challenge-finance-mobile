import { Platform, StyleSheet, View } from 'react-native';
import { Button } from '../shared';

export const Pagination = () => {
  const isOs = Platform.OS === 'ios';

  return (
    <View style={[style.container, { paddingBottom: isOs ? 32 : 64 }]}>
      <Button variant='input'>Ver mais transações</Button>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginTop: 32,
  },
});
