import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import generator from 'generate-password-ts';
import { useParams } from 'react-router-dom';

import { Select, Input } from '../../components';

import { clearLoading, setLoading } from '@cloud-equipment/shared_store';
import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';
import queries from '../../services/queries/manageFacility';

interface FormProps {
  email: string;
  roles: string[];
  [key: string]: string | string[];
}

const CreateUserModal = ({
  onClose,
  procedureToEdit,
}: {
  onClose: () => void;
  procedureToEdit?: any;
}) => {
  const { id } = useParams();
  const [autogeneratePassword, setAutogeneratePassword] = useState(false);

  const { useCreateUser } = queries;
  const { isLoading, mutateFn } = useCreateUser();

  const { register, handleSubmit, control, setValue } = useForm<FormProps>();

  const onSubmit = (data: FormProps) => {
    const dataToSubmit = {
      ...data,
      facilityId: id,
      roles: [data.roles],
    };
    mutateFn(dataToSubmit, () => {
      onClose();
    });
  };

  // auto generate password
  useEffect(() => {
    if (autogeneratePassword) {
      setValue(
        'password',
        generator.generate({
          length: 15,
          numbers: true,
          symbols: true,
        })
      );
    } else {
      setValue('password', '');
    }
  }, [autogeneratePassword]);

  return (
    <div className="bg-white p-10 lg:p-14 centered-modal-large">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-x-2">
        <h4 className="font-nunito text-[2.625rem] font-bold leading-[57px] text-neutral-350">
          Create User Facility
        </h4>

        <div className="grid grid-cols-2 gap-10 mb-5">
          <Input
            label="First Name"
            containerClass=""
            placeholder="website@mongoro.com"
            {...register('firstName', {
              required: 'First Name is required ',
            })}
          />
          <Input
            label="Last Name"
            containerClass=""
            placeholder="website@mongoro.com"
            {...register('lastName', {
              required: 'Last Name is required ',
            })}
          />

          <label className="flex col-span-2 gap-2">
            <input
              type="checkbox"
              checked={autogeneratePassword}
              onChange={() => setAutogeneratePassword((prev) => !prev)}
            />
            <p>Autogenerate Password</p>
          </label>

          {!autogeneratePassword && (
            <div className="col-span-2">
              <Input
                label="Password*"
                containerClass=""
                type="password"
                placeholder=""
                {...register('password', {
                  required: 'Password is required ',
                })}
              />
            </div>
          )}

          <Input
            label="Email Address*"
            containerClass=""
            placeholder="myname@example.com"
            {...register('email', {
              required: 'Email is required ',
            })}
          />
          <Input
            label="Mobile Number*"
            containerClass=""
            placeholder="+234 08143626356"
            {...register('phone', {
              required: 'Mobile Number is required ',
            })}
          />

          <Controller
            name="gender"
            control={control}
            // defaultValue={''}
            render={({ field }) => (
              <Select
                options={[
                  {
                    categoryName: 'Male',
                    categoryId: 'Male',
                  },
                  {
                    categoryName: 'Female',
                    categoryId: 'Female',
                  },
                ]}
                label="Gender"
                placeHolder="Select Gender"
                {...{ field }}
              />
            )}
          />
          <Controller
            name="roles"
            control={control}
            // defaultValue={''}
            render={({ field }) => (
              <Select
                options={[
                  {
                    value: 'Receptionist',
                    label: 'Receptionist',
                    categoryName: 'Receptionist',
                    categoryId: 'Receptionist',
                  },
                  {
                    value: 'FacilityAdmin',
                    label: 'Admin',
                    categoryName: 'Admin',
                    categoryId: 'FacilityAdmin',
                  },
                ]}
                label="Role Type"
                placeHolder="Select Role Type"
                {...{ field }}
              />
            )}
          />
          <div className="">
            <Button
              label="Create User"
              className="bg-primary-150 md:w-[65%]"
              loading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUserModal;
