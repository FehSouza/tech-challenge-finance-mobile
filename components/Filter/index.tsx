import { useRouter } from 'expo-router';
import { FilterIcon } from '../icons';
import { ButtonIcon } from '../shared';

export const Filter = () => {
  const router = useRouter();

  const handleNavigate = () => router.navigate(`/filter`);

  return (
    <ButtonIcon variant='input' onPress={handleNavigate}>
      <FilterIcon />
    </ButtonIcon>
  );
};
