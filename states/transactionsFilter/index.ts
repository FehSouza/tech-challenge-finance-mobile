import { TransactionItem } from '@/@types/transaction';
import { createReStateMethods } from '@raulpesilva/re-state';

const TRANSACTIONS_FILTER_KEY = 'transactionsFilter';
type TransactionFilterState = TransactionItem[];
const initialValue = [] as TransactionFilterState;

const methods = createReStateMethods(TRANSACTIONS_FILTER_KEY, initialValue);
export const { dispatchTransactionsFilter, useTransactionsFilterSelect, getTransactionsFilter } = methods;
