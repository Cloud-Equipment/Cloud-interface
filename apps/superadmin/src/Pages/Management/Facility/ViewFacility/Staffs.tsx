import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { Modal } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';

import { Table } from '../../../../components';
import { InviteUserModal, CreateUserModal } from '../../../../Modals';
import { Button } from '@cloud-equipment/ui-components';
import * as Assets from '@cloud-equipment/assets';

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
  const [modalsState, setModalsState] = useState({
    inviteModal: false,
    createModal: false,
  });
  return (
    <>
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
              You are to populate the Rebate Amount to efficiency calculate a
              deduction
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
