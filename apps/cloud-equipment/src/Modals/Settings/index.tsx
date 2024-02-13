import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Assets from '@cloud-equipment/assets';
import { Button, Input } from '@cloud-equipment/ui-components';
import { SettingsValidations } from '../../schemas';

interface FormProps {
  password: string;
  confirmPassword: string;
}

const SettingsModal = ({
  onClose,
  type,
  onSubmitPassword,
}: {
  onClose: () => void;
  type: any;
  onSubmitPassword: () => void;
}) => {
  const params = useParams();

  const [createDiscountModalPromptIsOpen, setCreateDiscountModalPromptIsOpen] =
    useState(false);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(SettingsValidations),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: FormProps) => {
    console.log('data', data);
    onSubmitPassword();
  };

  if (type === 'changePassword') {
    return (
      <>
        <div className="bg-white p-10 lg:p-14 centered-modal-md gap-7 rounded-2xl">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-2xl font-dmsans font-normal leading-[36px]">
              Change Password
            </h4>
            <button
              onClick={() => {
                onClose();
              }}
              className="btn-icon  rounded-full overflow-hidden"
            >
              <img src={Assets.Icons.BoxCloseIcon} alt="" />
            </button>
          </div>

          <form
            className="mt-6 flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Create New Password"
              placeholder="Enter New Password"
              error={errors?.password}
              type="password"
              {...register('password', {
                required: 'Password is required ',
              })}
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm Password"
              error={errors?.confirmPassword}
              type="password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required ',
              })}
            />

            <Button
              loading={false}
              className="md:w-[200px]"
              label="Upload Discount"
            />
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="bg-white p-10 lg:p-14 centered-modal-md gap-7 rounded-2xl">
          <div className="flex items-center justify-end mb-10">
            <button
              onClick={() => {
                onClose();
              }}
              className="btn-icon  rounded-full overflow-hidden"
            >
              <img src={Assets.Icons.BoxCloseIcon} alt="" />
            </button>
          </div>

          <div className="flex flex-col text-center">
            <div className="flex justify-center mb-5">
              <img src={Assets.Icons.SuccessfulPasswordChange} alt="icon" />
            </div>
            <h5 className="font-playfair text-lg font-bold leading-[24px] text-secondary-400 mb-2">
              Password Successfully created
            </h5>
            <p className="font-manrope text-base font-normal leading-[20px] text-secondary-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
            <Button
              label="Okay"
              variant="neutral"
              onClick={onClose}
              className="mt-3 border-primary-150 text-primary-150 w-7/12 mx-auto hover:border-primary-150"
            />
          </div>
        </div>
      </>
    );
  }
};

export default SettingsModal;
