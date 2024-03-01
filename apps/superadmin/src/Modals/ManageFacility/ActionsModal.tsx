// import { clearLoading, setLoading } from '@cloud-equipment/shared_store';
import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';
import { ActionModalType } from '../../Pages/Management/Facility/ManageFacility';
import queries from '../../services/queries/manageFacility';

const AddMoreDocumentModal = ({
  onClose,
  currentView,
  id,
}: Omit<ModalProps, 'open'> & {
  currentView: ActionModalType;
  id?: string;
}) => {
  const { useEnableEMR, useDisableEMR } = queries;
  const { isLoading: disableUserIsLoading, mutateFn: disableUserMutateFn } =
    useDisableEMR();
  const { isLoading: enableUserIsLoading, mutateFn: enableUserMutateFn } =
    useEnableEMR();

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
            onClick={() => enableUserMutateFn({ id: id }, () => onClose())}
            variant="neutral"
            className="border-primary-150 text-primary-150 hover:text-primary-150 hover:border-primary-150"
            label="Yes Enable"
            loading={enableUserIsLoading}
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
  } else if (currentView === 'disableEMR') {
    return (
      <div className="bg-white p-6 py-10 centered-modal-md flex flex-col items-center gap-7">
        <img
          alt="icon"
          className="w-15 h-15"
          src={Assets.Icons.EnableEMRIcon}
        />
        <p className="text-center">
          Are you sure you want to Disable Cloud equipment EMR for <br /> this
          facility:
        </p>

        <div className="flex gap-4 justify-center">
          <Button label="Cancel" onClick={onClose} />
          <Button
            onClick={() => disableUserMutateFn({ id: id }, () => onClose())}
            variant="neutral"
            className="border-tertiary-100 text-tertiary-100 hover:text-tertiary-100 hover:border-tertiary-100"
            label="Yes Disable"
            loading={disableUserIsLoading}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default AddMoreDocumentModal;
