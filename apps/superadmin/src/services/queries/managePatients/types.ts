export interface IPatient {
  patientFacilityCode: string;
  patientName: string;
  patientAge: number;
  patientEmail: string;
  patientPhone: string;
  patientGenderId: number;
  aboutPatient: string;
  maritalStatusId: number;
  bloodGroupId: number;
  dateOfBirth: string;
  dateOfDeath: string;
  address: string;
  isActive: boolean;
  imagePath: string;
  patientUniqueID: string;
  emergencyContactFirstname: string;
  emergencyContactLastName: string;
  emergencyContactNumber: string;
  emergencyContactRelationship: string;
  paymentType: string;
  reasonForRegistration: string;
  takingMedication: boolean;
  additionalNotes: string;
  registrationDate: string;
}
