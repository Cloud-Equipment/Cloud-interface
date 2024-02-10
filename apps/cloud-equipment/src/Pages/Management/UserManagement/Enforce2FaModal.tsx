import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';

export const Enable2FAModal = ({ onClose }: any) => {
  const onSubmit = (data: any) => {
    // axios
    //   .post(`${environment.baseUrl}/user-manager/account/register`, {
    //     ...data,
    //     roles: [data.roles],
    //     password: 'Qwerty1!',
    //     firstName: 'Paul',
    //     lastName: 'Peter',
    //     facilityId: userDetails?.FACILITY_ID,
    //   })
    //   .then((response) => {
    //     if (response.data.success) {
    //       toast.success(response.data.msg);
    //       onClose();
    //     } else {
    //       toast.error(response.data.msg);
    //     }
    //   })
    //   .catch(() => {});
  };

  return (
    <div className="bg-white p-10 lg:p-14 flex flex-col items-center gap-5 centered-modal">
      <img alt="icon" className="w-15 h-15" src={Assets.Icons.EnableEMRIcon} />
      <p className="text-center">
        You currently do not have 2FA enabled on your account.
        <br /> Enable 2FA now to continue
      </p>

      <div className="flex gap-3 justify-center">
        <Button
          variant="tertiary"
          label="Cancel"
          className="text-secondary-400"
          onClick={onClose}
        />
        <Button
          variant="neutral"
          label="Enable 2FA"
          className="border-primary-150 hover:border-primary-150 text-primary-150 hover:text-primary-150"
        />
      </div>
    </div>
  );
};
