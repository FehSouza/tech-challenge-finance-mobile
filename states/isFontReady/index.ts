import { createReStateMethods } from '@raulpesilva/re-state';

const IS_FONT_READY_KEY = 'isFontReady';
const initialValue = true;

const methods = createReStateMethods(IS_FONT_READY_KEY, initialValue);
export const { dispatchIsFontReady, useIsFontReadySelect } = methods;
