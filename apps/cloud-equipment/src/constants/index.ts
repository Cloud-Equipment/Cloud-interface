import { GENDER, MARITAL_STATUS, PAYMENT_TYPE } from './Types';

export const Gender = [
  {
    value: GENDER.MALE,
    label: 'male',
    categoryId: GENDER.MALE,
    categoryName: 'male',
  },
  {
    value: GENDER.FEMALE,
    label: 'female',
    categoryId: GENDER.FEMALE,
    categoryName: 'female',
  },
];

export const MaritalStatus = [
  {
    value: MARITAL_STATUS.SINGLE,
    label: 'Single',
    categoryId: MARITAL_STATUS.SINGLE,
    categoryName: 'Single',
  },
  {
    value: MARITAL_STATUS.MARRIED,
    label: 'Married',
    categoryId: MARITAL_STATUS.MARRIED,
    categoryName: 'Married',
  },
  {
    value: MARITAL_STATUS.DIVORCED,
    label: 'Divorced',
    categoryId: MARITAL_STATUS.DIVORCED,
    categoryName: 'Divorced',
  },
  {
    value: MARITAL_STATUS.ENGAGED,
    label: 'Engaged',
    categoryId: MARITAL_STATUS.ENGAGED,
    categoryName: 'Engaged',
  },
];

export const PaymentMethod = [
  { value: PAYMENT_TYPE.CASH, label: 'Cash', categoryId: '', categoryName: '' },
  { value: PAYMENT_TYPE.CARD, label: 'Card', categoryId: '', categoryName: '' },
];
