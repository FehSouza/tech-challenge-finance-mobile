import { createReStateMethods } from '@raulpesilva/re-state';

const SEARCH_KEY = 'search';
const initialValue = '';

const methods = createReStateMethods(SEARCH_KEY, initialValue);
export const { dispatchSearch, useSearchSelect } = methods;
