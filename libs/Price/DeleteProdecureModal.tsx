import { IMedService } from '@cloud-equipment/models';
import * as Assets from '@cloud-equipment/assets';
import { _deletePrice } from './services/procedures.service';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { clearLoading, setLoading } from '@cloud-equipment/shared_store';

const DeleteProdecureModal = ({
  onClose,
  procedureToEdit,
}: {
  onClose: () => void;
  procedureToEdit: IMedService;
}) => {
  const dispatch = useDispatch();
  const deletePrice = () => {
    dispatch(setLoading());
    _deletePrice(procedureToEdit.medServiceId.toString())
      .then((res: any) => {
        if (res.data.success) {
          onClose();
          toast.success(res.data.msg);
        } else {
          toast.error(res.data.msg);
        }
      })
      .finally(() => {
        dispatch(clearLoading());
      });
  };

  return (
    <div className="bg-white p-10 lg:p-14 centered-modal">
      <div className="flex flex-col items-center space-y-4">
        <img src={Assets.Icons.ModalWarn} alt="confirm icon" />

        <p className="text-center">
          Are you sure you want to delete this procedure? Customers won’t be
          able to apply for this procedure.{' '}
        </p>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="ce-btn-text"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            className="ce-btn-outline !border-greenText hover:bg-greenText text-greenText"
            onClick={() => deletePrice()}
          >
            Yes, Delete Procedure
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProdecureModal;
