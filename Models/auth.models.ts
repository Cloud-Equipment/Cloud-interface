export interface IUser {
  userType: UserTypeEnum;
  token: string;
  email: string;
  userId: string;
  FACILITY_ID: string;
  USER_ID: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': UserTypeEnum;
  FACILITY_REBATE_PERCENTAGE: string;
  USER_FULLNAME: string;
}

export enum UserTypeEnum {
  ADMIN = 'ADMIN',
  RECEPTIONIST = 'RECEPTIONIST',
  FACILITY_ADMIN = 'FacilityAdmin',
}

export interface IRegisterUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  facilityId: string;
  roles: string[];
}

export interface IAuthState {
  user: IUser | null;
}
