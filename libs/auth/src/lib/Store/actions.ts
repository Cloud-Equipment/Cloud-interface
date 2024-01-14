import { IUser } from '@cloud-equipment/models';

export enum AuthActionsEnum {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT = 'LOGOUT',
}

export const loginSuccess = (user: IUser) => {
  return {
    type: AuthActionsEnum.LOGIN_SUCCESS,
    data: user,
  };
};

export const logout = () => {
  return {
    type: AuthActionsEnum.LOGOUT,
  };
};
