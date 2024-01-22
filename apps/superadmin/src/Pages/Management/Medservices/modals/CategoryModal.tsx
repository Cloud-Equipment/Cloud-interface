import { IMedserviceCategory } from 'Models/procedures.models';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Assets from '@cloud-equipment/assets';
import { Input, TextArea } from '../../../../components';
import queries from '../../../../services/queries/manageMedserviceCategories';

const CategoryModal = ({
  categoryToEdit,
  onClose,
}: {
  categoryToEdit?: IMedserviceCategory;
  onClose: () => void;
}) => {
  const { register, handleSubmit, control, getValues, setValue, watch } =
    useForm();

  const { useCreateMedserviceCategory } = queries;
  const { mutateFn, isError, isSuccess, isLoading } =
    useCreateMedserviceCategory();

  const { useUpdateMedserviceCategory } = queries;
  const {
    mutateFn: mutateFn_update,
    isError: isError_update,
    isSuccess: isSuccess_update,
    isLoading: isLoading_update,
  } = useUpdateMedserviceCategory(categoryToEdit?.categoryId.toString() ?? '');

  useEffect(() => {
    if (categoryToEdit) {
      setValue('categoryName', categoryToEdit?.categoryName);
    }
  }, []);

  const onSubmit = () => {
    setView(2);
  };

  const submitData = () => {
    categoryToEdit
      ? mutateFn_update(getValues(), () => onClose())
      : mutateFn(getValues(), () => onClose());
  };

  const [view, setView] = useState<1 | 2>(1);

  return (
    <>
      <div className="bg-white p-10 lg:p-14 centered-modal">
        {view === 1 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between">
              <h4 className="text-2xl">
                {categoryToEdit ? 'Edit Medical Category' : 'Medical Category'}
              </h4>

              <button
                onClick={() => {
                  onClose();
                }}
                className="btn-icon"
              >
                <img src={Assets.Icons.BoxCloseIcon} alt="" />
              </button>
            </div>

            <div className="grid gap-6 mt-6">
              <Input
                label="Category Name"
                {...register('categoryName', {
                  required: 'Category Name is required',
                })}
              />
              <TextArea
                {...register('categoryDescription', {})}
                label="Category Description"
                rows={5}
              />

              <button className="ce-btn bg-greenText">
                {categoryToEdit
                  ? 'Edit Medical Category'
                  : 'New Medical Category'}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <img src={Assets.Icons.ModalConfirm} alt="confirm icon" />

            <p className="text-center">
              Are you sure you want to {categoryToEdit ? 'update' : 'add '} this
              Category
            </p>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="ce-btn-text"
                onClick={() => {
                  setView(1);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ce-btn-outline !border-greenText hover:bg-greenText text-greenText"
                onClick={() => submitData()}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryModal;
