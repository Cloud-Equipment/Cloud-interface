export const NavbarConfig = [
  //   { path: '/', exact: true, name: 'Dashboard' },
  { path: '/reports', name: 'Reports' },
  { path: '/management/patients', name: 'Patients' },
  { path: '/management/facility', name: 'Facilities' },
  { path: '/management/medservices', name: 'Medservices' },
  { path: '/management/equipment', name: 'Equipment' },
  { path: '/settings', name: 'Settings' },
];

export const getPageName = (pathname: string) => {
  if (pathname === '/') {
    return 'Dashboard';
  }
  const route = NavbarConfig.find((item) => pathname.startsWith(item.path));
  return route ? route.name : 'Unknown Page';
};
