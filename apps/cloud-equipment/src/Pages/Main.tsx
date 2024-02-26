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
        name: 'Users',
        route: '/management/users',
        img: Assets.Icons.DashboardNav,
      },
      {
        name: 'Medservices',
        route: '/management/medservices',
        img: Assets.Icons.DashboardNav,
      },
      {
        name: 'Patients',
        route: '/management/patients',
        img: Assets.Icons.DashboardNav,
      },
    ],
  },
  {
    name: 'Equipment Management',
    img: Assets.Icons.Settings,
    route: '.',
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
  { path: '/management/users', name: 'Users' },
  { path: '/management/medservices', name: 'Medservices' },
  { path: '/management/equipment', name: 'Equipment' },
  { path: '/settings', name: 'Settings' },
];

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
