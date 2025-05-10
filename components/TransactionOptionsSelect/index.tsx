import { TRANSACTIONS_TYPES_DICTIONARY_VALUES, TransactionTypeDictionaryValue } from '@/@types/transaction';
import { useState } from 'react';
import { Select } from '../shared';

interface TransactionOptionsSelectProps {
  type?: TransactionTypeDictionaryValue;
}

export const TransactionOptionsSelect = ({ type }: TransactionOptionsSelectProps) => {
  const [typeTransaction, setTypeTransaction] = useState<TransactionTypeDictionaryValue | null>(type ?? null);

  return (
    <Select
      placeholder='Selecione o tipo de transação'
      options={TRANSACTIONS_TYPES_DICTIONARY_VALUES}
      value={typeTransaction}
      onPress={setTypeTransaction}
    />
  );
};
