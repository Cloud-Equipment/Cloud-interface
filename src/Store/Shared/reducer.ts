import { SharedActions } from "./actions";

export interface ISharedState {
  sidebarOpen: boolean;
}

const initialState: ISharedState = {
  sidebarOpen: false,
};

export const sharedReducer = (
  state = initialState,
  action: { type: SharedActions }
) => {
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
    default:
      return state;
  }
};
