import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  TablePagination,
} from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { Table, Button } from '@cloud-equipment/ui-components';
import * as Assets from '@cloud-equipment/assets';
import queries from '../../../services/queries/managePatients';
import { IAppState } from '../../../Store/store';

// type PatientTableColumns = IPatient & { lastLogin: string; elipsis: 'elipsis' };
type PatientTableColumns = any & { lastLogin: string; elipsis: 'elipsis' };

const columnHelper = createColumnHelper<PatientTableColumns>();

const columns = [
  columnHelper.accessor('patientUniqueID', {
    header: 'User ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('patientName', {
    header: 'Patient Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('patientEmail', {
    header: 'Email Address',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('patientPhone', {
    header: 'Phone Number',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('patientGenderId', {
    header: 'Gender',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lastLogin', {
    header: 'Last Login',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('elipsis', {
    cell: ({ row: { original } }) => {
      // REFACTOR: is this necessary
      const cb = (e: React.MouseEvent<HTMLButtonElement>) => {
        // console.log('e', e);
      };
      return <TableMenuDropdown {...{ cb, patientData: original }} />;
    },
    header: '',
  }),
];

const ViewPatients = () => {
  const { useGetPatients } = queries;

  const { user } = useSelector((state: IAppState) => state.auth);

  const { data } = useGetPatients(
    `/patient/getpatientbyhospitalid/${user?.FACILITY_ID}`,
    { enabled: !!user?.FACILITY_ID }
  );

  return (
    <>
      <section className="ce-px ce-py">
        <div className="flex justify-end gap-4 flex-wrap mt-5">
          <AddActionsDropdown />
        </div>

        <div className="p-[16px] bg-[white] mt-[20px] rounded-[20px]">
          <h3 className="font-manrope text-2xl font-medium leading-[36px] text-neutral-350 mb-5">
            Patient List
          </h3>
          <div className="grid  gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
            <div className="col-span-2 lg:col-span-[unset] lg:w-[50%] search-input-container">
              <input placeholder="Search for Patient Name" />
              <img src={Assets.Icons.Search} alt="Search Icon" />
            </div>

            <div className="sort-container">
              <span className="sort-text">Role:</span>

              <span className="sort-value">Show All</span>

              <img src={Assets.Icons.SolidArrowDown} alt="" />
            </div>
            <Button
              variant="neutral"
              icon={Assets.Icons.FilterIcon}
              label="Filter By"
              className="text-secondary-100 border border-neutral-100 hover:border-neutral-100"
            />
            <Button icon={Assets.Icons.ExportIcon} label="Export" />
          </div>

          <Table
            loading={false}
            data={data || []}
            columns={columns}
            tableHeading="Patients List"
          />

          {/* <TablePagination
              component="div"
              count={total}
              page={currentPage}
              labelRowsPerPage="Items per page"
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPage={pageSize}
            /> */}
        </div>
      </section>
    </>
  );
};

export default ViewPatients;

const TableMenuDropdown = ({
  cb,
  patientData,
}: {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // patientData: IPatient;
  patientData: any;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    cb(event);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const viewPatient = () => {
    navigate(`/management/patient/${patientData.patientUniqueID}`);
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
        <MenuItem
          onClick={() => {
            viewPatient();
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <img src={Assets.Icons.EditPrice} alt="" />
          </ListItemIcon>
          <ListItemText>View Patient</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

const AddActionsDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (
    action: 'new patient' | 'new appointment' | 'new report'
  ) => {
    if (action === 'new patient') {
      navigate('/management/add-patient');
    } else if (action === 'new appointment') {
      navigate('');
    } else if (action === 'new report') {
      navigate('/reports');
    }
    handleMenuClose();
  };

  return (
    <>
      <button
        onClick={(e) => {
          handleActionClick(e);
        }}
        className="ce-btn flex gap-2 items-center"
      >
        <img src={Assets.Icons.WhitePlusIcon} alt="" /> New
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
            handleMenuClose();
          }}
          className="border-b"
        >
          <ListItemText className="font-manrope text-base font-normal leading-[24px] text-neutral-600 mr-10">
            Select One Option...
          </ListItemText>
          <ListItemIcon>
            <img src={Assets.Icons.ArrowUpIcon} alt="" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleAction('new patient');
          }}
        >
          <ListItemText className="">New Patient</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleAction('new appointment');
          }}
        >
          <ListItemText>New Appointment</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleAction('new report');
          }}
        >
          <ListItemText>New Report</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
