import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../Store/store';
import { toggleSidebar } from '../Store/Shared/actions';
import * as Assets from '@cloud-equipment/assets';
import { useState, MouseEvent } from 'react';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state: IAppState) => state.auth.user);

  const viewProfile = () => {
    handleClose();
  };

  const logout = () => {
    navigate('/auth/login');
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="sticky z-50 bg-[#F6F9F8] top-0 px-5 pt-4 md:px-6 md:pt-6 pb-2 flex justify-between">
      <div className="flex">
        <button
          onClick={() => {
            dispatch(toggleSidebar());
          }}
          className="btn-icon lg:hidden"
        >
          <img src={Assets.Icons.Hamburger} alt="" />
        </button>

        <div className="hidden md:block">
          <h3 className="text-xl">Dashboard</h3>

          <div className=""></div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center rounded-[20px] bg-white justify-center w-12 h-12">
          <img src={Assets.Icons.NotificationBell} alt="" />
        </div>

        <div className="rounded-xl bg-white md:w-[300px] pl-8 pr-4 gap-3 py-2.5 flex items-center">
          <img
            className="w-12 h-12 rounded-full"
            src={Assets.Images.Temp.DummyUserIcon2}
            alt=""
          />

          <div className="flex-1">
            <p className="font-bold text-blackText">Emma Taylor</p>
            <p className="text-greyText text-sm">{userDetails?.userType}</p>
          </div>

          <button onClick={handleClick} className="btn-icon">
            <img src={Assets.Icons.SolidArrowDown} alt="" />
          </button>
        </div>
      </div>

      <Menu
        //   id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => viewProfile()}>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            {<img src={Assets.Icons.Logout} alt="" />}
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default Navbar;
