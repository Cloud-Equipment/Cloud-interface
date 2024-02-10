import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';

const AddNewPatientModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="bg-white p-6 py-10 centered-modal-md flex flex-col items-center gap-7">
      <img alt="icon" className="w-15 h-15" src={Assets.Icons.EnableEMRIcon} />
      <p className="text-center">
        Are you sure you want to Create this New Patient?
      </p>

      <div className="flex gap-4 justify-center">
        <Button label="Cancel" onClick={onClose} />
        <Button
          variant="neutral"
          className="border-primary-150 text-primary-150 hover:text-primary-150 hover:border-primary-150"
          label="Yes Create Patient"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default AddNewPatientModal;
