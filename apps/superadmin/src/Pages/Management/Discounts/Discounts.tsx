import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import {
  Modal,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import * as Assets from '@cloud-equipment/assets';
import { Button, NavTab2 } from '@cloud-equipment/ui-components';
import { Table } from '../../../components';
import { IDiscount } from '../../../services/queries/manageDiscounts/types';
import queries from '../../../services/queries/manageDiscounts';
import DiscountModal from './DiscountModal';
import { DiscountsActionModalType } from '../../../Modals';

export type DiscountsActionModalType = null | 'create' | 'approve' | 'reject';
export type DiscountModalViews = 'create' | 'view' | 'edit' | null;

type DiscountTableColumns = Pick<
  IDiscount,
  | 'startDate'
  | 'discountName'
  | 'discountCode'
  | 'endDate'
  | 'isActive'
  | 'discountId'
> & { elipsis: 'elipsis'; discountCategory: string };

const columnHelper = createColumnHelper<DiscountTableColumns>();

const columns = (handleApproveModal: (value: DiscountModalViews) => void) => [
  columnHelper.accessor('startDate', {
    header: 'Date Created',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('discountCategory', {
    header: 'Discount Category',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('discountName', {
    header: 'Coupon Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('discountCode', {
    header: 'Coupon Code',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('endDate', {
    header: 'Expiration Date',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('isActive', {
    header: 'Status',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('elipsis', {
    cell: ({
      row: {
        original: { discountId },
      },
    }) => {
      return (
        <ManageFacilityDropDown id={discountId} {...{ handleApproveModal }} />
      );
    },
    header: '',
  }),
];

const Discounts = () => {
  const params = useParams();

  const { useGetDiscounts } = queries;
  const { isLoading, data } = useGetDiscounts(
    `/payment/discounts/getactivediscount/facilityId?facilityId=${params?.id}`,
    { staleTime: 1000, enabled: !!params?.id }
  );

  const [selectedDiscount, setSelectedDiscount] = useState<null | IDiscount>(
    null
  );

  //   modal
  const [discountModal, setDiscountModal] = useState<{
    currentView: 'create' | 'view' | 'edit' | null;
  }>({
    currentView: 'view',
  });

  const [actionsModal, setActionsModal] = React.useState<{
    currentView: DiscountsActionModalType;
  }>({
    currentView: null,
  });

  //   table
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {};

  //   modal
  const openDiscountModal = () => {
    setSelectedDiscount(null);
    setDiscountModal({ currentView: 'create' });
  };

  const closeDiscountModal = () => setDiscountModal({ currentView: null });
  const closeActionsModal = () => setActionsModal({ currentView: null });

  // Pagination
  const handleChangeRowsPerPage = (event: any) => {
    // setCurrentPage(0);
    // setPageSize(parseInt(event.target.value, 10));
  };

  return (
    <>
      {/* Create Discount Modal */}
      <Modal open={!!discountModal.currentView} onClose={closeDiscountModal}>
        <div>
          {
            <DiscountModal
              discountData={selectedDiscount}
              onClose={closeDiscountModal}
              type={discountModal.currentView}
            />
          }
        </div>
      </Modal>
      {/* view/approve discount modal */}
      <Modal open={!!actionsModal.currentView} onClose={closeDiscountModal}>
        <div>
          {
            <DiscountsActionModalType
              onClose={closeActionsModal}
              currentView={actionsModal.currentView}
            />
          }
        </div>
      </Modal>

      <section className="ce-px ce-py">
        <div className="flex justify-end gap-4 flex-wrap mt-5">
          <button onClick={openDiscountModal} className="ce-btn">
            New Discount
          </button>
        </div>

        <div className="p-[16px] bg-[white] mt-[20px] rounded-[20px]">
          <h5 className="font-semibold text-lg">Available Discounts</h5>

          <div className="grid my-5 gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
            <div className="col-span-2 lg:col-span-[unset] lg:w-[50%] search-input-container">
              <input placeholder="Search for Services" />
              <img src={Assets.Icons.Search} alt="Search Icon" />
            </div>

            <div className="sort-container">
              <span className="sort-text">All Category:</span>

              <span className="sort-value">Show All</span>

              <img src={Assets.Icons.SolidArrowDown} alt="" />
            </div>

            <button className="export-btn">
              <img src={Assets.Icons.ExportIcon} alt="" />
              <span>Export</span>
            </button>
          </div>
          <NavTab2
            links={[
              {
                label: 'All Discount',
                param: 'all',
                selected: false,
              },
              {
                label: 'Approved Discount',
                param: 'approved',
                selected: false,
              },
              {
                label: 'Pending Discount',
                param: 'pending',
                selected: false,
              },
            ]}
            wrapperClass=""
          />
          <Table
            loading={isLoading}
            data={data || []}
            columns={columns((value: DiscountModalViews) =>
              setDiscountModal({ currentView: value })
            )}
            tableHeading={`Discounts -`}
          />
        </div>
      </section>
    </>
  );
};

export default Discounts;

const ManageFacilityDropDown = ({
  id,
  handleApproveModal,
}: {
  id: string;
  handleApproveModal: (value: DiscountModalViews) => void;
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = () => {
    navigate(`/management/discounts`);
  };

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
        <MenuItem onClick={handleMenuAction}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>View Discounts</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleApproveModal('view')}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Approve Discounts</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleApproveModal('edit')}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Edit Discounts</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
