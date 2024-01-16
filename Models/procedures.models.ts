export interface IProcedure {
  facilityName: string;
  procedureEntryId: number;
  medServiceName: null | string;
  patientAge: number;
  patientName: string;
  referrersName: null;
  referrersFacility: null;
  phoneNumber: null;
  facilityDiscountPercent: number;
  facilityDiscountCodeName: null;
  fprocedureDiscountPercent: number;
  procedureDiscountCodeName: null;
  totalAfterDisc: number;
  procedureEntryStatus: string;
  date: Date;
  referrerName: null;
  rebatePaid: number;
  refererHospital: string;
  refererEmail: string;
  phoneNo: null;
  patientId: string;
  medServiceId: number;
  quantity: number;
  amount: number;
  subotal: number;
  facilityId: string;
  remarks: string;
  faclityDiscountId: number | null;
  procedureDiscountId: number;
  entryUserId: string;
  trackId: string;
  rebateId: string;
}

export interface IMedService {
  medServiceId: number;
  medServiceCategoryId: number;
  medServiceName: string;
  medServiceDescription: string;
  isActive: number;
  price: number;
  new_Price: number;
  dateCreated?: Date;
  dateModified?: Date;
  facilityId: string;
}

export interface IMedserviceCategory {
  categoryId: number;
  categoryName: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
}

export interface IMedservice {
  medServiceId: number;
  medServiceCategoryId: number;
  medServiceName: string;
  medServiceDescription: string;
  isActive: number;
  price: number;
  new_Price: number;
  dateCreated: Date;
  dateModified: Date;
  facilityId: string;
}
