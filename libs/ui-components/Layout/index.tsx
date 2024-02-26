import { IUser } from 'Models/auth.models';
import './Layout.scss';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { INavItem } from './types';
import { useState } from 'react';
import { Modal } from '@mui/material';
import LogoutModal from './LogoutModal';

const Layout = ({
  children,
  userDetails,
  onLogout,
  navlinks,
  navbarConfig,
}: {
  children: JSX.Element;
  userDetails: IUser | null;
  onLogout: () => void;
  navlinks: INavItem[];
  navbarConfig: { path: string; name: string }[];
}) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [logoutModalOpen, setLogoutMOdalOpen] = useState(false);

  const openLogoutModal = () => {
    setLogoutMOdalOpen(true);
  };

  const closeLogoutModal = () => setLogoutMOdalOpen(false);

  const toggleSidebarExpanded = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleLogout = () => {
    setLogoutMOdalOpen(true);
  };

  return (
    <>
      <Sidebar
        onLogout={handleLogout}
        toggleSidebarExpanded={toggleSidebarExpanded}
        sidebarExpanded={sidebarExpanded}
        navlinks={navlinks}
        userDetails={userDetails}
      />

      <main
        className={`bg-[#F6F9F8] min-h-screen w-full lg:w-[75%] duration-700 ${
          sidebarExpanded
            ? 'lg:ml-auto min-w-[calc(100%-300px)]'
            : 'lg:ml-auto min-w-[calc(100%-70px)]'
        }`}
      >
        <Navbar
          onLogout={handleLogout}
          userDetails={userDetails}
          navbarConfig={navbarConfig}
        />

        <div className="">{children}</div>
      </main>

      <Modal open={logoutModalOpen} onClose={closeLogoutModal}>
        <div>
          {<LogoutModal onLogout={onLogout} onClose={closeLogoutModal} />}
        </div>
      </Modal>
    </>
  );
};

export default Layout;
