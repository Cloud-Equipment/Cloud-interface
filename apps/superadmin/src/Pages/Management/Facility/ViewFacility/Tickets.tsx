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
    header: 'Ticket ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Date',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Service Type`',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('2FaStatus', {
    header: 'Amount',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('role', {
    header: 'Status',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('elipsis', {
    cell: ({
      row: {
        original: { id },
      },
    }) => {
      return <ManageTicketsDropDown {...{ id }} />;
    },
    header: '',
  }),
];

const ViewFacilityTicket = () => {
  return (
    <>
      <div className="bg-white px-3.5 py-5 rounded-[20px]">
        <div className="">
          <div className="mb-3">
            <h5 className="text-primary-150 font-playfair text-lg font-bold leading-[28px]">
              Facility Ticket Flow
            </h5>
            <p className="text-neutral-300 font-dmsans font-normal leading-[20px]">
              All the List of Payment will be highlighted under here
            </p>
          </div>

          {/* Table */}
          <Table
            loading={false}
            data={[]}
            columns={columns}
            tableHeading={`All Reports`}
            emptyTableLabel="No Ticket Raised for this User"
          />
        </div>
      </div>
    </>
  );
};

export default ViewFacilityTicket;

const ManageTicketsDropDown = ({ id }: { id: string }) => {
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
          <ListItemText>View Report</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Share Result</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Confirm Test</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Upload Result</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
