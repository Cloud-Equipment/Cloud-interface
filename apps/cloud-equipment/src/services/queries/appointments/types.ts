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
