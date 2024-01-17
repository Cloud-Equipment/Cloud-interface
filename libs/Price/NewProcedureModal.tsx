import {
  _createPrice,
  _getMedserviceCategories,
} from './services/procedures.service';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MenuItem, Select } from '@mui/material';
import {
  ICreateProcedure,
  IMedService,
  IMedserviceCategory,
} from '@cloud-equipment/models';
import { useDispatch } from 'react-redux';
import { clearLoading, setLoading } from '@cloud-equipment/shared_store';
import * as Assets from '@cloud-equipment/assets';

const NewProcedureModal = ({
  onClose,
  procedureToEdit,
}: {
  onClose: () => void;
  procedureToEdit: IMedService | null;
}) => {
  const { register, handleSubmit, control, getValues, setValue } = useForm();
  const dispatch = useDispatch();
  const [view, setView] = useState<'form' | 'confirm'>('form');

  // const userDetails = useSelector((state: IAppState) => state.auth.user);
  const [categoriesList, setCategoriesList] = useState<IMedserviceCategory[]>(
    []
  );

  const onSubmit = () => {
    setView('confirm');
  };

  const submitData = () => {
    dispatch(setLoading());
    _createPrice(getValues() as ICreateProcedure)
      .then((response) => {
        if (response.data.success) {
          toast.error(response.data.msg);
          onClose();
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(clearLoading());
      });
  };

  const getAllCategories = () => {
    _getMedserviceCategories()
      .then((res: any) => {
        if (res.data.success) {
          setCategoriesList(res.data.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    getAllCategories();
    if (procedureToEdit) {
      setValue('medServiceCategoryId', procedureToEdit.medServiceCategoryId);
      setValue('medServiceName', procedureToEdit.medServiceName);
      setValue('price', procedureToEdit.price);
    }
  }, []);

  return (
    <div className="bg-white p-10 lg:p-14 centered-modal">
      {view === 'form' ? (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
          <h4>Add New Price/Procedure</h4>

          <div className="form-input-label-holder">
            <label className="px-5">Medservice Category</label>
            <Controller
              name="medServiceCategoryId"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Select {...field}>
                  <MenuItem value={0} disabled>
                    Choose Category
                  </MenuItem>
                  {categoriesList.map((x, i) => (
                    <MenuItem key={i} value={x.categoryId}>
                      {x.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <div className="auth-input-label-holder">
            <label className="px-5">Medservice Name</label>
            <input
              {...register('medServiceName')}
              placeholder="Enter Test / Diagnostic"
              className="ce-input"
            />
          </div>

          <div className="auth-input-label-holder">
            <label className="px-5">Test/Diagnostic Price</label>
            <input
              {...register('price')}
              placeholder="Enter Test / Diagnostic"
              className="ce-input"
              type="number"
            />
          </div>

          <button className="ce-btn !bg-greenText mt-3 py-3">
            {procedureToEdit ? 'Update Procedure' : 'Add Price/ Procedure '}
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <img src={Assets.Icons.ModalConfirm} alt="confirm icon" />

          <p className="text-center">
            Are you sure you want to {procedureToEdit ? 'update' : 'add '} this
            Procedure/Price
          </p>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="ce-btn-text"
              onClick={() => {
                setView('form');
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
  );
};

export default NewProcedureModal;
