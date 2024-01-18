export interface Facility {
  id: string;
  numberOfUsers?: number | null;
  facilityTypeId: number;
  facilityName: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: number;
  city: string;
  stateId: number;
  countryId: number;
  isActive: boolean;
  dateCreated: string;
  rebatePercent: number;
  logoPath: string;
}
