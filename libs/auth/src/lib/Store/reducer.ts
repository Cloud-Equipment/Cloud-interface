import { IUser } from '@cloud-equipment/models';
import { AuthActionsEnum } from './actions';
import * as jwtDecode from 'jwt-decode';

import { IAuthState } from '@cloud-equipment/models';

const token = localStorage.getItem('token');

let user_obj: IUser | null = null;

// Check if the token exists and is valid
if (token) {
  try {
    const decoded = jwtDecode.jwtDecode(token) as unknown as IUser;

    user_obj = {
      ...decoded,
      userType:
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
    };
  } catch (error) {
    localStorage.clear();
    sessionStorage.clear();
  }
} else {
  localStorage.clear();
  sessionStorage.clear();
}

const initialState: IAuthState = {
  user: user_obj,
};

export const authReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: AuthActionsEnum; data: any }
): IAuthState => {
  switch (action.type) {
    case AuthActionsEnum.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data,
      };
    case AuthActionsEnum.LOGOUT:
      localStorage.clear();
      window.location.replace('/auth/login');
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
