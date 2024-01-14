import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { environment } from '@cloud-equipment/environments';
import { toast } from 'react-toastify';
import { MenuItem, Select } from '@mui/material';
import { UserTypeEnum } from '@cloud-equipment/models';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../Store/store';

export const InviteUserModal = ({ onClose }: any) => {
  const { register, handleSubmit, control } = useForm();

  const userDetails = useSelector((state: IAppState) => state.auth.user);

  const onSubmit = (data: any) => {
    axios
      .post(`${environment.baseUrl}/user-manager/account/register`, {
        ...data,
        roles: [data.roles],
        password: 'Qwerty1!',
        firstName: 'Paul',
        lastName: 'Peter',
        facilityId: userDetails?.FACILITY_ID,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg);
          onClose();
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch((err) => {
        toast.error('User Invitation Failed');
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

      <button className="ce-btn bg-greenText mt-3 py-3">
        Invite Team Member
      </button>
    </form>
  );
};
