import { CATEGORIES_TYPES_DICTIONARY_VALUES, CategoryTypeDictionaryValue } from '@/@types/category';
import { useState } from 'react';
import { Select } from '../shared';

interface CategoriesOptionsSelectProps {
  type?: CategoryTypeDictionaryValue;
}

export const CategoriesOptionsSelect = ({ type }: CategoriesOptionsSelectProps) => {
  const [category, setCategory] = useState<CategoryTypeDictionaryValue | null>(type ?? null);

  return (
    <Select
      placeholder='Selecione a categoria'
      options={CATEGORIES_TYPES_DICTIONARY_VALUES}
      value={category}
      onPress={setCategory}
    />
  );
};
