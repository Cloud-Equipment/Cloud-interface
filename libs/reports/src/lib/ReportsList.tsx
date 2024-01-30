import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ListItemIcon, ListItemText, TablePagination } from '@mui/material';
import { IProcedure } from '@cloud-equipment/models';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as Assets from '@cloud-equipment/assets';
import queries from './queries/reports';
import { createColumnHelper } from '@tanstack/react-table';
import { Table } from '@cloud-equipment/ui-components';

export type ActionType =
  | null
  | 'view'
  | 'shareResult'
  | 'confirmTest'
  | 'uploadResult';
type ReportTableColumns = IProcedure & { elipsis: 'elipsis' };

const columnHelper = createColumnHelper<ReportTableColumns>();

const columns = (handleActions: (view: ActionType) => void) => [
  columnHelper.accessor('date', {
    header: 'Date and Time',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('medServiceName', {
    header: 'Procedure/Test Ordered',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('patientAge', {
    header: 'Age of Patient',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('referrerName', {
    header: "Referrer's Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('refererHospital', {
    header: "Referrer's Hospital",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('phoneNo', {
    header: 'Phone Number',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('elipsis', {
    cell: ({
      row: {
        original: { procedureEntryId },
      },
    }) => {
      // REFACTOR: is this necessary
      const cb = (e: React.MouseEvent<HTMLButtonElement>) => {
        // console.log('e', e);
      };
      return (
        <ReportsListDropdown
          {...{
            cb,
            procedureEntryId: procedureEntryId.toString(),
            handleActions,
          }}
        />
      );
    },
    header: '',
  }),
];

const ReportsList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const { useGetReports } = queries;
  const { isLoading, data } = useGetReports({
    pageSize,
    currentPage,
    startIndex: 1,
  });

  const [selectedProcedure, setSelectedProcedure] = useState<null | IProcedure>(
    null
  );

  const handleChangePage = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setCurrentPage(0);
    setPageSize(parseInt(event.target.value, 10));
  };

  const handleActionsClick = (view: ActionType) => {
    console.log(view);
  };

  const navigate = useNavigate();

  return (
    <section className="ce-px ce-py">
      <h4 className="text-ce-green font-bold text-2xl">
        <span className="font-normal">Hello</span> , Emma Taylor
      </h4>

      <p className="text-greyText2 text-sm">
        Stay up to date with your patients' reports.
      </p>

      <div className="flex justify-end mt-5">
        <Link to="/reports/new">
          <button className="ce-btn ce-btn-icon">
            <img src={Assets.Icons.ReportBtn} alt="" />
            <span>New Report</span>
          </button>
        </Link>
      </div>

      <div className="p-[16px] bg-[white] mt-[20px] rounded-[20px]">
        <h4 className="ce-heading-2">All Reports</h4>

        <div className="grid mt-6 gap-5 grid-cols-[1fr_1fr] lg:flex items-center lg:justify-between">
          <div className="col-span-2 lg:col-span-[unset] lg:w-[50%] search-input-container">
            <input placeholder="Search for Patient Name" />
            <img src={Assets.Icons.Search} alt="" />
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
          data={data || []}
          columns={columns(handleActionsClick)}
          tableHeading="All Reports"
          tableHeadingColorClassName="!bg-secondary-150"
        />
      </div>
    </section>
  );
};

export default ReportsList;

const ReportsListDropdown = ({
  cb,
  procedureEntryId,
  handleActions,
}: {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
  procedureEntryId: string;
  handleActions: (view: ActionType) => void;
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    cb(event);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = () => {
    navigate(`/reports/view/${procedureEntryId}`);
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
          <ListItemText>View </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActions('shareResult')}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Share Result</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActions('confirmTest')}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Confirm Test</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActions('uploadResult')}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Upload Result</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
