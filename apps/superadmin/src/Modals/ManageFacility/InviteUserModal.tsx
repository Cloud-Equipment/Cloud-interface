import { Controller, useForm } from 'react-hook-form';
import { showToast } from '../../utils/toast';

import { Select, Input } from '../../components';
import { IMedService } from '@cloud-equipment/models';
import { clearLoading, setLoading } from '@cloud-equipment/shared_store';
import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';

interface FormProps {
  email: string;
  roles: string[];
  urlToRedirectUserTo: string;
}

const InviteUserModal = ({
  onClose,
  procedureToEdit,
}: {
  onClose: () => void;
  procedureToEdit?: IMedService | null;
}) => {
  const { register, handleSubmit, control, getValues, setValue, watch } =
    useForm<FormProps>();

  const onSubmit = (data: FormProps) => {
    console.log('Data', data);
  };

  return (
    <div className="bg-white p-10 lg:p-14 centered-modal">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
        <h4>Invite Team Members</h4>

        <Input
          label="Email Address"
          containerClass=""
          placeholder="website@mongoro.com"
          {...register('email', {
            required: 'Email is required ',
          })}
        />

        <Controller
          name="roles"
          control={control}
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
              label="Choose Role"
              placeHolder="Choose Role"
              {...field}
            />
          )}
        />

        <Input
          label="URL Link"
          containerClass=""
          placeholder="link@website.com"
          {...register('urlToRedirectUserTo', {
            required: 'Url Link is required ',
          })}
        />

        <Button label="Invite Team Member" className="bg-primary-150" />
      </form>
    </div>
  );
};

export default InviteUserModal;
