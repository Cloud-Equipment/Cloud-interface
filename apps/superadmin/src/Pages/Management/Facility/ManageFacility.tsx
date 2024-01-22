import React from 'react';

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
import { Routes } from '../../../routes';
import { Table } from '../../../components';
import queries from '../../../services/queries/manageFacility';
import { Facility } from '../../../services/queries/manageFacility/types';
import { ActionsModal } from '../../../Modals';
import { formatDate } from '../../../utils';

export type ActionModalType = null | 'enableUser' | 'enableEMR' | 'disableUser';
type FacilityTableColumns = Pick<
  Facility,
  'id' | 'facilityName' | 'city' | 'addressLine1' | 'postalCode' | 'dateCreated'
> & { elipsis: 'elipsis' };

const columnHelper = createColumnHelper<FacilityTableColumns>();

const columns = (handleActionsModalView: (view: ActionModalType) => void) => [
  columnHelper.accessor('id', {
    header: 'Facility ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('facilityName', {
    header: 'First Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('city', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('addressLine1', {
    header: 'Facility Address',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('postalCode', {
    header: 'Phone Number',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('dateCreated', {
    header: 'Last Login',
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor('elipsis', {
    cell: ({
      row: {
        original: { id },
      },
    }) => {
      // REFACTOR: is this necessary
      const cb = (e: React.MouseEvent<HTMLButtonElement>) => {
        // console.log('e', e);
      };
      return <ManageFacilityDropDown {...{ cb, id, handleActionsModalView }} />;
    },
    header: '',
  }),
];

const ManageFacility = () => {
  const navigate = useNavigate();

  const { useGetFacilities } = queries;
  const { isLoading, data } = useGetFacilities(
    `/api/facility-manager/getallfacilities`
  );

  //   modal
  const [actionsModal, setActionsModal] = React.useState<{
    currentView: ActionModalType;
  }>({
    currentView: null,
  });

  //   table
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {};

  const handleChangeRowsPerPage = (event: any) => {
    // setCurrentPage(0);
    // setPageSize(parseInt(event.target.value, 10));
  };

  const handleActionsModalView = (view: ActionModalType) => {
    setActionsModal({ currentView: view });
  };

  const closeModal = () => {
    setActionsModal({ currentView: null });
  };

  return (
    <>
      <section className="ce-px ce-py">
        <div className="p-[16px] mt-[20px] rounded-[20px]">
          <h4 className="ce-heading-2">Management &gt; Facilites </h4>

          <div className="grid mt-6 gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
            <div className="col-span-2 lg:col-span-[unset] lg:w-[30%] search-input-container">
              <input
                placeholder="Enter Email Address/Customer ID"
                className="border"
              />
              <img src={Assets.Icons.Search} alt="Search Icon" />
            </div>

            <div className="sort-container border">
              <span className="sort-text">Users From:</span>

              <span className="sort-value">Facilities</span>

              <img src={Assets.Icons.SolidArrowDown} alt="" />
            </div>
            <div className="sort-container border">
              <span className="sort-text">Date:</span>

              <span className="sort-value">This Month</span>

              <img src={Assets.Icons.SolidArrowDown} alt="" />
            </div>

            <button className="filter-btn">
              <img src={Assets.Icons.ExportIcon} alt="" />
              <span>Filters</span>
            </button>
            <Button
              className="!bg-primary-100 !rounded-md"
              onClick={() =>
                navigate(`/management${Routes.management.addFacility}`)
              }
              label="Add Facilities"
            />
          </div>

          <Table
            loading={isLoading}
            data={data}
            columns={columns(handleActionsModalView)}
            tableHeading="Facilities - 5"
            tableHeadingColorClassName="!bg-secondary-150"
          />
        </div>
      </section>
      <ManageFacilityActionsModal
        open={!!actionsModal.currentView}
        onClose={closeModal}
        currentView={actionsModal.currentView}
      />
    </>
  );
};

export default ManageFacility;

// TODO: Move this to it's own file
const ManageFacilityDropDown = ({
  cb,
  id,
  handleActionsModalView,
}: {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id: string;
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

  const handleMenuAction = () => {
    navigate(`/management/facility/view/${id}/about`);
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
        <MenuItem onClick={handleMenuAction}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>View Facility Activities</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionsModalView('enableUser')}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Enable User</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionsModalView('disableUser')}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Disable User</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionsModalView('enableEMR')}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Enable EMR</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

const ManageFacilityActionsModal = ({
  open,
  onClose,
  currentView,
}: ModalProps & { currentView: ActionModalType }) => {
  return (
    <Modal {...{ open, onClose }}>
      <div className="">
        <ActionsModal {...{ onClose, currentView }} />
      </div>
    </Modal>
  );
};
