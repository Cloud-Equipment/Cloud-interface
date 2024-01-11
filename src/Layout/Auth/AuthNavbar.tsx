import React from "react";
import Logo from "../../assets/icons/logo.svg";
import UserIcon from "../../assets/icons/user.svg";
import { NavLink } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <nav className="sticky px-4 py-3 md:py-5 md:px-6 lg:px-10 top-0 bg-white text-sm flex items-center justify-between">
      <a href="/auth/login">
        <img src={Logo} alt="" className="w-[180px] lg:w-[200px]" />
      </a>

      <div className="hidden md:flex space-x-3 items-center">
        <NavLink to="/auth/login">Login</NavLink>
        <NavLink to="/auth/register">
          <button className="ce-btn ce-btn-icon">
            <img src={UserIcon} alt="" />
            <span>Get Started</span>
          </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default AuthNavbar;
