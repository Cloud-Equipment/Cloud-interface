import React, { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Modal } from '@mui/material';

import { IDiscount } from '../../../services/queries/manageDiscounts/types';
import * as Assets from '@cloud-equipment/assets';
import {
  DatePicker,
  Input,
  Select,
  TimePicker,
  TextArea,
} from '../../../components';
import { Button } from '@cloud-equipment/ui-components';
import queries from '../../../services/queries/manageDiscounts';
import { AddNewDiscountModal } from '../../../Modals';

const DiscountModal = ({
  discountData,
  onClose,
  type,
}: {
  discountData: IDiscount | null;
  onClose: () => void;
  type: 'view' | 'create' | null | 'edit';
}) => {
  const params = useParams();

  const { useCreateDiscount } = queries;
  const { mutateFn, isLoading } = useCreateDiscount();

  const [createDiscountModalPromptIsOpen, setCreateDiscountModalPromptIsOpen] =
    useState(false);

  const onCloseCreateModal = () => {
    setCreateDiscountModalPromptIsOpen(false);
    onClose();
  };

  const onSubmit1 = () => {
    setCreateDiscountModalPromptIsOpen(true);
  };

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<IDiscount>({
    defaultValues: discountData ? discountData : {},
  });

  const onSubmit = () => {
    const {
      discountTypeId,
      discountName,
      discountCode,
      discountPercent,
      procedureId,
      startDate,
    } = getValues();
    const formedData = {
      discountTypeId,
      discountName,
      discountCode,
      discountPercent,
      procedureId,
      startDate,
      facilityId: params.id || '',

      // NOTE: Not accounted for on the UI
      discountId: '0',
      endDate: new Date().toISOString(),
      isActive: true,

      // NOTE: Not accounted for in the endpoint
      // description: string;
      // notify user: string;
      // start time: string;
      // discount type: string;
    };
    console.log('data', formedData);
    mutateFn(formedData, (res) => {
      onCloseCreateModal();
      console.log('res', res);
    });
  };

  if (['create', 'edit'].includes(`${type}`)) {
    return (
      <>
        <div className="bg-white px-6 py-10 rounded-tl-[20px] rounded-bl-[20px] right-modal">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-2xl">
              {discountData ? 'Edit Discount' : 'Create New Discount'}
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

          <form
            className="grid md:grid-cols-2 gap-5 mt-6"
            onSubmit={handleSubmit(onSubmit1)}
          >
            <Controller
              name="discountTypeId"
              control={control}
              render={({ field }) => (
                <Select
                  options={[
                    {
                      value: 1,
                      label: 'Facilities Discount',
                      categoryName: 'Facilities Discount',
                      categoryId: 1,
                    },
                    {
                      value: 0,
                      label: 'Flat Rate',
                      categoryName: 'Flat Rate',
                      categoryId: 0,
                    },
                  ]}
                  label="Select Discount Category"
                  placeholder="Select Discount Category"
                  containerClass="flex-1"
                  {...{ field }}
                />
              )}
            />
            <Controller
              name="discountType"
              control={control}
              render={({ field }) => (
                <Select
                  options={[
                    {
                      value: 1,
                      label: 'Flat Rate',
                      categoryName: 'Flat Rate',
                      categoryId: 1,
                    },
                    {
                      value: 0,
                      label: 'Percentage',
                      categoryName: 'Percentage',
                      categoryId: 0,
                    },
                  ]}
                  label="Select discount type"
                  placeholder="Select discount type"
                  containerClass="flex-1"
                  {...{ field }}
                />
              )}
            />
            <Input
              label="Coupon Name"
              placeholder="Enter Coupon Name"
              {...register('discountName', {
                required: 'Coupone Name is required ',
              })}
            />
            <Input
              label="Discount Code"
              placeholder="Enter Discount Name"
              {...register('discountCode', {
                required: 'Discount Code is required ',
              })}
            />
            <Input
              label="Discount Percentage"
              placeholder="Enter Discount Percentage"
              {...register('discountPercent', {
                required: 'Discount Percentage is required ',
              })}
            />
            <Input
              containerClass="md:col-span-2"
              label="Discount/Coupon Description"
              placeholder="Enter Coupon Description"
              {...register('discountDescription', {
                required: 'Description is required ',
              })}
            />
            <Input
              containerClass="md:col-span-2"
              label="Select Procedures for Discount"
              placeholder="Select procedure for Discount"
              {...register('procedureId', {
                required: 'Procedure is required ',
              })}
            />
            <Controller
              name="startDate"
              control={control}
              // defaultValue={0}
              render={({ field: { onChange, value, ref } }) => (
                <DatePicker
                  label="Discount Start Date"
                  containerClass="flex-1"
                  onChange={onChange}
                  onAccept={onChange}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
            <Controller
              name="discountStartTime"
              control={control}
              // defaultValue={0}
              render={({ field: { onChange, value, ref } }) => (
                <TimePicker
                  label="Discount Start Time"
                  containerClass="flex-1"
                  onChange={onChange}
                  onAccept={onChange}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
            <label className="flex col-span-2 gap-2 my-10">
              <input type="checkbox" />
              <p>Notify our Customer about this discount</p>
            </label>

            <Button
              loading={isLoading}
              className="md:w-[200px]"
              label="Upload Discount"
            />
          </form>
        </div>
        <Modal open={createDiscountModalPromptIsOpen} onClose={onClose}>
          <AddNewDiscountModal
            isLoading={isLoading}
            onSubmit={onSubmit}
            {...{ onClose }}
          />
        </Modal>
      </>
    );
  } else if (type === 'view') {
    return (
      <>
        <div className="bg-white px-6 py-10 rounded-tl-[20px] rounded-bl-[20px] right-modal text-neutral-350 font-nunito">
          <h3 className="  text-[2.625rem] font-bold leading-[57px] text-neutral-350 font-nunito">
            Approve Discount
          </h3>
          <div className="grid md:grid-cols-2 gap-5 mt-6">
            <TitleSubtitleView
              title="Discount Category"
              subtitle="Procedure Discount"
            />
            <TitleSubtitleView title="Discount Type" subtitle="Percentage" />
            <TitleSubtitleView title="Coupon Name" subtitle="Christmas Bonus" />
            <TitleSubtitleView title="Discount Code" subtitle="ADEYORPEES" />
            <TitleSubtitleView title="Discount Percentage" subtitle="5%" />
            <TitleSubtitleView
              className="col-span-2"
              title="Discount/Coupon Description"
              subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            />
            <TitleCards
              title="Select Procedures for Discount"
              items={[
                { id: 'Diagnosis', label: 'Diagnosis' },
                { id: 'Cholesterol', label: 'Cholesterol' },
              ]}
              className="col-span-2"
            />
            <TitleSubtitleView
              title="Discount Start Date"
              subtitle="24th February, 2023"
            />
            <TitleSubtitleView title="Discount Start Time" subtitle="07:00am" />

            <TextArea
              containerClass="col-span-2"
              label="Leave a Note or reason for either Approving or Rejecting this Discount"
              value=""
              placeholder="Leave a Note"
            />
            <label className="flex col-span-2 gap-2 my-5">
              <input
                type="checkbox"
                // checked={}
                // onChange={() => {}}
              />
              <p>Notify our Customer about this discount</p>
            </label>

            <div className="flex gap-3">
              <Button className="md:w-[200px]" label="Approve Discount" />
              <Button
                variant="neutral"
                className="md:w-[200px]"
                label="Approve Discount"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default DiscountModal;

const TitleSubtitleView = ({
  title,
  subtitle,
  className = '',
}: {
  title: string;
  subtitle: string;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h5 className="text-[1.125rem] font-bold leading-[25px] text-neutral-350 font-nunito">
        {title}
      </h5>
      <p className="text-[1rem] font-normal leading-[22px] text-neutral-350 font-nunito">
        {subtitle}
      </p>
    </div>
  );
};

const TitleCards = ({
  title,
  items,
  className = '',
}: {
  title: string;
  items: { id: string; label: string }[];
  className?: string;
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h5 className="text-neutral-350 font-nunito">{title}</h5>
      <div className="flex gap-2">
        {items.map((item) => (
          <span
            className="rounded-[4px] border p-2 text-neutral-350 font-nunito"
            key={item.id}
          >
            {item.label} X
          </span>
        ))}
      </div>
    </div>
  );
};
