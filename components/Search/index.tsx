import { StyleSheet, View } from 'react-native';
import { SearchIcon } from '../icons';
import { Input } from '../shared';

export const Search = () => {
  return (
    <View style={style.container}>
      <Input iconLeft={<SearchIcon />} placeholder='Pesquisa' />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
