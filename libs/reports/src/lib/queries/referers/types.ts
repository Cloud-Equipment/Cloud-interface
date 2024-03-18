export interface IReferer {
  doctorId: string;
  doctorName: string;
  doctorEmail: string;
  doctorPhone: string;
  doctorHospital: string;
  createdAt: string;
  updatedAt: string;
  hasAccount: boolean;
  rebates: any;
}

export interface IRefererCreate {
  doctorName: string;
  doctorEmail: string;
  doctorPhone: string;
  doctorHospital: string;
}
