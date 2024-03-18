import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';
import { Menu, MenuItem, ListItemText, Modal } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import DashboardCalendar from '../../components/dashboard/DashboardCalendar';
import AppointmentTimeLine from '../../components/dashboard/AppointmentTimeLine';
import { IAppState } from '../../Store/store';
import appointmentQueries from '../../services/queries/appointments';
import { UserTypeEnum } from '@cloud-equipment/models';
import ReceptionistDashboardSub from '../../components/dashboard/ReceptionistDashboardSub';
import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';
import FacilityAdminDashboardSub from '../../components/dashboard/FacilityAdminDashboardSub';
import AppointmentModal from '../../components/dashboard/AppointmentModal';
import { useEffectOnce } from '@cloud-equipment/hooks';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search);

  const userDetails = useSelector((state: IAppState) => state.auth.user);

  useEffectOnce(() => {
    if (queryParams?.openModal === 'appointment') {
      openAppointmentModal();
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 300);
    }
    return () => {};
  });

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

  const [date, setDate] = useState<Dayjs>(dayjs());

  const { data: appointmentData } =
    appointmentQueries.useGetUpcomingAppointments({
      facilityId: userDetails?.FACILITY_ID as string,
      currentPage: 1,
      startIndex: 0,
      pageSize: 20,
      // apponitmentFrom: dayjs(date).format('YYYY-MM-DD'),
      // apponitmentTo: dayjs(date).format('YYYY-MM-DD'),
    });

  return (
    <>
      <Modal open={appointmentModalOpen} onClose={closeAppointmentModal}>
        <div>{<AppointmentModal onClose={closeAppointmentModal} />}</div>
      </Modal>

      <section className="ce-px ce-py grid xl:grid-cols-[1fr_auto] xl:items-start gap-5">
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
              className="!bg-ce-green [z-index:2]"
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
            <FacilityAdminDashboardSub />
          ) : (
            <ReceptionistDashboardSub />
          )}
        </div>

        <div className="bg-white rounded-[20px] px-3 grid gap-x-5 md:grid-cols-2 xl:grid-cols-[unset] xl:block">
          <DashboardCalendar
            date={date}
            onDateChange={(value) => {
              setDate(value);
            }}
          />
          <AppointmentTimeLine data={appointmentData} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
