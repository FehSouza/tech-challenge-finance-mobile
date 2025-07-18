import { fetchTransactionsWithFilters } from '@/services';
import {
  useEndDateSelect,
  usePaginationSelect,
  useSearchSelect,
  useSelectedCategorySelect,
  useStartDateSelect,
} from '@/states';
import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button } from '../shared';

const usePagination = () => {
  const [loading, setLoading] = useState(false);
  const selectedCategory = useSelectedCategorySelect();
  const startDate = useStartDateSelect();
  const endDate = useEndDateSelect();
  const searchTitle = useSearchSelect();
  const { isLastPage } = usePaginationSelect();
  const isOs = Platform.OS === 'ios';

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      await fetchTransactionsWithFilters({
        category: selectedCategory,
        startDate: startDate,
        endDate: endDate,
        title: searchTitle,
        concat: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    isLastPage,
    loading,
    handleLoadMore,
    isOs,
  };
};

export const Pagination = () => {
  const { isLastPage, loading, handleLoadMore, isOs } = usePagination();

  if (isLastPage && !loading) return <View style={[style.container, { paddingBottom: isOs ? 32 : 64 }]} />;

  return (
    <View style={[style.container, { paddingBottom: isOs ? 32 : 64 }]}>
      <Button variant='input' onPress={handleLoadMore} loading={loading}>
        Ver mais transações
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginTop: 32,
  },
});
