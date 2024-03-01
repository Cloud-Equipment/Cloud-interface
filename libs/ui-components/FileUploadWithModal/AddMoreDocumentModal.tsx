// import * as Assets from '@cloud-equipment/assets';
import { Button, FileUpload } from '@cloud-equipment/ui-components';

import * as Assets from '@cloud-equipment/assets';

const AddMoreDocumentModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (file: File) => void;
}) => {
  return (
    <>
      <div className="bg-white p-6 py-10 centered-modal-md flex flex-col items-center gap-7">
        <FileUpload
          uploadIcon={Assets.Icons.UploadIconInModal}
          containerClass="w-full"
          uploadLabel="Drag and drop or <span style='color:#54D4BD;'>choose a file</span> to upload your<br/> contacts."
          uploadRestrictionText="All .csv, .xlsx, and .xls file types are supported"
          borderStyle="solid"
          borderColor="#54D4BD"
          borderWidth={1}
          color="#1A1A1A"
          setFile={(file) => onSubmit(file)}
          // onChange={}
        />
        <div className="flex gap-4 justify-center">
          <Button label="Cancel" onClick={onClose} />
          <Button
            variant="neutral"
            className="border-primary-150 text-primary-150 hover:text-primary-150 hover:border-primary-150"
            label="Upload Patient Image"
            // onClick={()=>onSubmit()}
          />
        </div>
      </div>
    </>
  );
};

export default AddMoreDocumentModal;
