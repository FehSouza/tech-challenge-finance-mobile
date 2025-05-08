import { createReStateMethods } from '@raulpesilva/re-state';

const IS_AUTHENTICATED_KEY = 'isAuthenticated';
const initialValue = false;

const methods = createReStateMethods(IS_AUTHENTICATED_KEY, initialValue);
export const { dispatchIsAuthenticated, useIsAuthenticatedSelect } = methods;
