import { GENDER, MARITAL_STATUS, PAYMENT_TYPE } from './Types';

export const Gender = [
  { value: GENDER.MALE, label: 'male' },
  { value: GENDER.FEMALE, label: 'female' },
];

export const MaritalStatus = [
  { value: MARITAL_STATUS.SINGLE, label: 'Single' },
  { value: MARITAL_STATUS.MARRIED, label: 'Married' },
  { value: MARITAL_STATUS.DIVORCED, label: 'Divorced' },
  { value: MARITAL_STATUS.ENGAGED, label: 'Engaged' },
];

export const PaymentMethod = [
  { value: PAYMENT_TYPE.CASH, label: 'Cash' },
  { value: PAYMENT_TYPE.CARD, label: 'Card' },
];
