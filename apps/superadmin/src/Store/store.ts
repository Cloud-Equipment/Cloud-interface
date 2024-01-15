import { combineReducers, legacy_createStore as createStore } from 'redux';
import { authReducer } from '@cloud-equipment/auth';
import { ISharedState, sharedReducer } from '@cloud-equipment/shared_store';
import { composeWithDevTools } from '@redux-devtools/extension';
import { IAuthState } from '@cloud-equipment/models';

export interface IAppState {
  auth: IAuthState;
  shared: ISharedState;
}

const reducers = combineReducers({ auth: authReducer, shared: sharedReducer });


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Store = createStore(reducers, (composeWithDevTools() as any));

export default Store;
