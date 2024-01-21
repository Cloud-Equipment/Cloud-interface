import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';
import { Routes } from '../../../routes';
import { Table } from '../../../components';
import { IDiscount } from '../../../services/queries/manageDiscounts/types';
import queries from '../../../services/queries/manageDiscounts';
import DiscountModal from './DiscountModal';
import { Modal } from '@mui/material';

export type ActionModalType = null | 'view' | 'edit' | 'delete';

type DiscountTableColumns = Pick<
  IDiscount,
  'startDate' | 'discountName' | 'discountCode' | 'endDate'
> & { elipsis: 'elipsis'; discountCategory: string };

const columnHelper = createColumnHelper<DiscountTableColumns>();

const columns = (handleActionsModalView: (view: ActionModalType) => void) => [
  columnHelper.accessor('startDate', {
    header: 'Start Date',
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
  //   columnHelper.accessor('elipsis', {
  //     cell: ({
  //       row: {
  //         original: { id },
  //       },
  //     }) => {
  //       // REFACTOR: is this necessary
  //       const cb = (e: React.MouseEvent<HTMLButtonElement>) => {
  //         // console.log('e', e);
  //       };
  //       return <ManageFacilityDropDown {...{ cb, id, handleActionsModalView }} />;
  //     },
  //     header: '',
  //   }),
];

const Discounts = () => {
  const navigate = useNavigate();

  const { useGetDiscounts } = queries;
  const { isLoading, data } = useGetDiscounts(
    `/payment/discounts/getalldiscount`
  );

  const [selectedDiscount, setSelectedDiscount] = useState<null | IDiscount>(
    null
  );

  //   modal
  const [discountModalOpen, setDiscountModalOpen] = useState(false);

  //   table
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {};

  //   modal
  const openDiscountModal = () => {
    setSelectedDiscount(null);
    setDiscountModalOpen(true);
  };
  const closeDiscountModal = () => setDiscountModalOpen(false);

  const handleChangeRowsPerPage = (event: any) => {
    // setCurrentPage(0);
    // setPageSize(parseInt(event.target.value, 10));
  };

  return (
    <>
      <Modal open={discountModalOpen} onClose={closeDiscountModal}>
        <div>
          {
            <DiscountModal
              discountData={selectedDiscount}
              onClose={closeDiscountModal}
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

          <div className="grid mt-5 gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
            <div className="col-span-2 lg:col-span-[unset] lg:w-[50%] search-input-container">
              <input placeholder="Search for Patient Name" />
              <img src={Assets.Icons.Search} alt="Search Icon" />
            </div>

            <div className="sort-container">
              <span className="sort-text">Sort by:</span>

              <span className="sort-value">Newest to Oldest</span>

              <img src={Assets.Icons.SolidArrowDown} alt="" />
            </div>

            <button className="export-btn">
              <img src={Assets.Icons.ExportIcon} alt="" />
              <span>Export</span>
            </button>
          </div>

          <div className="mt-10 ce-table-holder">
            <Table
              loading={isLoading}
              data={data}
              columns={columns(() => {})}
              tableHeading="Facilities - 5"
              tableHeadingColorClassName="!bg-secondary-150"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Discounts;
