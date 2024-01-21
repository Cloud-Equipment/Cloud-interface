import { useState, useMemo } from 'react';

import {
  Modal,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { useParams } from 'react-router-dom';

import { Table } from '../../../../components';
import { InviteUserModal, CreateUserModal } from '../../../../Modals';
import { Button } from '@cloud-equipment/ui-components';
import * as Assets from '@cloud-equipment/assets';
import queries from '.././../../../services/queries/manageFacility';

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
      // REFACTOR: is this necessary
      const cb = (e: React.MouseEvent<HTMLButtonElement>) => {
        // console.log('e', e);
      };
      return <ManageStaffDropDown {...{ cb, id }} />;
    },
    header: '',
  }),
];

const ViewFacility = () => {
  const { id } = useParams();
  const { useGetFacilityUser } = queries;
  const { isLoading, data } = useGetFacilityUser(
    '/user-manager/account/user/getallusersfacility?currentPage=1&startIndex=1&pageSize=10',
    { facilityId: id },
    {},
    '1'
  );

  const [modalsState, setModalsState] = useState({
    inviteModal: false,
    createModal: false,
  });

  const memoizedDate = useMemo(() => {
    if (data && data?.resultItem?.length > 0) {
      return data?.resultItem.map(
        ({ firstName, lastName, role, lastLogin, dateCreated, id }) => ({
          name: `${firstName} ${lastName}`,
          email: '',
          '2FaStatus': 'Enabled',
          role: role || 'Receptionist',
          lastLogin,
          dateTimeAdded: dateCreated,
          id,
        })
      );
    }
    return [];
  }, [data]);

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
            loading={isLoading}
            data={memoizedDate}
            columns={columns}
            tableHeading={`Team members - ${memoizedDate?.length}`}
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

const ManageStaffDropDown = ({
  cb,
  id,
}: {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    cb(event);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = () => {};

  return (
    <div>
      <button
        onClick={(e) => {
          handleActionClick(e);
        }}
        className="w-6"
      >
        <img src={Assets.Icons.Menudots} alt="" />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {}}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Disable User</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Enable 2FA</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

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
