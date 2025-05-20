import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchIcon } from '../icons';
import { Input } from '../shared';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View style={style.container}>
      <Input
        iconLeft={<SearchIcon />}
        placeholder='Pesquisa'
        inputMode='search'
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
