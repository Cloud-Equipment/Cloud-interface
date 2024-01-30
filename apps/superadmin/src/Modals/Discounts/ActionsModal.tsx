import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';
import { DiscountsActionModalType } from '../../Pages/Management/Discounts/Discounts';

const DiscountsActionModal = ({
  onClose,
  currentView,
}: Omit<ModalProps, 'open'> & { currentView: DiscountsActionModalType }) => {
  if (currentView === 'create') {
    return (
      <div className="bg-white p-10 lg:p-14 centered-modal-md flex flex-col items-center gap-7">
        <img
          alt="icon"
          className="w-20 h-20"
          src={Assets.Icons.EnableEMRIcon}
        />
        <p className="text-center">
          Are you sure you want to create this discount and send a mail to your
          customers?
        </p>

        <div className="flex gap-4 justify-center">
          <Button label="Cancel" onClick={onClose} />
          <Button
            variant="neutral"
            className="border-primary-150 text-primary-150 hover:text-primary-150 hover:border-primary-150"
            label="Yes Enable"
          />
        </div>
      </div>
    );
  } else if (currentView === 'approve') {
    return (
      <div className="bg-white p-10 lg:p-14 centered-modal-md flex flex-col items-center gap-7">
        <img
          alt="icon"
          className="w-20 h-20"
          src={Assets.Icons.EnableEMRIcon}
        />
        <p className="text-center">
          Are you sure you want to Approve this discount and send a mail to your
          customers?
        </p>

        <div className="flex gap-4 justify-center">
          <Button label="Cancel" onClick={onClose} />
          <Button
            variant="neutral"
            className="border-primary-150 text-primary-150 hover:text-primary-150 hover:border-primary-150"
            label="Yes Approve"
          />
        </div>
      </div>
    );
  } else if (currentView === 'reject') {
    return (
      <div className="bg-white p-5 lg:p-14 centered-modal-md flex flex-col items-center gap-7">
        <img
          alt="icon"
          className="w-20 h-20"
          src={Assets.Icons.FacilityWarningIcon}
        />
        <p className="text-center">
          Are you sure you want to Reject this discount and send a mail to your
          customers?
        </p>

        <div className="flex gap-4 justify-center">
          <Button variant="tertiary" label="Cancel" onClick={onClose} />
          <Button label="Yes Reject" className="bg-tertiary-100" />
        </div>
      </div>
    );
  }

  return null;
};

export default DiscountsActionModal;
