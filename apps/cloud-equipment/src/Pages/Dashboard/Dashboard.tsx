import DashboardCalendar from '../../components/dashboard/DashboardCalendar';
import AppointmentTimeLine from '../../components/dashboard/AppointmentTimeLine';
import { useSelector } from 'react-redux';
import { IAppState } from '../../Store/store';
import queries from '../../services/queries/dashboard';
import { UserTypeEnum } from '@cloud-equipment/models';
import ReceptionistDashboardSub from '../../components/dashboard/ReceptionistDashboardSub';
import { Menu, MenuItem, ListItemText, Modal } from '@mui/material';
import * as Assets from '@cloud-equipment/assets';
import { useState } from 'react';
import { Button } from '@cloud-equipment/ui-components';
import FacilityAdminDashboardSub from '../../components/dashboard/FacilityAdminDashboardSub';
import AppointmentModal from '../../components/dashboard/AppointmentModal';

const Dashboard = () => {
  const userDetails = useSelector((state: IAppState) => state.auth.user);
  //   menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // modals
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  const openAppointmentModal = () => {
    setAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => setAppointmentModalOpen(false);

  return (
    <>
      <Modal open={appointmentModalOpen} onClose={closeAppointmentModal}>
        <div>{<AppointmentModal onClose={closeAppointmentModal} />}</div>
      </Modal>

      <section className="ce-px ce-py grid xl:grid-cols-[1fr_auto] gap-5">
        <div className="grid grid-cols-1">
          <div className="md:flex justify-between md:items-center gap-4">
            <div>
              <h3 className="text-ce-green text-2xl font-bold">
                <span className="font-normal">Hello,</span>{' '}
                {userDetails?.USER_FULLNAME}
              </h3>
              <p className="text-greyText2">
                Check your activities in this dashboard.
              </p>
            </div>

            <Button
              variant="primary"
              className="!bg-ce-green"
              onClick={(e) => handleActionClick(e)}
              label="New"
              icon={Assets.Icons.WhitePlus}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                }}
              >
                <ListItemText>New Patient</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  openAppointmentModal();
                  handleMenuClose();
                }}
              >
                <ListItemText>New Appointment</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                }}
              >
                <ListItemText>New Report</ListItemText>
              </MenuItem>
            </Menu>
          </div>
          {userDetails?.userType === UserTypeEnum.FACILITY_ADMIN ? (
            <ReceptionistDashboardSub />
          ) : (
            <FacilityAdminDashboardSub />
            // <ReceptionistDashboardSub />
          )}
        </div>

        <div className="bg-white rounded-[20px] px-3 grid gap-x-5 md:grid-cols-2 xl:grid-cols-[unset] xl:block">
          <DashboardCalendar />
          <AppointmentTimeLine />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
