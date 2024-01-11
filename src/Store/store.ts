import { applyMiddleware, combineReducers, createStore } from "redux";
import { IAuthState, authReducer } from "./Auth/reducer";

export interface IAppState {
  auth: IAuthState;
}

const reducers = combineReducers({ auth: authReducer });

const Store = createStore(
  reducers
  // composeWithDevTools(applyMiddleware(logger))
);

export default Store;
