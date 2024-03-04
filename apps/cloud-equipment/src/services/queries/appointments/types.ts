export interface IAppointmentCreate {
  facilityId: string;
  visitReasonId: number;
  patientId: string;
  doctorId: string;
  patientAliasId: string;
  testIds: number[];
  takingMeds: boolean;
  total: number;
  isPaid: boolean;
  notes: string;
  //   createdAt: '2024-02-10T08:46:48.480Z';
  //   appointmentDate: '2024-02-10T08:46:48.480Z';
  //   updatedAt: '2024-02-10T08:46:48.480Z';
  isHonored: true;
  isLocked: true;
  isCanceled: true;
}

export interface IAppointment {
  id: number;
  facility: IFacility;
  visitReason: IVisitReason;
  patientId: string;
  patient: Patient;
  patientAlias: null;
  tests: ITest[];
  takingMeds: boolean;
  total: number;
  isPaid: null;
  notes: string;
  createdAt: string;
  appointmentDate: string;
  updatedAt: string;
  isHonored: null;
  isLocked: null;
  isCanceled: boolean;
}

export interface IFacility {
  id: string;
  facilityTypeId: number;
  facilityCECode: string;
  faclitySelfCode: string;
  facilityName: string;
  facilityEmail: string;
  facilityPhone: string;
  comment: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: number;
  city: string;
  stateId: number;
  countryId: number;
  rebatePercent: number;
  isActive: boolean;
  dateCreated: string;
  logoPath: string;
  facilityStatusId: null;
  enableEMR: boolean;
  facilityAdminId: string;
  facilityStatusTypes: null;
}

export interface Patient {
  patientUniqueID: string;
  patientName: string;
  patientAge: number;
  patientEmail: string;
  patientPhone: string;
  patientGenderId: number;
  aboutPatient: string;
  maritalStatusId: number;
  bloodGroupId: null;
  dateOfBirth: null;
  dateOfDeath: null;
  imagePath: null;
  address: string;
  emergencyContactFirstname: null;
  emergencyContactLastName: null;
  emergencyContactNumber: null;
  emergencyContactRelationship: null;
  paymentType: null;
  reasonForRegistration: null;
  takingMedication: boolean;
  additionalNotes: null;
  isActive: boolean;
  registrationDate: string;
  vitals: null;
  alias: null;
}

export interface ITest {
  id: number;
  appointmentId: number;
  medServiceId: number;
  createdAt: string;
  updatedAt: null;
}

export interface IVisitReason {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: null;
}
