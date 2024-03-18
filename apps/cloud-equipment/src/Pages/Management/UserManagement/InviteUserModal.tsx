import React, { useState, useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Autocomplete, MenuItem, TextField } from '@mui/material';

import { UserTypeEnum } from '@cloud-equipment/models';
import { IAppState } from '../../../Store/store';
import queries from '../../../services/queries/manageUsers';
import { Button, Input, Select } from '@cloud-equipment/ui-components';
import * as Assets from '@cloud-equipment/assets';
import { useDebounce } from '@cloud-equipment/hooks';

export const InviteUserModal = ({ onClose, openCreateModalFn }: any) => {
  const { register, handleSubmit, control, watch, setValue } = useForm();

  const [email, setEmail] = useState('');
  const debouncedSearch = useDebounce(email, 1000);

  const userDetails = useSelector((state: IAppState) => state.auth.user);

  const { useInviteUser, useGetUsers } = queries;
  const { mutateFn, isLoading } = useInviteUser();
  const { data: users } = useGetUsers(
    `/user-manager/account/user/getallusersfacility?facilityId=${userDetails?.FACILITY_ID}&download=true`,
    null,
    { enabled: !!userDetails?.FACILITY_ID }
    // debouncedSearch
  );

  const onSubmit = (data: any) => {
    if (data.email) {
      mutateFn(
        {
          ...data,
        },
        () => {
          onClose();
        }
      );
    }
  };

  const handleSelectedEmailFromSearch = (selectedEmail: any) => {
    setValue('email', selectedEmail?.email);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-10 lg:p-14 grid gap-5 centered-modal"
    >
      <h4>Invite Patient</h4>

      <div className="form-input-label-holder">
        <label>Patient Email</label>
        <Autocomplete
          freeSolo
          placeholder="Type email to search for user"
          options={users?.resultItem ?? []}
          onInputChange={(event, newInputValue) => {
            setEmail(newInputValue);
          }}
          onChange={(event, selectedOption) => {
            handleSelectedEmailFromSearch(selectedOption as unknown as any);
          }}
          renderInput={(params: any) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
          getOptionLabel={(option) => {
            return (option as any).email;
          }}
          renderOption={(props, option: any) => (
            <MenuItem {...props}>
              <div className="rounded flex items-center space-x-5 px-3 py-2">
                <img
                  src={Assets.Icons.DummyUser}
                  className="w-10 rounded-[10px]"
                  alt=""
                />
                <div>
                  <p className="font-semibold text-sm">{option.email}</p>
                </div>
              </div>
            </MenuItem>
          )}
        />
      </div>

      {/* <div className="form-input-label-holder flex flex-col gap-1">
        <Controller
          name="roles"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <Select
              options={[
                {
                  value: UserTypeEnum.FACILITY_ADMIN,
                  label: 'Facility Admin',
                  categoryId: UserTypeEnum.FACILITY_ADMIN,
                  categoryName: 'Facility Admin',
                },
                {
                  value: UserTypeEnum.RECEPTIONIST,
                  label: 'Receptionist',
                  categoryId: UserTypeEnum.RECEPTIONIST,
                  categoryName: 'Receptionist',
                },
              ]}
              label="Choose Role"
              placeholder="Select Role"
              containerClass="flex-1"
              {...{ field }}
            />
          )}
        />
      </div> */}
      <p className="text-xs ">
        User does not Exist?{' '}
        <span
          className="text-primary-150 cursor-pointer"
          onClick={openCreateModalFn}
        >
          Create User
        </span>{' '}
      </p>
      <Button loading={isLoading} label="Invite Team Member" />
    </form>
  );
};
