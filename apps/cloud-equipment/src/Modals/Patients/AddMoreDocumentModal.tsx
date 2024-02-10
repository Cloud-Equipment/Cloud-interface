// import * as Assets from '@cloud-equipment/assets';

import { Button, FileUpload } from '@cloud-equipment/ui-components';

const AddMoreDocumentModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="bg-white p-6 py-10 centered-modal-md flex flex-col items-center gap-7">
      <FileUpload />
      <div className="flex gap-4 justify-center">
        kk
        <Button label="Cancel" onClick={onClose} />
        <Button
          variant="neutral"
          className="border-primary-150 text-primary-150 hover:text-primary-150 hover:border-primary-150"
          label="Upload Patient Image"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default AddMoreDocumentModal;
