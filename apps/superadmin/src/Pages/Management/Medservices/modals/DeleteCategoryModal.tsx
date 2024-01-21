import * as Assets from '@cloud-equipment/assets';
import { IMedserviceCategory } from 'Models/procedures.models';
import queries from '../../../../services/queries/manageMedserviceCategories';

const DeleteCategoryModal = ({
  categoryToDelete,
  onClose,
}: {
  categoryToDelete: IMedserviceCategory;
  onClose: () => void;
}) => {
  const { useDeleteMedserviceCategory } = queries;
  const { mutateFn, isError, isSuccess, isLoading } =
    useDeleteMedserviceCategory(categoryToDelete?.categoryId?.toString() ?? '');

  const deleteCategory = () => {
    mutateFn({}, () => onClose());
  };

  return (
    <div className="bg-white p-10 lg:p-14 centered-modal">
      <div className="flex flex-col items-center space-y-4">
        <img src={Assets.Icons.ModalConfirm} alt="confirm icon" />

        <p className="text-center">
          Are you sure you want to delete this Category
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
            onClick={() => deleteCategory()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
