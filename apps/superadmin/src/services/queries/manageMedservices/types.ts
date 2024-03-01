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
  status: string;
}
