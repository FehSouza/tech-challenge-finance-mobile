import { storageSetItem } from '@/utils';
import { createReStateMethods, onReStateChange } from '@raulpesilva/re-state';

const key = 'showBalanceValue';
const initialValue = false;
const getInitialValue = initialValue;

export const { useShowBalanceValue, dispatchShowBalanceValue, getShowBalanceValue } = createReStateMethods(
  key,
  getInitialValue
);

onReStateChange(() => storageSetItem(key, getShowBalanceValue()), [key]);
