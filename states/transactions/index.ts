import { TransactionItem } from '@/@types/transaction';
import { createReStateMethods } from '@raulpesilva/re-state';

const TRANSACTIONS_KEY = 'transactions';
type TransactionState = TransactionItem[];
const initialValue = [] as TransactionState;

const methods = createReStateMethods(TRANSACTIONS_KEY, initialValue);
export const { dispatchTransactions, useTransactionsSelect, getTransactions } = methods;
