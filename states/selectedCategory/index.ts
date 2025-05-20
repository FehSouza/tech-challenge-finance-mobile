import { CategoryTypeDictionaryValue } from '@/@types/category';
import { createReStateMethods } from '@raulpesilva/re-state';

const SELECTED_CATEGORY_KEY = 'selectedCategory';
const initialValue = undefined as CategoryTypeDictionaryValue | undefined

const methods = createReStateMethods(SELECTED_CATEGORY_KEY, initialValue);
export const { dispatchSelectedCategory, useSelectedCategorySelect, getSelectedCategory } = methods;
