import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  TablePagination,
} from '@mui/material';

import { createColumnHelper } from '@tanstack/react-table';

import * as Assets from '@cloud-equipment/assets';
import { Button } from '@cloud-equipment/ui-components';
import { Routes } from '../../../../routes';
import { Table } from '../../../../components';
import queries from '../../../../services/queries/manageMedserviceCategories';
import { IMedserviceCategory } from '../../../../services/queries/manageMedserviceCategories/types';
import CategoryModal from '../modals/CategoryModal';
// import { ActionsModal } from '../../../Modals';

type ActionModalType = null | 'edit' | 'delete';
type MedserviceCategoryTableColumns = IMedserviceCategory & {
  elipsis: 'elipsis';
};

const columnHelper = createColumnHelper<MedserviceCategoryTableColumns>();

const columns = (handleActionsModalView: (view: ActionModalType) => void) => [
  columnHelper.accessor('categoryId', {
    header: 'Category ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('categoryName', {
    header: 'Category Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description of Category',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Date Created',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('elipsis', {
    cell: ({ row: { original } }) => {
      // REFACTOR: is this necessary
      const cb = (e: React.MouseEvent<HTMLButtonElement>) => {
        // console.log('e', e);
      };
      return (
        <MenuDropdown
          {...{ cb, categoryInfo: original, handleActionsModalView }}
        />
      );
    },
    header: '',
  }),
];

const MedCategoriesList = () => {
  const navigate = useNavigate();

  const { useGetAllMedserviceCategories } = queries;
  const { isLoading, data } = useGetAllMedserviceCategories(
    `/service-manager/medServiceCategory/getallcategory`
  );

  //   modal
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  //   modal
  const openCategoryModal = () => {
    setCategoryModalOpen(true);
  };
  const closeCategoryModal = () => setCategoryModalOpen(false);

  return (
    <>
      <div className="p-[16px] bg-[white] mt-[20px] rounded-[20px]">
        <div className="grid  gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
          <div className="col-span-2 lg:col-span-[unset] lg:w-[50%] search-input-container">
            <input placeholder="Enter Email Address/Customer Id" />
            <img src={Assets.Icons.Search} alt="Search Icon" />
          </div>

          <div className="sort-container">
            <span className="sort-text">Sort by:</span>

            <span className="sort-value">Newest to Oldest</span>

            <img src={Assets.Icons.SolidArrowDown} alt="" />
          </div>
        </div>

        <div className="mt-10">
          <Table
            loading={isLoading}
            data={data}
            columns={columns(() => {})}
            tableHeading="Facilities - 5"
            tableHeadingColorClassName="!bg-secondary-150"
          />
        </div>
      </div>

      <Modal open={categoryModalOpen} onClose={closeCategoryModal}>
        <div>{<CategoryModal onClose={closeCategoryModal} />}</div>
      </Modal>
    </>
  );
};

export default MedCategoriesList;

// TODO: Move this to it's own file
const MenuDropdown = ({
  cb,
  categoryInfo,
  handleActionsModalView,
}: {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
  categoryInfo: IMedserviceCategory;
  handleActionsModalView: (view: ActionModalType) => void;
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    cb(event);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        onClick={(e) => {
          handleActionClick(e);
        }}
        className="w-6"
      >
        <img src={Assets.Icons.Menudots} alt="" />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleActionsModalView('edit')}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Edit Category</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionsModalView('delete')}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Delete Category</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

// const ManageFacilityActionsModal = ({
//   open,
//   onClose,
//   currentView,
// }: ModalProps & { currentView: ActionModalType }) => {
//   return (
//     <Modal {...{ open, onClose }}>
//       <div className="">
//         <ActionsModal {...{ onClose, currentView }} />
//       </div>
//     </Modal>
//   );
// };
