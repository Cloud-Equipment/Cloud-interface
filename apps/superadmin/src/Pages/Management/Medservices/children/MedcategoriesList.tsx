import React, { useState } from 'react';
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
import { Table } from '../../../../components';
import queries from '../../../../services/queries/manageMedserviceCategories';
import { IMedserviceCategory } from '../../../../services/queries/manageMedserviceCategories/types';
import CategoryModal from '../modals/CategoryModal';
import DeleteCategoryModal from '../modals/DeleteCategoryModal';
// import { ActionsModal } from '../../../Modals';

type ActionModalType = null | 'edit' | 'delete';
type MedserviceCategoryTableColumns = IMedserviceCategory & {
  elipsis: 'elipsis';
};

const columnHelper = createColumnHelper<MedserviceCategoryTableColumns>();

const columns = (handleActions: (view: ActionModalType) => void) => [
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
        <MenuDropdown {...{ cb, categoryInfo: original, handleActions }} />
      );
    },
    header: '',
  }),
];

const MedCategoriesList = () => {
  const { useGetAllMedserviceCategories } = queries;
  const { isLoading, data } = useGetAllMedserviceCategories(
    `/service-manager/medServiceCategory/getallcategory`
  );

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
            tableHeading="Medical Categories"
            tableHeadingColorClassName="!bg-secondary-150"
          />
        </div>
      </div>
    </>
  );
};

export default MedCategoriesList;

// TODO: Move this to it's own file
const MenuDropdown = ({
  cb,
  categoryInfo,
  handleActions,
}: {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
  categoryInfo: IMedserviceCategory;
  handleActions: (view: ActionModalType) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    cb(event);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //   modal
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categoryDeleteModalOpen, setCategoryDeleteModalOpen] = useState(false);

  const openCategoryModal = () => {
    setCategoryModalOpen(true);
  };
  const openCategoryDeleteModal = () => {
    setCategoryDeleteModalOpen(true);
  };

  const closeCategoryModal = () => setCategoryModalOpen(false);
  const closeCategoryDeleteModal = () => setCategoryDeleteModalOpen(false);

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
        <MenuItem
          onClick={() => {
            openCategoryModal();
            handleMenuClose();
          }}
        >
          <ListItemIcon></ListItemIcon>
          <ListItemText>Edit Category</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            openCategoryDeleteModal();
            handleMenuClose();
          }}
        >
          <ListItemIcon></ListItemIcon>
          <ListItemText>Delete Category</ListItemText>
        </MenuItem>
      </Menu>

      <Modal open={categoryModalOpen} onClose={closeCategoryModal}>
        <div>
          {
            <CategoryModal
              categoryToEdit={categoryInfo}
              onClose={closeCategoryModal}
            />
          }
        </div>
      </Modal>

      <Modal open={categoryDeleteModalOpen} onClose={closeCategoryDeleteModal}>
        <div>
          {
            <DeleteCategoryModal
              categoryToDelete={categoryInfo}
              onClose={closeCategoryDeleteModal}
            />
          }
        </div>
      </Modal>
    </div>
  );
};
