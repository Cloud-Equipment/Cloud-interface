export interface IDiscount {
  discountId: string;
  discountName: string;
  discountCode: string;
  discountPercent: number;
  facilityId: string;
  procedureId: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  discountTypeId: number;
  [key: string]: any; //TODO: Take this out when endpoint payload matches UI
}
