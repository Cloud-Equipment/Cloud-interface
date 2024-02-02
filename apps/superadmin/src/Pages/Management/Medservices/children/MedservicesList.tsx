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
import queries from '../../../../services/queries/manageMedservices';
import FacilityQueries from '../../../../services/queries/manageFacility';
import { IMedservice } from '../../../../services/queries/manageMedservices/types';
import ApproveMedserviceModal from '../modals/ApproveMedserviceModal';
import MedserviceModal from '../modals/MedserviceModal';
import DeleteMedserviceModal from '../modals/DeleteMedserviceModal';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../../../utils';
import numeral from 'numeral';

type MedserviceTableColumns = IMedservice & { elipsis: 'elipsis' };

const columnHelper = createColumnHelper<MedserviceTableColumns>();

const columns = (handleActionsView: () => void) => [
  columnHelper.accessor('dateCreated', {
    header: 'Date & Time Added',
    cell: (info) => formatDate(info.getValue()?.toString()),
  }),
  columnHelper.accessor('medServiceCategoryId', {
    header: 'Medical Category',
    cell: (info) => info.getValue(),
  }),
  // columnHelper.accessor('facilityId', {
  //   header: 'Facility ID',
  //   cell: (info) => info.getValue(),
  // }),
  columnHelper.accessor('medServiceName', {
    header: 'Medservice Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => `₦${numeral(info.getValue()).format('0,0.00')}`,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
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
          {...{ cb, medserviceData: original, handleActionsView }}
        />
      );
    },
    header: '',
  }),
];

const MedservicesList = () => {
  const { id } = useParams();

  const { useGetMedservice } = queries;
  // const { isLoading, data } = useGetMedservice(
  //   `/service-manager/medServices/getallbyfacilitypaged?facilityId=${id}`,
  //   {
  //     currentPage: 1,
  //     pageSize: 15,
  //     startIndex: 1,
  //   }
  // );
  const { isLoading, data } = useGetMedservice(
    `/service-manager/medServices/getall?facilityId=${id}`,
    {
      currentPage: 1,
      pageSize: 15,
      startIndex: 1,
    }
  );

  const { useGetOneFacility } = FacilityQueries;
  const { isLoading: facilityInfoLoading, data: facilityInfo } =
    useGetOneFacility(`/facility-manager/facility/getfacility/${id}`, {}, id);

  //   table
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {};

  const handleChangeRowsPerPage = (event: any) => {
    // setCurrentPage(0);
    // setPageSize(parseInt(event.target.value, 10));
  };

  const [medserviceModalOpen, setMedserviceModalOpen] = useState(false);
  const openMedserviceModal = () => {
    setMedserviceModalOpen(true);
  };
  const closeMedserviceModal = () => setMedserviceModalOpen(false);

  return (
    <>
      <Modal open={medserviceModalOpen} onClose={closeMedserviceModal}>
        <div>
          {<MedserviceModal facilityId="" onClose={closeMedserviceModal} />}
        </div>
      </Modal>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">{facilityInfo?.facilityName}</h3>
          <p>{facilityInfo?.addressLine1}</p>
        </div>

        <button onClick={openMedserviceModal} className="ce-btn ">
          New Service{' '}
        </button>
      </div>
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

        <Table
          loading={isLoading}
          data={data || []}
          columns={columns(() => {})}
          tableHeading="Medservices - Prices"
          tableHeadingColorClassName="!bg-secondary-150"
        />
      </div>
    </>
  );
};

export default MedservicesList;

// TODO: Move this to it's own file
const MenuDropdown = ({
  cb,
  medserviceData,
  handleActionsView,
}: {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
  medserviceData: IMedservice;
  handleActionsView: () => void;
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
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openApproveModal = () => {
    setApproveModalOpen(true);
  };
  const openEditModal = () => {
    setEditModalOpen(true);
  };
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeApproveModal = () => setApproveModalOpen(false);
  const closeEditModal = () => setEditModalOpen(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const navigate = useNavigate();

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
        {medserviceData.status?.toLowerCase() !== 'approved' ? (
          <MenuItem
            onClick={() => {
              openEditModal();
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <img src={Assets.Icons.EditPrice} alt="" />
            </ListItemIcon>
            <ListItemText>Edit Price </ListItemText>
          </MenuItem>
        ) : (
          <></>
        )}

        {medserviceData.status?.toLowerCase() === 'pendng' ? (
          <MenuItem
            onClick={() => {
              openApproveModal();
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <img src={Assets.Icons.EditPrice} alt="" />
            </ListItemIcon>
            <ListItemText>Approve Price </ListItemText>
          </MenuItem>
        ) : (
          <></>
        )}

        <MenuItem
          onClick={() => {
            navigate(
              `/management/medservices/price-change-request/${medserviceData.medServiceId}`
            );
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <img src={Assets.Icons.EditPrice} alt="" />
          </ListItemIcon>
          <ListItemText>View Price History </ListItemText>
        </MenuItem>

        {/* <MenuItem
          onClick={() => {
            openDeleteModal();
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <img src={Assets.Icons.Delete} alt="" />
          </ListItemIcon>
          <ListItemText>Delete Procedure</ListItemText>
        </MenuItem> */}
      </Menu>

      <Modal open={approveModalOpen} onClose={closeApproveModal}>
        <div>
          {
            <ApproveMedserviceModal
              procedureData={medserviceData}
              onClose={closeApproveModal}
            />
          }
        </div>
      </Modal>

      <Modal open={editModalOpen} onClose={closeEditModal}>
        <div>
          {
            <MedserviceModal
              procedureToEdit={medserviceData}
              facilityId={medserviceData?.facilityId}
              onClose={closeEditModal}
            />
          }
        </div>
      </Modal>

      <Modal open={deleteModalOpen} onClose={closeDeleteModal}>
        <div>{<DeleteMedserviceModal />}</div>
      </Modal>
    </div>
  );
};
