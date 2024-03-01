import { useState } from 'react';

import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';

import * as Assets from '@cloud-equipment/assets';
import { Table } from '../../../../components';

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('dateTimeAdded', {
    header: 'Date & Time Paid',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('reference', {
    header: 'Reference',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('channel', {
    header: 'Channel',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('elipsis', {
    cell: ({
      row: {
        original: { id },
      },
    }) => {
      return <ManagePaymentDropdown {...{ id }} />;
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
              Facility Payment
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
            tableHeading={`All Payment`}
          />
        </div>
      </div>
    </>
  );
};

export default ViewFacilityReport;

const ManagePaymentDropdown = ({ id }: { id: string }) => {
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
          <ListItemIcon>
            {' '}
            <img alt="" src={Assets.Icons.ViewPaymentDetails} />{' '}
          </ListItemIcon>
          <ListItemText>View Detail</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
