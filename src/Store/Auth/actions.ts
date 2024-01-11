import { IUser } from "../../Models/auth.models";

export enum AuthActions {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGOUT = "LOGOUT",
}

export const loginSuccess = (user: IUser) => {
  return {
    type: AuthActions.LOGIN_SUCCESS,
    data: user,
  };
};

export const logout = () => {
  return {
    type: AuthActions.LOGOUT,
  };
};
