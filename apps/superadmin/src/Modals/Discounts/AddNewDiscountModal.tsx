import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';

const AddNewDiscountModal = ({
  onClose,
  onSubmit,
  isLoading,
}: {
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="bg-white p-6 py-10 centered-modal-md flex flex-col items-center gap-7">
      <img alt="icon" className="w-15 h-15" src={Assets.Icons.EnableEMRIcon} />
      <p className="text-center">
        Are you sure you want to create this discount and send a<br /> mail to
        your customers?
      </p>

      <div className="flex gap-4 justify-center">
        <Button label="Cancel" onClick={onClose} />
        <Button
          loading={isLoading}
          variant="neutral"
          className="border-primary-150 text-primary-150 hover:text-primary-150 hover:border-primary-150"
          label="Yes Create"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default AddNewDiscountModal;
