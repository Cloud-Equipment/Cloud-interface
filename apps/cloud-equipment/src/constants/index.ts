import { GENDER, MARITAL_STATUS, PAYMENT_TYPE } from './Types';

export const Gender = [
  {
    value: GENDER.MALE,
    label: 'Male',
    categoryId: GENDER.MALE,
    categoryName: 'Male',
  },
  {
    value: GENDER.FEMALE,
    label: 'Female',
    categoryId: GENDER.FEMALE,
    categoryName: 'Female',
  },
];

export const GenderMapping: { [key: string]: 'Male' | 'Female' } = {
  1: 'Male',
  2: 'Female',
};

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
  // {
  //   value: MARITAL_STATUS.DIVORCED,
  //   label: 'Divorced',
  //   categoryId: MARITAL_STATUS.DIVORCED,
  //   categoryName: 'Divorced',
  // },
  // {
  //   value: MARITAL_STATUS.ENGAGED,
  //   label: 'Engaged',
  //   categoryId: MARITAL_STATUS.ENGAGED,
  //   categoryName: 'Engaged',
  // },
];

export const PaymentMethod = [
  {
    value: PAYMENT_TYPE.CASH,
    label: 'Cash-Deposit',
    categoryId: PAYMENT_TYPE.CASH,
    categoryName: 'Cash-Deposit',
  },
  {
    value: PAYMENT_TYPE.CARD,
    label: 'Card',
    categoryId: PAYMENT_TYPE.CARD,
    categoryName: 'Card',
  },
  {
    value: PAYMENT_TYPE.TRANSFER,
    label: 'Transfer',
    categoryId: PAYMENT_TYPE.TRANSFER,
    categoryName: 'Transfer',
  },
];

export const Relationship = [
  {
    value: 'father',
    label: 'Father',
    categoryId: 'father',
    categoryName: 'Father',
  },
  {
    value: 'mother',
    label: 'Mother',
    categoryId: 'mother',
    categoryName: 'Mother',
  },
  {
    value: 'spouse',
    label: 'Spouse',
    categoryId: 'spouse',
    categoryName: 'Spouse',
  },
  {
    value: 'sibling',
    label: 'Sibling',
    categoryId: 'sibling',
    categoryName: 'Sibling',
  },
  {
    value: 'other',
    label: 'Other',
    categoryId: 'other',
    categoryName: 'Other',
  },
];
