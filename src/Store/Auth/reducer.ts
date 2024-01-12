import { IUser, UserTypeEnum } from "../../Models/auth.models";
import { AuthActions } from "./actions";
// import jwt_decode from "jwt-decode";

export interface IAuthState {
  user: IUser | null;
}

let token = localStorage.getItem("token");

let user: any = localStorage.getItem("user");
user = user ? (JSON.parse(user) as unknown as IUser) : null;

// Check if the token exists and is valid
// if (token) {
//   try {
//     const decodedToken = jwt_decode(token);
//   } catch (error) {
//     token = null;
//     localStorage.clear();
//     sessionStorage.clear();
//   }
// } else {
//   localStorage.clear();
//   sessionStorage.clear();
// }

const initialState: IAuthState = {
  //   user: {
  //     userType: UserTypeEnum.FACILITY_ADMIN,
  //     token: "",
  //   },
  user,
};

export const authReducer = (
  state = initialState,
  action: { type: AuthActions; data: any }
) => {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data,
      };
    case AuthActions.LOGOUT:
      localStorage.clear();
      window.location.replace("/");
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};
