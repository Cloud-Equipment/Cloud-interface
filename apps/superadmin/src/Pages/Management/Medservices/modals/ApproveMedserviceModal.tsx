import React, { useState } from 'react';
import { IMedservice } from '@cloud-equipment/models';
import moment from 'moment';
import numeral from 'numeral';
import { FormControlLabel, Checkbox } from '@mui/material';
import * as Assets from '@cloud-equipment/assets';
import queries from '../../../../services/queries/manageMedservices';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../Store/store';
import { Input, TextArea } from '../../../../components';

const ApproveMedserviceModal = ({
  procedureData,
  onClose,
}: {
  procedureData: IMedservice;
  onClose: () => void;
}) => {
  const [view, setView] = useState<1 | 2>(1);
  const [isApproving, setIsApproving] = useState(false);
  const superAdmnId = useSelector(
    (state: IAppState) => state.auth.user?.USER_ID
  );

  const { useApproveMedservice } = queries;
  const { isLoading, data, mutateFn } = useApproveMedservice(
    `/service-manager/medServices/approvedisapprove?priceChangeRequestId=${
      procedureData.medServiceId
    }&statusFlag=${isApproving ? 'APPROVE' : 'REJECT'}`
  );
  const { register, handleSubmit, control, getValues, setValue } = useForm();

  const onSubmit = () => {
    setView(2);
  };

  const submitData = () => {
    mutateFn({ ...getValues(), superAdmnId }, () => onClose());
  };

  return (
    <div className="bg-white px-6 py-10 centered-modal max-w-[600px]">
      {view === 1 ? (
        <form>
          <div className="flex items-center justify-between">
            <h4 className="text-2xl">Approve Price</h4>
            <button
              onClick={() => {
                onClose();
              }}
              className="btn-icon"
              type="button"
            >
              <img src={Assets.Icons.BoxCloseIcon} alt="" />
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[auto_auto] justify-between">
            <div>
              <p className="font-semibold">Date & Time Added</p>
              <p className="text-greyText">
                {moment(procedureData.dateCreated).format(
                  'DD-MM-YYYY . HH:mm:ss'
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Procedure Category</p>
              <p className="text-greyText">
                {procedureData.medServiceCategoryId}
              </p>
            </div>
            <div>
              <p className="font-semibold">Procedure Name</p>
              <p className="text-greyText">{procedureData.medServiceName}</p>
            </div>
            <div>
              <p className="font-semibold">Price</p>
              <p className="text-greyText">
                ₦{numeral(procedureData.price).format('0,0.00')}
              </p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <p className="bg-[#F7F7F7] w-fit text-[#77797E] rounded-2xl px-4 py-1 text-sm">
                Pending
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="font-semibold">
                Leave a Note or reason for either Approving or Rjeecting this
                Discount
              </p>

               <TextArea
                {...register('comments', {})}
                label="Leave a Note"
                rows={5}
              />
            </div>
          </div>

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Notify our Customer about this discount"
          />

          <div className="flex space-x-5 mt-6 justify-center">
            <button
              onClick={() => {
                setIsApproving(true);
                onSubmit();
              }}
              className="ce-btn "
            >
              Approve Price
            </button>
            <button
              onClick={() => {
                setIsApproving(false);
                onSubmit();
              }}
              className="ce-btn-outline "
            >
              Reject Price
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <img src={Assets.Icons.ModalConfirm} alt="confirm icon" />

          <p className="text-center">
            Are you sure you want to {isApproving ? 'approve' : 'reject '} this
            Medservice/ Price
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

export default ApproveMedserviceModal;
