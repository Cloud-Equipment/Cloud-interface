interface IRoutes {
  [key: string]: Record<string, string>;
}
export const Routes: IRoutes = {
  management: {
    manageFacility: '/facility',
    addFacility: '/facility/addFacility',
  },
};
