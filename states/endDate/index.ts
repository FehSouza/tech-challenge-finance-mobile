import { createReStateMethods } from '@raulpesilva/re-state';

const END_DATE_KEY = 'endDate';
const initialValue = undefined as Date | undefined;

const methods = createReStateMethods(END_DATE_KEY, initialValue);
export const { dispatchEndDate, useEndDateSelect, getEndDate } = methods;
