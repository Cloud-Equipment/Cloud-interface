interface IRoutes {
  [key: string]: Record<string, string>;
}
export const Routes: IRoutes = {
  management: {
    manageFacility: '/facility',
    addFacility: '/facility/addFacility',
    editFacility: '/facility/editFacility/:id',
    viewFacility: '/facility/view/:id/*',
    viewFacilityAbout: '/facility/view/:id/about',
    viewFacilityReport: '/facility/view/:id/report',
    viewFacilityStaffs: '/facility/view/:id/staffs',
    viewFacilityPayment: '/facility/view/:id/payment',
    viewFacilityEquipments: '/facility/view/:id/equipment',
    viewFacilityTickets: '/facility/view/:id/tickets',
    viewFacilityReviews: '/facility/view/:id/reviews',
    equipment: '/equipment',
    patient: '/patients/*',
    discountFacility: '/facility/discounts',
    discount: '/facilities/:id/discounts',
  },
};
