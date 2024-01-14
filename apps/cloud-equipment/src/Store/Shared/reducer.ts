import { SharedActions } from './actions';

export interface ISharedState {
  sidebarOpen: boolean;
  loading: boolean;
}

const initialState: ISharedState = {
  sidebarOpen: false,
  loading: false,
};

export const sharedReducer = (
  state = initialState,
  action: { type: SharedActions }
): ISharedState => {
  switch (action.type) {
    case SharedActions.OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOpen: true,
      };
    case SharedActions.CLOSE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: false,
      };
    case SharedActions.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
    case SharedActions.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SharedActions.CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
