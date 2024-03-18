export interface IDashboardSummary {
  appointments: number;
  appointmentsMetric: number;
  referredPatient: number;
  referredPatientMetric: number;
  inpatient: number;
  inpatientMetric: number;
  earningToday: number;
  totalEarningMetric: number;
}

export interface IReceptionistDashboardSummary {
  visitsToday: number;
  newPatientToday: number;
  oldPatientToday: number;
  newPatientYesterday: number;
  oldPatientYesterday: number;
}
