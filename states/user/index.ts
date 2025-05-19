import { User } from '@firebase/auth';
import { createReStateMethods } from '@raulpesilva/re-state';

const USER_KEY = 'user';
type UserState = User | null;
const initialValue = null as UserState;

const methods = createReStateMethods(USER_KEY, initialValue);
export const { dispatchUser, useUserSelect } = methods;
export const useAuthenticatedUser = () => {
  const user = useUserSelect();
  if (!user) throw new Error('User not authenticated');
  return user;
};
