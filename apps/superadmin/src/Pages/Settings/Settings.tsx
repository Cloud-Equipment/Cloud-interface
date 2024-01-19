import React, { useEffect } from 'react';
import { Input } from '../../components';
import { useForm } from 'react-hook-form';
import { Switch } from '@mui/material';
import { Button, NavTab } from '@cloud-equipment/ui-components';
import * as Assets from '@cloud-equipment/assets';
import { useSelector } from 'react-redux';
import { IAppState } from '../../Store/store';

interface FormProps {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  twoFA: boolean;
}

const Settings = () => {
  const { register, handleSubmit, control, getValues, setValue, watch } =
    useForm<FormProps>();

  const userDetails = useSelector((state: IAppState) => state.auth.user);

  useEffect(() => {
    setValue('email', userDetails?.email ?? '' );
  }, []);

  const onSubmit = (data: FormProps) => {
    // console.log('data', data);
  };

  return (
    <section className="ce-px ce-py">
      <form
        onSubmit={handleSubmit(onSubmit, (err) => {})}
        className="bg-white px-4 pb-6 md:px-6 md:pb-8 pt-2 rounded-[20px] mx-auto md:w-[80%] 2xl:max-w-[1100px]"
      >
        <NavTab
          links={[
            { label: 'General Settings', href: '.' },
            { label: 'Security', href: '.' },
          ]}
        />

        <img
          src={Assets.Images.Temp.DummyUserIcon3}
          alt="Profile"
          className="block mt-6 md:mt-10 w-[100px] h-[100px] rounded-full md:w-[140px] md:h-[140px]"
        />

        <div className="mt-4 2xl:mt-6 grid gap-5 2xl:gap-7 md:grid-cols-2">
          <Input
            label="First Name"
            containerClass="flex-1"
            {...register('firstName', {
              required: 'First Name is required',
            })}
          />
          <Input
            label="Last Name"
            containerClass="flex-1"
            {...register('lastName', {
              required: 'Last Name is required',
            })}
          />
          <Input
            label="Phone Number"
            containerClass="flex-1"
            {...register('phone', {
              required: 'Phone Number is required',
            })}
          />
          <Input
            label="Email Address"
            containerClass="flex-1"
            {...register('email', {
              required: 'Email Address is required',
            })}
          />
        </div>

        <div className="my-5 2xl:my-8 grid grid-cols-[auto_auto] justify-between gap-x-3 gap-y-5 xl:gap-y-7 md:w-[55%]">
          <p className="font-medium">Admin Position</p>

          <p className="font-semibold text-sm text-center text-greyText2 bg-greyBg rounded-xl px-3 py-2">
            {userDetails?.userType}
          </p>

          <p className="font-medium">Password</p>

          <p className="font-semibold text-sm bg-lightGreen text-center text-greenText rounded-xl px-3 py-2">
            Change Password
          </p>

          <p className="font-medium">Two-Factor Authentication</p>

          <Switch />
        </div>

        <Button
          // className="bg-primary-150 hover:opacity-85 border-none text-white rounded-xl"
          label="Save changes"
          variant="primary"
          type="submit"
        />
      </form>
    </section>
  );
};

export default Settings;
