import React from "react";
import NotificationBell from "../assets/icons/notification-bell.svg";
import ArrowDown from "../assets/icons/solid-arrow-down.svg";
import DummyUserIcon from "../assets/images/temp/dummy-user-icon2.svg";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../assets/icons/logout.svg";
import { useSelector } from "react-redux";
import { IAppState } from "../Store/store";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  const userDetails = useSelector((state: IAppState) => state.auth.user);

  const viewProfile = () => {
    // navigate("/reports/" + x);
    handleClose();
  };

  const logout = () => {
    navigate("/auth/login");
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="sticky bg-[#F6F9F8] top-0 px-5 pt-4 md:px-6 md:pt-6 pb-2 flex justify-between">
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
            <p className="text-greyText text-sm">{userDetails?.userType}</p>
          </div>

          <button onClick={handleClick} className="btn-icon">
            <img src={ArrowDown} alt="" />
          </button>
        </div>
      </div>

      <Menu
        //   id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => viewProfile()}>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>{<img src={LogoutIcon} alt="" />}</ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default Navbar;
