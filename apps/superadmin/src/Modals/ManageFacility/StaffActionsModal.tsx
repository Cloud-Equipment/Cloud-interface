import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';

type IModalViews = null | 'disableUser' | 'enable2Fa';
export const StaffActionsModal = ({
  onClose,
  currentView,
  cb,
}: {
  onClose: () => void;
  currentView: IModalViews;
  cb: () => void;
}) => {
  const onSubmit = (data: any) => {
    // axios
  };

  return (
    <div className="bg-white p-10 lg:p-14 flex flex-col items-center gap-5 centered-modal">
      <img alt="icon" className="w-15 h-15" src={Assets.Icons.EnableEMRIcon} />
      {currentView !== 'enable2Fa' ? (
        <>
          <p className="text-center">
            Are you sure you want to disable this user? User won't have <br />{' '}
            access to the platform again.
          </p>

          <div className="flex gap-3 justify-center">
            <Button
              variant="tertiary"
              label="Cancel"
              className="text-secondary-400"
              onClick={onClose}
            />
            <Button
              onClick={cb}
              variant="neutral"
              label="Yes Disable"
              className="border-primary-150 hover:border-primary-150 text-primary-150 hover:text-primary-150"
            />
          </div>
        </>
      ) : (
        <>
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
              onClick={cb}
              variant="neutral"
              label="Enable 2FA"
              className="border-primary-150 hover:border-primary-150 text-primary-150 hover:text-primary-150"
            />
          </div>
        </>
      )}
    </div>
  );
};
