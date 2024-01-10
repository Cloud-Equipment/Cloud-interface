import React from "react";
import NotificationBell from "../assets/icons/notification-bell.svg";
import ArrowDown from "../assets/icons/solid-arrow-down.svg";
import DummyUserIcon from "../assets/images/temp/dummy-user-icon2.svg";

const Navbar = () => {
  return (
    <nav className="sticky top-0 px-5 py-4 md:p-6 flex justify-between">
      <div>
        <h3 className="text-xl">Dashboard</h3>

        <div className=""></div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center rounded-[20px] bg-white justify-center w-12 h-12">
          <img src={NotificationBell} alt="" />
        </div>

        <div className="rounded-xl bg-white md:w-[300px] pl-8 pr-4 gap-3 py-2.5 flex items-center">
          <img className="w-12 h-12 rounded-full" src={DummyUserIcon} alt="" />
          
          <div className="flex-1">
            <p className="font-bold text-blackText">Emma Taylor</p>
            <p className="text-greyText text-sm">Receptionist</p>
          </div>
          
          <button className="btn-icon">
            <img src={ArrowDown} alt="" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
