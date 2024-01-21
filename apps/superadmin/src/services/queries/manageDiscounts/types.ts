export interface IDiscount {
  discountId: number;
  discountName: string;
  discountCode: string;
  discountPercent: number;
  facilityId: string;
  procedureId: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  discountTypeId: number;
}
