// import { clearLoading, setLoading } from '@cloud-equipment/shared_store';
import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';
import { ActionModalType } from '../../Pages/Management/Facility/ManageFacility';

const AddMoreDocumentModal = ({
  onClose,
  currentView,
}: Omit<ModalProps, 'open'> & { currentView: ActionModalType }) => {
  if (currentView === 'disableUser') {
    return (
      <div className="bg-white p-10 lg:p-14 centered-modal flex flex-col items-center gap-7">
        <img
          alt="icon"
          className="w-20 h-20"
          src={Assets.Icons.FacilityWarningIcon}
        />
        <p className="">Are you sure you want to disable this Facility?</p>

        <div className="flex gap-4 justify-center">
          <Button variant="tertiary" label="Cancel" onClick={onClose} />
          <Button label="Yes Disable" className="bg-tertiary-100" />
        </div>
      </div>
    );
  } else if (currentView === 'enableEMR') {
    return (
      <div className="bg-white p-6 py-10 centered-modal-md flex flex-col items-center gap-7">
        <img
          alt="icon"
          className="w-15 h-15"
          src={Assets.Icons.EnableEMRIcon}
        />
        <p className="text-center">
          Are you sure you want to enable Cloud equipment EMR for <br /> this
          facility:
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
  } else if (currentView === 'enableUser') {
    return (
      <div className="bg-white lg:p-14 centered-modal flex flex-col gap-7">
        <h4 className="font-nunito text-left pb-5 text-sm font-bold leading-5 text-secondary-700 border-secondary-650 border-b-[1px]">
          Enable facility
        </h4>
        <p className="">Are you sure you want to enable this Facility?</p>

        <div className="flex gap-4 justify-center">
          <Button variant="tertiary" label="Cancel" onClick={onClose} />
          <Button label="Yes Enable" />
        </div>
      </div>
    );
  }

  return null;
};

export default AddMoreDocumentModal;
