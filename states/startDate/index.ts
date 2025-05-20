import { createReStateMethods } from '@raulpesilva/re-state';

const START_DATE_KEY = 'startDate';
const initialValue = undefined as Date | undefined;

const methods = createReStateMethods(START_DATE_KEY, initialValue);
export const { dispatchStartDate, useStartDateSelect, getStartDate } = methods;
