export enum SharedActions {
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
  OPEN_SIDEBAR = 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR = 'CLOSE_SIDEBAR',
  SET_LOADING = 'SET_LOADING',
  CLEAR_LOADING = 'CLEAR_LOADING',
}

export const openSidebar = () => {
  return {
    type: SharedActions.OPEN_SIDEBAR,
  };
};

export const closeSidebar = () => {
  return {
    type: SharedActions.CLOSE_SIDEBAR,
  };
};

export const toggleSidebar = () => {
  return {
    type: SharedActions.TOGGLE_SIDEBAR,
  };
};
