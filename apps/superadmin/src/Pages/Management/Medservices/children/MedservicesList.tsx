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
import { Routes } from '../../../../routes';
import { Table } from '../../../../components';
import queries from '../../../../services/queries/manageMedservices';
import { IMedservice } from '../../../../services/queries/manageMedservices/types';
// import { ActionsModal } from '../../../Modals';

export type ActionModalType = null | 'enableUser' | 'enableEMR' | 'disableUser';
type MedserviceTableColumns = Pick<
  IMedservice,
  'facilityId' | 'facilityName' | 'price' | 'status' | 'dateCreated'
> & { elipsis: 'elipsis' };

const columnHelper = createColumnHelper<MedserviceTableColumns>();

const columns = (handleActionsModalView: (view: ActionModalType) => void) => [
  columnHelper.accessor('facilityId', {
    header: 'Facility ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('facilityName', {
    header: 'Facility Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('dateCreated', {
    header: 'Date Created',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('elipsis', {
    cell: ({
      row: {
        original: { facilityId },
      },
    }) => {
      // REFACTOR: is this necessary
      const cb = (e: React.MouseEvent<HTMLButtonElement>) => {
        // console.log('e', e);
      };
      return <MenuDropdown {...{ cb, facilityId, handleActionsModalView }} />;
    },
    header: '',
  }),
];

const MedservicesList = () => {
  const navigate = useNavigate();

  const { useGetMedservice } = queries;
  const { isLoading, data } = useGetMedservice(
    `/service-manager/medServices/getall`
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

        <div className="mt-10 ce-table-holder">
          <Table
            // loading={isLoading}
            data={null}
            columns={columns(() => {})}
            tableHeading="Facilities - 5"
            tableHeadingColorClassName="!bg-secondary-150"
          />
        </div>
      </div>

      {/* <ManageFacilityActionsModal
        open={!!actionsModal.currentView}
        onClose={closeModal}
        currentView={actionsModal.currentView}
      /> */}
    </>
  );
};

export default MedservicesList;

// TODO: Move this to it's own file
const MenuDropdown = ({
  cb,
  facilityId,
  handleActionsModalView,
}: {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
  facilityId: string;
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
    navigate(`/management/facility/view/${facilityId}/about`);
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
          <ListItemText>View Facility </ListItemText>
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
