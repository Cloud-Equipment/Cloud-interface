import React from "react";
import DummyLogo from "../assets/images/temp/dummy-logo.png";
import PlusIcon from "../assets/icons/white-plus.png";
import ArrowUpIcon from "../assets/icons/white-arrow-up.svg";
import DummyUserIcon from "../assets/images/temp/dummy-user-icon.png";
import { NavLink } from "react-router-dom";
import DashboardIcon from "../assets/icons/dashboard-nav.png";
import ReportsIcon from "../assets/icons/reports-nav.svg";
import ManagementIcon from "../assets/icons/management-nav.svg";
import SettingsIcon from "../assets/icons/settings.svg";
import "./Layout.scss";

import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../Store/store";
import { UserTypeEnum } from "../Models/auth.models";
import { closeSidebar } from "../Store/Shared/actions";
import CloseIcon from '../assets/icons/x.png'

const Sidebar = () => {
  const userDetails = useSelector((state: IAppState) => state.auth.user);
  const sidebarOpen = useSelector(
    (state: IAppState) => state.shared.sidebarOpen
  );

  const dispatch = useDispatch();

  return (
    <aside
      className={`px-4 py-10 md:px-6 md:py-14 md:pr-10 bg-ce-green w-[80%] max-w-[300px] h-screen fixed top-0 [z-index:51] duration-500 lg:w-[25%] lg:max-w-[300px] text-sm text-white overflow-y-auto ${
        sidebarOpen ? "left-0" : "left-[-100%]"
      }`}
    >
      <button
        className="btn-icon block ml-auto mb-4 mr-2 bg-white"
        onClick={() => {
          dispatch(closeSidebar());
        }}
      >
        <img src={CloseIcon} className="w-5" alt="" />
      </button>

      <div className="flex items-center space-x-3">
        <img src={DummyLogo} alt="Facility Logo" />
        <p className="font-medium  leading-5">AGAPE DIAGNOSTIC CENTER</p>
      </div>

      <p className="mt-10 px-4">MAIN</p>

      <div className="mt-2">
        <NavLink to="/" className="!mt-0 main-icon">
          <img src={DashboardIcon} alt="" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/reports" className="main-icon">
          <img src={ReportsIcon} alt="" />
          <span>Reports</span>
        </NavLink>

        {userDetails?.userType === UserTypeEnum.FACILITY_ADMIN ? (
          <>
            <div className="mt-2 flex items-center justify-between">
              <NavLink
                to="/management"
                className="px-4 py-3 flex items-center space-x-3"
              >
                <img src={ManagementIcon} alt="" />
                <span>Management</span>
              </NavLink>

              <button>
                <img src={ArrowUpIcon} alt="" />
              </button>
            </div>

            <div className="grid pl-[52px] text-[#FFFFFF8F] gap-4 py-2 font-medium">
              <NavLink className="hover:text-white" to="/management/users">
                Manage Users
              </NavLink>
              <NavLink className="hover:text-white" to="/management/users">
                Manage Price
              </NavLink>
              <NavLink className="hover:text-white" to="/management/users">
                Manage Patients
              </NavLink>
            </div>

            <NavLink to="." className="main-icon">
              <img src={SettingsIcon} alt="" />
              <span>Request Equipment</span>
            </NavLink>
          </>
        ) : (
          <></>
        )}

        <NavLink to="." className="main-icon">
          <img src={SettingsIcon} alt="" />
          <span>Settings</span>
        </NavLink>

        <NavLink to="/auth/login" className="main-icon">
          <img src={SettingsIcon} alt="" />
          <span>Logout</span>
        </NavLink>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <p className="px-4">MESSAGES</p>
        <button className="btn-icon">
          <img src={PlusIcon} alt="" />
        </button>
      </div>

      <div className="px-5 py-3 mt-2">
        <NavLink to="." className="flex items-center gap-3">
          <img className="w-6 h-6 rounded-full" src={DummyUserIcon} alt="" />
          <span>Support</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
