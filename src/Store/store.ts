import { applyMiddleware, combineReducers, createStore } from "redux";
import { IAuthState, authReducer } from "./Auth/reducer";
import { ISharedState, sharedReducer } from "./Shared/reducer";

export interface IAppState {
  auth: IAuthState;
  shared: ISharedState;
}

const reducers = combineReducers({ auth: authReducer, shared: sharedReducer });

const Store = createStore(
  reducers
  // composeWithDevTools(applyMiddleware(logger))
);

export default Store;
