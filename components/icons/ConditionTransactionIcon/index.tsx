import { TRANSACTIONS_TYPES_DICTIONARY_ICONS } from '@/@types/transaction';

interface ConditionTransactionIconProps {
  condition: string;
}

export const ConditionTransactionIcon = ({ condition }: ConditionTransactionIconProps) => {
  const Icon = TRANSACTIONS_TYPES_DICTIONARY_ICONS[condition as keyof typeof TRANSACTIONS_TYPES_DICTIONARY_ICONS];
  return <Icon />;
};
