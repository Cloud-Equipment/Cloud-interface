import { Controller, useForm } from 'react-hook-form';
import { MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux';

import { UserTypeEnum } from '@cloud-equipment/models';
import { IAppState } from '../../../Store/store';
import queries from '../../../services/queries/manageUsers';
import { Button } from '@cloud-equipment/ui-components';

export const InviteUserModal = ({ onClose }: any) => {
  const { register, handleSubmit, control } = useForm();

  const userDetails = useSelector((state: IAppState) => state.auth.user);

  const { useInviteUser } = queries;
  const { mutateFn, isLoading } = useInviteUser();

  const onSubmit = (data: any) => {
    mutateFn({
      ...data,
      roles: [data.roles],
      password: '',
      firstName: '',
      lastName: '',
      facilityId: userDetails?.FACILITY_ID,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-10 lg:p-14 grid gap-5 centered-modal"
    >
      <h4>Invite Team Members</h4>

      <div className="auth-input-label-holder">
        <label className="px-5">Email Address</label>
        <input
          {...register('email')}
          placeholder="mail@company.com"
          className="ce-input"
        />
      </div>

      <div className="form-input-label-holder">
        <label className="px-5">Choose Role</label>
        <Controller
          name="roles"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value={0} disabled>
                Choose Role
              </MenuItem>
              <MenuItem value={UserTypeEnum.FACILITY_ADMIN}>
                Facility Admin
              </MenuItem>
              <MenuItem value={UserTypeEnum.RECEPTIONIST}>
                Receptionist
              </MenuItem>
            </Select>
          )}
        />
      </div>

      <Button loading={isLoading} label="Invite Team Member" />
    </form>
  );
};
