import { Controller, useForm } from 'react-hook-form';
import { showToast } from '../../utils/toast';

import { FileUpload, Input } from '../../components';

import { clearLoading, setLoading } from '@cloud-equipment/shared_store';
import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';

interface FormProps {
  documentTitle: string;
  role: string;
}

const AddMoreDocumentModal = ({
  onClose,
  procedureToEdit,
}: {
  onClose: () => void;
  procedureToEdit?: any;
}) => {
  const { register, handleSubmit, control, getValues, setValue, watch } =
    useForm<FormProps>();

  const onSubmit = (data: FormProps) => {
    console.log('Data', data);
  };

  return (
    <div className="bg-white p-10 lg:p-14 centered-modal-md">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-x-2">
        <h4 className="font-dmsans text-2xl font-normal leading-[36px] text-secondary-550">
          Upload any other Document
        </h4>
        <hr className="my-5" />
        <Input
          label="Document Title"
          containerClass="mb-10"
          placeholder="Enter Document Tile"
          {...register('documentTitle', {
            required: 'Document Title is required ',
          })}
        />

        <FileUpload
          uploadIcon={Assets.Icons.UploadIcon2}
          containerClass="flex-1 mb-10"
          uploadLabel="Drag and drop or <span class='text-primary-150'>choose a file</span> to upload your<br/> contacts."
          uploadRestrictionText="All .csv, .xlsx, and .xls file types are supported"
          borderStyle="solid"
          borderWidth={1}
          color="#1A1A1A"
          // onChange={}
        />

        <Button
          variant="neutral"
          className="border-primary-150 text-primary-150 hover:border-primary-150"
          label="Upload"
        />
      </form>
    </div>
  );
};

export default AddMoreDocumentModal;
