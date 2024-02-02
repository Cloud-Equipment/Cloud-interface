import { useState } from 'react';

import {
  Modal,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';

import * as Assets from '@cloud-equipment/assets';
import { Table } from '../../../../components';

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('dateTimeAdded', {
    header: 'Date & Time',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Procedure/Test Ordered',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Age of Patient',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('2FaStatus', {
    header: "Referrer's Name",
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
    header: 'Phone Number',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lastLogin', {
    header: 'Amount',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('elipsis', {
    cell: ({
      row: {
        original: { id },
      },
    }) => {
      return <ManageReportDropdown {...{ id }} />;
    },
    header: '',
  }),
];

const ViewFacilityReport = () => {
  return (
    <>
      <div className="bg-white px-3.5 py-5 rounded-[20px]">
        <div className="">
          <div className="mb-3">
            <h5 className="text-primary-150 font-playfair text-lg font-bold leading-[28px]">
              Facility Report
            </h5>
            <p className="text-neutral-300 font-dmsans font-normal leading-[20px]">
              You are to populate the Rebate Amount to efficiency calculate a
              deduction
            </p>
          </div>

          {/* Table */}
          <Table
            loading={false}
            data={[]}
            columns={columns}
            tableHeading={`All Reports`}
          />
        </div>
      </div>
    </>
  );
};

export default ViewFacilityReport;

const ManageReportDropdown = ({ id }: { id: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
