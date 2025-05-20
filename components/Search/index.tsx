import { fetchTransactionsWithFilters } from '@/hooks';
import { dispatchSearch, getEndDate, getSelectedCategory, getStartDate, useSearchSelect } from '@/states';
import { StyleSheet, View } from 'react-native';
import { SearchIcon } from '../icons';
import { Input } from '../shared';

export const Search = () => {
  const searchTitle = useSearchSelect();
  const handleSubmit = async () => {
    const selectedCategory = getSelectedCategory();
    const startDate = getStartDate();
    const endDate = getEndDate();
    await fetchTransactionsWithFilters({
      category: selectedCategory,
      startDate: startDate,
      endDate: endDate,
      title: searchTitle,
    });
  };
  return (
    <View style={style.container}>
      <Input
        iconLeft={<SearchIcon />}
        placeholder='Pesquisa'
        inputMode='search'
        value={searchTitle}
        onChangeText={dispatchSearch}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
