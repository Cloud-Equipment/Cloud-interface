import { Layout } from '@cloud-equipment/ui-components';
import { MainRouting } from './MainRouting';
import { IAppState } from '../Store/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@cloud-equipment/shared_store';
import * as Assets from '@cloud-equipment/assets';

const mainRoutes = [
  {
    name: 'Dashboard',
    img: Assets.Icons.DashboardNav,
    route: '/',
  },
  {
    name: 'Reports',
    img: Assets.Icons.ReportsNav,
    route: '/reports',
  },
  {
    name: 'Management',
    img: Assets.Icons.ManagementNav,
    route: '/management',
    children: [
      {
        name: 'Patients',
        route: '/management/patients',
        img: Assets.Icons.DashboardNav,
      },
      {
        name: 'Facilities',
        route: '/management/facility',
        img: Assets.Icons.DashboardNav,
      },
      {
        name: 'Discounts',
        route: '/management/facility/discounts',
        img: Assets.Icons.DashboardNav,
      },
      {
        name: 'Medservices',
        route: '/management/equipment',
        img: Assets.Icons.DashboardNav,
      },
    ],
  },
  {
    name: 'Settings',
    img: Assets.Icons.Settings,
    route: '/settings',
  },
];

const navbarConfig = [
  //   { path: '/', exact: true, name: 'Dashboard' },
  { path: '/reports', name: 'Reports' },
  { path: '/management/patients', name: 'Patients' },
  { path: '/management/facility', name: 'Facilities' },
  { path: '/management/medservices', name: 'Medservices' },
  { path: '/management/equipment', name: 'Equipment' },
  { path: '/settings', name: 'Settings' },
];

// pass Cloud Equipment SUPERADMIN

export const Main = () => {
  const userDetails = useSelector((state: IAppState) => state.auth.user);
  const dispatch = useDispatch();

  const _logout = () => {
    dispatch(logout());
  };

  return (
    <Layout
      navbarConfig={navbarConfig}
      navlinks={mainRoutes}
      onLogout={_logout}
      userDetails={userDetails}
    >
      <MainRouting />
    </Layout>
  );
};
