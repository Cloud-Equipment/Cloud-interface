export enum SharedActions {
  SET_LOADING = 'SET_LOADING',
  CLEAR_LOADING = 'CLEAR_LOADING',
}
export const setLoading = () => {
  return {
    type: SharedActions.SET_LOADING,
  };
};

export const clearLoading = () => {
  return {
    type: SharedActions.CLEAR_LOADING,
  };
};
