import { DepositIcon } from '@/components/icons/DepositIcon';
import { InvestmentIcon } from '@/components/icons/InvestmentIcon';
import { TransferIcon } from '@/components/icons/TransferIcon';
import { WithdrawIcon } from '@/components/icons/WithdrawIcon';
import { theme } from '@/theme';
import { CategoryType } from '../category';
import { ConvertUnionToTuple } from '../utils';

export const TRANSACTIONS_TYPES = ['deposit', 'withdraw', 'investment', 'transfer'] as const;
export const TRANSACTIONS_TYPES_DICTIONARY = {
  deposit: 'Depósito',
  withdraw: 'Retirada',
  investment: 'Investimento',
  transfer: 'Transferência',
} as const;

export const TRANSACTIONS_TYPES_DICTIONARY_MAP = {
  Depósito: 'deposit',
  Retirada: 'withdraw',
  Investimento: 'investment',
  Transferência: 'transfer',
} as const;

export const TRANSACTIONS_COLORS: Record<TransactionType, string> = {
  deposit: theme.colors.primary,
  withdraw: theme.colors.error,
  transfer: theme.colors.blue500,
  investment: theme.colors.green500,
};

export const TRANSACTIONS_TYPES_DICTIONARY_VALUES = Object.values(
  TRANSACTIONS_TYPES_DICTIONARY
) as TransactionTypeDictionaryValues;

export const TRANSACTIONS_TYPES_DICTIONARY_ICONS = {
  deposit: DepositIcon,
  withdraw: WithdrawIcon,
  investment: InvestmentIcon,
  transfer: TransferIcon,
};

export const MONTHS_DICTIONARY = {
  January: 'Janeiro',
  February: 'Fevereiro',
  March: 'Março',
  April: 'Abril',
  May: 'Maio',
  June: 'Junho',
  July: 'Julho',
  August: 'Agosto',
  September: 'Setembro',
  October: 'Outubro',
  November: 'Novembro',
  December: 'Dezembro',
} as const;

export type TransactionOptions = typeof TRANSACTIONS_TYPES;
export type TransactionType = (typeof TRANSACTIONS_TYPES)[number];
export type TransactionTypeDictionary = typeof TRANSACTIONS_TYPES_DICTIONARY;
export type TransactionTypeDictionaryKey = keyof TransactionTypeDictionary;
export type TransactionTypeDictionaryValues = ConvertUnionToTuple<
  TransactionTypeDictionary[TransactionTypeDictionaryKey]
>;
export type TransactionTypeDictionaryValue = TransactionTypeDictionaryValues[number];

export interface TransactionItem {
  id: string;
  date: string;
  value: number;
  type: TransactionType;
  category: CategoryType;
  title: string;
  attachment: string | null;
  optimistic?: boolean;
}
