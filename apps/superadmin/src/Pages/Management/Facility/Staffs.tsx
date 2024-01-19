import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { Modal } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';

import { Table } from '../../../components';
import { InviteUserModal, CreateUserModal } from '../../../Modals';
import { Button, NavTab } from '@cloud-equipment/ui-components';
import * as Assets from '@cloud-equipment/assets';
import { copyToClipboard } from '../../../utils';

const data = [
  {
    dateTimeAdded: '01-12-2023 . 10:23.27',
    name: 'Emmanuel Abdullahi S.',
    email: 'emmanuel@ce.io',
    '2FaStatus': 'Enabled',
    role: 'Receptionist',
    lastLogin: 'Sep 26, 2023, 12:41PM',
  },
  {
    dateTimeAdded: '01-12-2023 . 10:23.27',
    name: 'Emmanuel Abdullahi S.',
    email: 'emmanuel@ce.io',
    '2FaStatus': 'Enabled',
    role: 'Receptionist',
    lastLogin: 'Sep 26, 2023, 12:41PM',
  },
  {
    dateTimeAdded: '01-12-2023 . 10:23.27',
    name: 'Emmanuel Abdullahi S.',
    email: 'emmanuel@ce.io',
    '2FaStatus': 'Enabled',
    role: 'Receptionist',
    lastLogin: 'Sep 26, 2023, 12:41PM',
  },
];

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('dateTimeAdded', {
    header: 'Date & Time Added',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email Address',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('2FaStatus', {
    header: '2FA Status',
    cell: (info) => {
      return (
        <span className="flex gap-1 items-center">
          <div className="w-[5px] h-[5px] bg-primary-300 rounded-full"></div>{' '}
          {info.getValue()}
        </span>
      );
    },
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lastLogin', {
    header: 'Last login',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('elipsis', {
    cell: ({
      row: {
        original: { id },
      },
    }) => {
      return (
        <button
          onClick={(e) => {
            console.log('clicked');
          }}
          className="w-6"
        >
          <img src={Assets.Icons.Menudots} alt="" />
        </button>
      );
    },
    header: '',
  }),
];

const ViewFacility = () => {
  const { id } = useParams();
  const [modalsState, setModalsState] = useState({
    inviteModal: false,
    createModal: false,
  });
  return (
    <>
      <div className="flex min-h-screen w-[95%] mx-auto gap-6 pt-6 bg-primary-200">
        <div className="w-[30%] bg-white rounded-[20px] min-h-[450px] px-3.5 py-5 flex flex-col">
          <div className="flex gap-4">
            <div className="rounded-full w-14 h-14 border"></div>
            <div className="">
              <h5 className=" font-medium text-2xl leading-[2.0625rem]">
                Agape Laboratory
              </h5>
              <p className="text-sm font-normal leading-[1.1875rem] text-neutral-150">
                Added on Oct 23, 2023
              </p>
            </div>
            <div className="font-dmsans text-neutral-200 text-sm font-normal leading-[1.125rem]">
              5.0
            </div>
          </div>
          <div className="my-10">
            <div className="rounded-full w-16 h-16 border"></div>
            <h5 className="text-2xl font-medium leading-[2.0625rem] text-secondary-350">
              Emmanuel Abubakar
            </h5>
            <p className="text-neutral-150 text-sm font-normal leading-[1.1875rem]">
              Chief Medical Doctor
            </p>
          </div>
          <div className="[&>div]:text-sm [&>div]:font-normal [&>div]:leading-[1.1875rem] [&>div]:text-secondary-400 [&>div]:border-b [&>div]:border-secondary-200 [&>div]:mb-5 [&>div]:pb-4">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <img alt="" src={Assets.Icons.UserIcon} className="" /> CE/001{' '}
              </div>
              <img
                src={Assets.Icons.CopyIcon}
                className="cursor-pointer"
                onClick={() => copyToClipboard('CE/001')}
                alt=""
              />
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <img alt="" src={Assets.Icons.MailIcon} className="" />{' '}
                devendrac11@gmail.com{' '}
              </div>
              <img
                src={Assets.Icons.CopyIcon}
                className="cursor-pointer"
                alt=""
                onClick={() => copyToClipboard('devendrac11@gmail.com')}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <img alt="" src={Assets.Icons.PhoneIcon} /> 234(0)812345667{' '}
              </div>
              <img
                src={Assets.Icons.CopyIcon}
                className="cursor-pointer"
                alt=""
                onClick={() => copyToClipboard('234(0)812345667')}
              />
            </div>
            <div className="flex">No 4, Karu L.G.A., Nasarawa State</div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <img alt="" src={Assets.Icons.WarningIcon} /> Blacklist Facility
              </div>
            </div>
          </div>
          <div className="flex">
            <Button
              className="bg-primary-250 !text-primary-150"
              icon={Assets.Icons.EditIcon}
              label="Edit"
            />
          </div>
        </div>
        <div className="w-[70%] rounded-[20px] gap-6 min-h-[450px]  flex flex-col">
          <div className="bg-white px-3.5 py-5">
            <h5 className="mb-3">Facility Details</h5>
            <NavTab
              links={[
                {
                  label: 'About',
                  href: `/management/facility/viewFacility/${id}/about`,
                },
                {
                  label: 'Report',
                  href: `/management/facility/viewFacility/${id}/report`,
                },
                {
                  label: 'Staffs',
                  href: `/management/facility/viewFacility/${id}/staffs`,
                },
                {
                  label: 'Payment',
                  href: `/management/facility/viewFacility/${id}/payment`,
                },
                {
                  label: 'Equipments',
                  href: `/management/facility/viewFacility/${id}/equipment`,
                },
                {
                  label: 'Tickets',
                  href: `/management/facility/viewFacility/${id}/tickets`,
                },
                {
                  label: 'Reviews',
                  href: `/management/facility/viewFacility/${id}/reviews`,
                },
              ]}
              wrapperClass="mt-6"
            />
          </div>

          <div className="bg-white px-3.5 py-5 rounded-[20px]">
            <div className="w-full flex justify-end">
              <div className="flex gap-3 items-center">
                <Button
                  className="bg-primary-100"
                  label="Create User"
                  onClick={() =>
                    setModalsState((prev) => ({ ...prev, createModal: true }))
                  }
                />
                <Button
                  variant="neutral"
                  label="Invite User"
                  onClick={() =>
                    setModalsState((prev) => ({ ...prev, inviteModal: true }))
                  }
                />
                Manage Roles
              </div>
            </div>
            <div className="">
              <div className="mb-3">
                <h5 className="">Facility Users</h5>
                <p className="">
                  You are to populate the Rebate Amount to efficiency calculate
                  a deduction
                </p>
              </div>

              <div className="grid  gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
                <div className="col-span-2 lg:w-[40%] search-input-container">
                  <input placeholder="Search User Name" />
                  <img src={Assets.Icons.Search} alt="Search Icon" />
                </div>

                <div className="sort-container">
                  <span className="sort-text">Role:</span>

                  <span className="sort-value">Show All</span>

                  <img src={Assets.Icons.SolidArrowDown} alt="" />
                </div>

                <button className="filter-btn">
                  <img src={Assets.Icons.ExportIcon} alt="" />
                  <span>Filter</span>
                </button>
                <button className="export-btn">
                  <img src={Assets.Icons.ExportIcon} alt="" />
                  <span>Export</span>
                </button>
              </div>

              {/* Table */}
              <Table
                loading={false}
                data={data}
                columns={columns}
                tableHeading="Team members - 5"
                tableHeadingColorClassName=""
              />
            </div>
          </div>
        </div>
      </div>
      <InviteModal
        open={modalsState.inviteModal}
        onClose={() =>
          setModalsState((prev) => ({ ...prev, inviteModal: false }))
        }
      />
      <CreateModal
        open={modalsState.createModal}
        onClose={() =>
          setModalsState((prev) => ({ ...prev, createModal: false }))
        }
      />
    </>
  );
};

export default ViewFacility;

const InviteModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div>{<InviteUserModal onClose={onClose} />}</div>
    </Modal>
  );
};

const CreateModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div>{<CreateUserModal onClose={onClose} />}</div>
    </Modal>
  );
};
