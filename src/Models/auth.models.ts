export interface IUser {
  userType: UserTypeEnum;
  token: string;
}

export enum UserTypeEnum {
  ADMIN,
  RECEPTIONIST,
  FACILITY_ADMIN,
}
