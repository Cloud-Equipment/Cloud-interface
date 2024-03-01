import React from 'react';
import * as Assets from '@cloud-equipment/assets';
import { IMedservice } from '@cloud-equipment/models';
import moment from 'moment';
import numeral from 'numeral';
import { FormControlLabel, Checkbox } from '@mui/material';

const ApprovePriceModal = ({
  procedureData,
  onClose,
}: {
  procedureData: IMedservice;
  onClose: () => void;
}) => {
  return (
    <div className="bg-white px-6 py-10 centered-modal max-w-[600px]">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl">Approve Price</h4>
        <button
          onClick={() => {
            onClose();
          }}
          className="btn-icon"
        >
          <img src={Assets.Icons.BoxCloseIcon} alt="" />
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[auto_auto] justify-between">
        <div>
          <p className="font-semibold">Date & Time Added</p>
          <p className="text-greyText">
            {moment(procedureData.dateCreated).format('DD-MM-YYYY . HH:mm:ss')}
          </p>
        </div>
        <div>
          <p className="font-semibold">Procedure Category</p>
          <p className="text-greyText">{procedureData.medServiceCategoryId}</p>
        </div>
        <div>
          <p className="font-semibold">Procedure Name</p>
          <p className="text-greyText">{procedureData.medServiceName}</p>
        </div>
        <div>
          <p className="font-semibold">Price</p>
          <p className="text-greyText">
            ₦{numeral(procedureData.price).format('0,0.00')}
          </p>
        </div>
        <div>
          <p className="font-semibold">Status</p>
          <p className="bg-[#F7F7F7] w-fit text-[#77797E] rounded-2xl px-4 py-1 text-sm">
            Pending
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="font-semibold">
            Leave a Note or reason for either Approving or Rjeecting this
            Discount
          </p>

          <textarea
            className="ce-input w-full"
            name=""
            placeholder="Leave a Note"
            rows={5}
          ></textarea>
        </div>
      </div>

      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Notify our Customer about this discount"
      />

      <div className="flex space-x-5 justify-center">
        <button className="ce-btn ">Approve Price</button>
        <button className="ce-btn-outline ">Reject Price</button>
      </div>
    </div>
  );
};

export default ApprovePriceModal;
