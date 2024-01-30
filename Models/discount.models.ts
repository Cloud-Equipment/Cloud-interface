export interface IDiscount {
  discountTypeId: number;
  discountName: string;
  discountCode: string;
  discountPercent: number;
  procedureId: number;
  startDate: string;
  facilityId: string;
  [key: string]: any; //TODO: Take this out when endpoint payload matches UI
  discountId: string;
  endDate: string;
  isActive: boolean;

  description: string;
}
