import React from 'react';
import { Table } from '../../../components';
import * as Assets from '@cloud-equipment/assets';
import { IPatient } from '../../../services/queries/managePatients/types';
import queries from '../../../services/queries/managePatients/';
import { createColumnHelper } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

type PatientTableColumns = IPatient & { lastLogin: string; elipsis: 'elipsis' };
type ActionModalType = null | 'edit' | 'delete';

const columnHelper = createColumnHelper<PatientTableColumns>();

const columns = (handleActionsView: () => void) => [
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
      return (
        <MenuDropdown {...{ cb, patientData: original, handleActionsView }} />
      );
    },
    header: '',
  }),
];

const PatientsList = () => {
  const navigate = useNavigate();
  const { useGetPatients } = queries;
  const { isLoading, data } = useGetPatients(`/patient/getallpateints`);

  return (
    <section className="ce-px ce-py">
      <div className="flex justify-end gap-4 flex-wrap mt-5">
        <button onClick={() => navigate('create')} className="ce-btn">
          New Patient
        </button>
      </div>

      <div className="p-[16px] bg-[white] mt-[20px] rounded-[20px]">
        <div className="grid  gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
          <div className="col-span-2 lg:col-span-[unset] lg:w-[50%] search-input-container">
            <input placeholder="Search for Patient Name" />
            <img src={Assets.Icons.Search} alt="Search Icon" />
          </div>

          <div className="sort-container">
            <span className="sort-text">Sort by:</span>

            <span className="sort-value">Newest to Oldest</span>

            <img src={Assets.Icons.SolidArrowDown} alt="" />
          </div>

          <button className="export-btn">
            <img src={Assets.Icons.ExportIcon} alt="" />
            <span>Export</span>
          </button>
        </div>

        <Table
          loading={isLoading}
          data={data}
          columns={columns(() => {})}
          tableHeading="Patients List"
          tableHeadingColorClassName="!bg-secondary-150"
        />
      </div>
    </section>
  );
};

export default PatientsList;

// TODO: Move this to it's own file
const MenuDropdown = ({
  cb,
  patientData,
  handleActionsView,
}: {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
  patientData: IPatient;
  handleActionsView: () => void;
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
    navigate(`/management/patients/view/${patientData.patientUniqueID}`);
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
