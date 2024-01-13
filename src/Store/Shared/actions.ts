
export enum SharedActions {
  TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
  OPEN_SIDEBAR = "OPEN_SIDEBAR",
  CLOSE_SIDEBAR = "CLOSE_SIDEBAR",
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
