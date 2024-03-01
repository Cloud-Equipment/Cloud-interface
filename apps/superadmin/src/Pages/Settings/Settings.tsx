import { useEffect, useMemo } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Switch } from '@mui/material';
import { useSelector } from 'react-redux';

import { Input } from '../../components';
import { Button, NavTab } from '@cloud-equipment/ui-components';
import * as Assets from '@cloud-equipment/assets';
import { IAppState } from '../../Store/store';
import { ISettings } from '../../services/queries/manageSettings/types';
import queries from '../../services/queries/manageSettings';

const Settings = () => {
  const { useUpdateSettings, useGetSettings } = queries;
  const userDetails = useSelector((state: IAppState) => state.auth.user);
  const { mutateFn, isLoading } = useUpdateSettings(
    {},
    `${userDetails?.USER_ID}`
  );
  const { data } = useGetSettings<{ email: string }>(
    `/user-manager/account/ceuser/getsuperadminbyid?saId=${userDetails?.USER_ID}`,
    userDetails?.USER_ID,
    {}
  );

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<ISettings & { email: string }>({
    defaultValues: useMemo(() => {
      return {
        id: data?.id,
        firstName: data?.firstName,
        lastName: data?.lastName,
        twoFactorEnabled: data?.twoFactorEnabled || false,
        phoneNumber: data?.phoneNumber,
        email: data?.email,
      };
    }, [data]),
  });

  console.log(errors);

  useEffect(() => {
    reset({
      id: data?.id,
      firstName: data?.firstName,
      lastName: data?.lastName,
      twoFactorEnabled: data?.twoFactorEnabled || false,
      phoneNumber: data?.phoneNumber,
      email: data?.email,
    });
  }, [data]);

  const onSubmit = (data: ISettings) => {
    data.id = userDetails?.USER_ID || '';
    mutateFn(data, () => {});
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
            className="active:border-primary-100 focus:outline-primary-100"
            label="First Name"
            containerClass="flex-1"
            {...register('firstName', {
              required: 'First Name is required',
            })}
          />
          <Input
            className="active:border-primary-100 focus:outline-primary-100"
            label="Last Name"
            containerClass="flex-1"
            {...register('lastName', {
              required: 'Last Name is required',
            })}
          />
          <Input
            className="active:border-primary-100 focus:outline-primary-100"
            label="Phone Number"
            containerClass="flex-1"
            {...register('phoneNumber', {
              required: 'Phone Number is required',
            })}
          />
          <Input
            className="active:border-primary-100 focus:outline-primary-100"
            label="Email Address"
            containerClass="flex-1"
            disabled
            {...register('email', {
              required: 'Email Address is required',
            })}
          />
        </div>

        <div className="my-5 2xl:my-8 grid grid-cols-[auto_auto] justify-between gap-x-3 md:gap-x-10 gap-y-5 xl:gap-y-7 md:w-fit 2xl:w-[55%]">
          <p className="font-medium">Admin Position</p>
          <p className="font-semibold text-sm text-center text-greyText2 bg-greyBg rounded-xl px-3 py-2">
            {userDetails?.userType}
          </p>
          <p className="font-medium">Password</p>
          <p className="font-semibold text-sm bg-lightGreen text-center text-greenText rounded-xl px-3 py-2">
            Change Password
          </p>
          <p className="font-medium">Two-Factor Authentication</p>
          <Controller
            name="twoFactorEnabled"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch checked={value} onChange={onChange} />
            )}
          />
        </div>

        <Button
          loading={isLoading}
          label="Save changes"
          variant="primary"
          type="submit"
        />
      </form>
    </section>
  );
};

export default Settings;
