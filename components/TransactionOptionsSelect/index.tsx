import { TRANSACTIONS_TYPES_DICTIONARY_VALUES, TransactionTypeDictionaryValue } from '@/@types/transaction';
import { Select } from '../shared';

interface TransactionOptionsSelectProps {
  typeTransaction: TransactionTypeDictionaryValue | null;
  setTypeTransaction: (type: TransactionTypeDictionaryValue) => void;
}

export const TransactionOptionsSelect = ({ typeTransaction, setTypeTransaction }: TransactionOptionsSelectProps) => {
  return (
    <Select
      placeholder='Selecione o tipo de transação'
      options={TRANSACTIONS_TYPES_DICTIONARY_VALUES}
      value={typeTransaction}
      onPress={setTypeTransaction}
    />
  );
};
