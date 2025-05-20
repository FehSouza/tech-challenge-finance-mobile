import { CATEGORIES_TYPES_DICTIONARY_VALUES, CategoryTypeDictionaryValue } from '@/@types/category';
import { Select } from '../shared';

interface CategoriesOptionsSelectProps {
  category: CategoryTypeDictionaryValue | undefined;
  setCategory: (category: CategoryTypeDictionaryValue) => void;
}

export const CategoriesOptionsSelect = ({ category, setCategory }: CategoriesOptionsSelectProps) => {
  return (
    <Select
      placeholder='Selecione a categoria'
      options={CATEGORIES_TYPES_DICTIONARY_VALUES}
      value={category}
      onPress={setCategory}
    />
  );
};
