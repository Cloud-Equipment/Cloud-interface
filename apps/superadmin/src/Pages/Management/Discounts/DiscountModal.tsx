import { IDiscount } from 'Models/discount.models';
import React, { useState } from 'react';
import * as Assets from '@cloud-equipment/assets';
import {
  Input,
  TextArea,
  DatePicker,
  FileUpload,
  Select,
} from '../../../components';
import { Controller, useForm } from 'react-hook-form';

const DiscountModal = ({
  discountData,
  onClose,
}: {
  discountData: IDiscount | null;
  onClose: () => void;
}) => {
  const { register, handleSubmit, control, getValues, setValue, watch } =
    useForm();

  return (
    <>
      <div className="bg-white px-6 py-10 right-modal">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl">
            {discountData ? 'Edit Discount' : 'Create Discount'}
          </h4>
          <button
            onClick={() => {
              onClose();
            }}
            className="btn-icon"
          >
            <img src={Assets.Icons.BoxCloseIcon} alt="" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <Controller
            name="patientGenderId"
            control={control}
            render={({ field }) => (
              <Select
                options={[]}
                label="Discount Category"
                placeholder="Select Discount Category"
                containerClass="flex-1"
                {...{ field }}
              />
            )}
          />
          <Input label="Coupon Name" />
          <Input label="Discount Code" />
          <Input label="Discount Amount" />
          <Input
            containerClass="md:col-span-2"
            label="Select Procedures for Discount"
          />
          <Input label="Discount Start Date" />
          <Input label="Discount Start Time" />
        </div>

        <button className="ce-btn bg-greenText md:w-[200px] block mt-10">
          Upload Discount
        </button>
      </div>
    </>
  );
};

export default DiscountModal;
