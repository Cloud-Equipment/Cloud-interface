import * as yup from 'yup';

export const FacilityValidations = yup
  .object({
    facilityTypeId: yup.number().positive().integer().required(),
    facilityName: yup.string().required(),
    addressLine1: yup.string().required(),
    addressLine2: yup.string().required(),
    postalCode: yup.string().required(),
    city: yup.string().required(),
    stateId: yup.number().positive().integer().required(),
    countryId: yup.number().positive().integer().required(),
    rebatePercent: yup.number().positive().integer().required(),

    facilityCECode: yup.string().required(),
    facilityStatusId: yup.number().positive().integer().required(),
    enableEMR: yup.boolean().required(),
    facilityAdmin: yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      activationCode: yup.string().required(),
      isFacilityAdmin: yup.boolean().required(),
    }),
  })
  .required();
