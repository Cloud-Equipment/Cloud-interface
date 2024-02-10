export const getQueryKeys = (namespace: string) => ({
  create: `${namespace}/create`,
  read: `${namespace}/read`,
  readFacilityTypes: `${namespace}/readFacilityTypes`,
  readOne: `${namespace}/readOne`,
  update: `${namespace}/update`,
  patch: `${namespace}/patch`,
  put: `${namespace}/put`,
  delete: `${namespace}/delete`,
  getAll: `${namespace}/getAll`, // for dropdowns that should have all (non-pagiated)
});
