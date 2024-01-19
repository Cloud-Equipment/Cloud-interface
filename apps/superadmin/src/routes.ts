interface IRoutes {
  [key: string]: Record<string, string>;
}
export const Routes: IRoutes = {
  management: {
    manageFacility: '/facility',
    addFacility: '/facility/addFacility',
    viewFacility: '/facility/viewFacility/:id',
    viewFacilityAbout: '/facility/viewFacility/:id/about',
    viewFacilityReport: '/facility/viewFacility/:id/report',
    viewFacilityStaffs: '/facility/viewFacility/:id/staffs',
    viewFacilityPayment: '/facility/viewFacility/:id/payment',
    viewFacilityEquipments: '/facility/viewFacility/:id/equipment',
    viewFacilityTickets: '/facility/viewFacility/:id/tickets',
    viewFacilityReviews: '/facility/viewFacility/:id/reviews',
  },
};
