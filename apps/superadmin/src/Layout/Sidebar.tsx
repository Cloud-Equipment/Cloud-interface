import { NavLink } from 'react-router-dom';
import './Layout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../Store/store';
import { closeSidebar } from '@cloud-equipment/shared_store';
import * as Assets from '@cloud-equipment/assets';

const Sidebar = () => {
  const sidebarOpen = useSelector(
    (state: IAppState) => state.shared.sidebarOpen
  );

  const dispatch = useDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  return (
    <aside
      className={`px-4 py-10 md:px-6 md:py-14 md:pr-10 bg-ce-green w-[80%] max-w-[300px] h-screen fixed top-0 [z-index:51] duration-500 lg:w-[25%] lg:max-w-[300px] text-sm text-white overflow-y-auto lg:!left-0 ${
        sidebarOpen ? 'left-0' : 'left-[-100%]'
      }`}
    >
      <button
        className="btn-icon lg:hidden block ml-auto mb-4 mr-2 bg-white"
        onClick={handleCloseSidebar}
      >
        <img src={Assets.Icons.X} className="w-5" alt="" />
      </button>

      <div className="flex items-center space-x-3">
        <img src={Assets.Icons.Favicon} alt="Facility Logo" />
        <p className="font-medium  leading-5 text-lg">
          Cloud Equipment SUPERADMIN
        </p>
      </div>

      <p className="mt-10 px-4">MAIN</p>

      <div className="mt-2">
        <NavLink
          onClick={handleCloseSidebar}
          to="/"
          className="!mt-0 main-icon"
        >
          <img src={Assets.Icons.DashboardNav} alt="" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          onClick={handleCloseSidebar}
          to="/reports"
          className="main-icon"
        >
          <img src={Assets.Icons.ReportsNav} alt="" />
          <span>Reports</span>
        </NavLink>

        <div className="mt-2 flex items-center justify-between">
          <NavLink
            to="/management"
            className="px-4 py-3 flex items-center space-x-3"
          >
            <img src={Assets.Icons.ManagementNav} alt="" />
            <span>Management</span>
          </NavLink>

          <button>
            <img src={Assets.Icons.WhiteArrowUp} alt="" />
          </button>
        </div>

        <div className="grid text-[#FFFFFF8F] gap-2 px-[25px] py-2 font-medium subnavs">
          <NavLink onClick={handleCloseSidebar} to="/management/patients">
            Patients
          </NavLink>

          <NavLink onClick={handleCloseSidebar} to="/management/facility">
            Facilities
          </NavLink>

          <NavLink
            onClick={handleCloseSidebar}
            to="/management/facility/discounts"
          >
            Discounts
          </NavLink>

          <NavLink onClick={handleCloseSidebar} to="/management/medservices">
            Medservices
          </NavLink>

          <NavLink onClick={handleCloseSidebar} to="/management/equipment">
            Equipment
          </NavLink>
        </div>

        <NavLink
          onClick={handleCloseSidebar}
          to="/settings"
          className="main-icon"
        >
          <img src={Assets.Icons.Settings} alt="" />
          <span>Settings</span>
        </NavLink>

        <NavLink
          onClick={handleCloseSidebar}
          to="/auth/login"
          className="main-icon"
        >
          <img src={Assets.Icons.Settings} alt="" />
          <span>Logout</span>
        </NavLink>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <p className="px-4">MESSAGES</p>
        <button className="btn-icon">
          <img src={Assets.Icons.WhitePlus} alt="" />
        </button>
      </div>

      <div className="px-5 py-3 mt-2">
        <NavLink
          onClick={handleCloseSidebar}
          to="."
          className="flex items-center gap-3"
        >
          <img
            className="w-6 h-6 rounded-full"
            src={Assets.Images.Temp.DummyUserIcon}
            alt=""
          />
          <span>Support</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
