import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MenuItem, Select } from '@mui/material';
import {
  ICreateProcedure,
  IMedService,
  IMedserviceCategory,
  IUser,
} from '@cloud-equipment/models';
import { useDispatch, useSelector } from 'react-redux';
import { clearLoading, setLoading } from '@cloud-equipment/shared_store';
import * as Assets from '@cloud-equipment/assets';
import facilityQueries from '../../../../services/queries/manageFacility';
import categoryQueries from '../../../../services/queries/manageMedserviceCategories';
import medserviceQueries from '../../../../services/queries/manageMedservices';
import { Input, TextArea } from '../../../../components';

const MedserviceModal = ({
  onClose,
  procedureToEdit,
}: {
  onClose: () => void;
  procedureToEdit?: IMedService;
}) => {
  const { register, handleSubmit, control, getValues, setValue } = useForm();

  const [view, setView] = useState<1 | 2>(1);

  const { useGetAllFacilities } = facilityQueries;
  const { isLoading: facilitiesLoading, data: facilitiesList } =
    useGetAllFacilities(`/api/facility-manager/getallfacilities`);

  const { useGetAllMedserviceCategories } = categoryQueries;
  const { isLoading: categoriesLoading, data: categoriesList } =
    useGetAllMedserviceCategories(
      `/service-manager/medServiceCategory/getallcategory`
    );

  const { useCreateMedservice } = medserviceQueries;
  const { mutateFn, isError, isSuccess, isLoading } = useCreateMedservice();

  const onSubmit = () => {
    setView(2);
  };

  const submitData = () => {
    mutateFn(getValues(), () => onClose());
  };

  useEffect(() => {
    if (procedureToEdit) {
      setValue('medServiceCategoryId', procedureToEdit.medServiceCategoryId);
      setValue('medServiceName', procedureToEdit.medServiceName);
      setValue('price', procedureToEdit.price);
    }
  }, []);

  return (
    <div className="bg-white p-10 lg:p-14 centered-modal">
      {view === 1 ? (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
          <h4>Add New Price/Procedure</h4>

          <div className="form-input-label-holder">
            <label className="px-5">Facility</label>
            <Controller
              name="facilityId"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Select {...field}>
                  <MenuItem value={0} disabled>
                    Choose Facility
                  </MenuItem>
                  {facilitiesList?.map((x, i) => (
                    <MenuItem key={i} value={x.id}>
                      {x.facilityName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>

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
                  {categoriesList?.map((x, i) => (
                    <MenuItem key={i} value={x.categoryId}>
                      {x.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <Input
            label="Medservice Name"
            {...register('medServiceName', {
              required: 'Medservice Name is required',
            })}
          />

          <Input
            label="Test/Diagnostic Price"
            {...register('price', {
              required: 'Medservice Price is required',
            })}
            type="number"
          />

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
  );
};

export default MedserviceModal;
