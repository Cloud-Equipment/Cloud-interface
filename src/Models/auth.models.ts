export interface IUser {
  userType: UserTypeEnum;
  token: string;
}

export enum UserTypeEnum {
  ADMIN = "ADMIN",
  RECEPTIONIST = "RECEPTIONIST",
  FACILITY_ADMIN = "FACILITY_ADMIN",
}

export interface IRegisterUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  facilityId: string;
  roles: string[];
}
