import { Button, CategoriesOptionsSelect, ContainerKeyboardAvoiding, TransactionDate } from '@/components';
import { Input } from '@/components/shared';
import { fetchTransactionsWithFilters } from '@/services';
import {
  clearPaginationState,
  dispatchEndDate,
  dispatchSearch,
  dispatchSelectedCategory,
  dispatchStartDate,
  useEndDateSelect,
  useSearchSelect,
  useSelectedCategorySelect,
  useStartDateSelect,
} from '@/states';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const useFilter = () => {
  const router = useRouter();
  const selectedCategory = useSelectedCategorySelect();
  const startDate = useStartDateSelect();
  const endDate = useEndDateSelect();
  const searchTitle = useSearchSelect();

  const handleGoBack = () => router.back();

  const handleFilter = async () => {
    clearPaginationState();
    await fetchTransactionsWithFilters({
      category: selectedCategory,
      startDate: startDate,
      endDate: endDate,
      title: searchTitle,
    });
    router.back();
  };

  const handleClearFilters = async () => {
    clearPaginationState();
    dispatchSelectedCategory(undefined);
    dispatchStartDate(undefined);
    dispatchEndDate(undefined);
    dispatchSearch('');
    await fetchTransactionsWithFilters({});
    router.back();
  };

  return {
    selectedCategory,
    startDate,
    endDate,
    searchTitle,
    handleGoBack,
    handleFilter,
    handleClearFilters,
  };
};

export default function Filter() {
  const { selectedCategory, startDate, endDate, searchTitle, handleGoBack, handleFilter, handleClearFilters } =
    useFilter();

  return (
    <ContainerKeyboardAvoiding>
      <Text style={style.title}>Filtrar</Text>

      <View style={style.wrapper}>
        <Text style={style.subTitle}>Título</Text>
        <Input placeholder='Pesquisar por título' value={searchTitle} onChangeText={dispatchSearch} />
      </View>

      <View style={style.wrapper}>
        <Text style={style.subTitle}>Categoria</Text>
        <CategoriesOptionsSelect category={selectedCategory} setCategory={dispatchSelectedCategory} />
      </View>

      <View style={style.wrapper}>
        <Text style={style.subTitle}>Data</Text>
        <TransactionDate placeholder='Selecione a data inicial' date={startDate} setDate={dispatchStartDate} />
        <TransactionDate placeholder='Selecione a data final' date={endDate} setDate={dispatchEndDate} />
      </View>

      <View style={style.buttonsContainer}>
        <View style={style.button}>
          <Button variant='outlined' onPress={handleClearFilters}>
            Limpar
          </Button>
        </View>
        <View style={style.button}>
          <Button onPress={handleFilter}>Filtrar</Button>
        </View>
      </View>

      <View style={style.wrapper}>
        <Button variant='input' onPress={handleGoBack}>
          Cancelar
        </Button>
      </View>
    </ContainerKeyboardAvoiding>
  );
}

const style = StyleSheet.create({
  title: {
    width: '100%',
    paddingHorizontal: 25,
    fontFamily: theme.fontFamily.inter600,
    fontSize: 24,
    lineHeight: 28,
    color: theme.colors.white,
  },

  wrapper: {
    width: '100%',
    paddingHorizontal: 25,
    marginTop: 18,
    gap: 16,
  },

  subTitle: {
    fontFamily: theme.fontFamily.inter400,
    fontSize: 12,
    lineHeight: 15,
    color: theme.colors.white,
  },

  buttonsContainer: {
    paddingHorizontal: 25,
    marginTop: 'auto',
    flexDirection: 'row',
    gap: 25,
    paddingTop: 48,
    justifyContent: 'space-between',
  },

  button: {
    flex: 1,
  },
});
