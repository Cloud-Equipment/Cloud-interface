export interface IPatient {
  patientUniqueID: string;
  patientFacilityCode: string;
  patientName: string;
  patientAge: number;
  patientEmail: string;
  patientPhone: string;
  patientGenderId: number;
  aboutPatient: string;
  maritalStatusId: number;
  bloodGroupId: null;
  dateOfBirth: Date;
  dateOfDeath: null;
  imagePath: null;
  address: string;
  isActive: boolean;
}
