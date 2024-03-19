import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import {
  ListItemIcon,
  ListItemText,
  TablePagination,
  Modal,
} from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { usePapaParse } from 'react-papaparse';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';

import { IProcedure, IUser } from '@cloud-equipment/models';
import * as Assets from '@cloud-equipment/assets';
import queries from './queries/reports';
import { Table } from '@cloud-equipment/ui-components';
import { formatDate } from '@cloud-equipment/utils';
import { UploadReportModal } from '../index';
import { EditReportModal } from './modals';
// import { useFilters } from '@cloud-equipment/hooks';
// import { environment } from '@cloud-equipment/environments';

export type ActionType =
  | null
  | 'view'
  | 'shareResult'
  | 'confirmTest'
  | 'uploadResult'
  | 'edit';
type ReportTableColumns = IProcedure & { elipsis: 'elipsis' };

const columnHelper = createColumnHelper<ReportTableColumns>();

const columns = [
  columnHelper.accessor('date', {
    header: 'Date and Time',
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor('medServiceName', {
    header: 'Procedure/Test Ordered',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('patientAge', {
    header: 'Age of Patient',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('referrersName', {
    header: "Referrer's Name",
    cell: (info) => info.getValue() || '-',
  }),
  columnHelper.accessor('refererHospital', {
    header: "Referrer's Hospital",
    cell: (info) => info.getValue() || '-',
  }),
  // columnHelper.accessor('patientName', {
  //   header: 'Patient Name',
  //   cell: (info) => info.getValue(),
  // }),
  columnHelper.accessor('patientPhone', {
    header: 'Phone Number',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('subotal', {
    header: 'Amount',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('elipsis', {
    cell: ({
      row: {
        original: { procedureEntryId, ...rest },
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
            data: { ...rest, procedureEntryId },
          }}
        />
      );
    },
    header: '',
  }),
];

const ReportsList = () => {
  const userDetails = useSelector(
    (state: { auth: { user: IUser } }) => state.auth.user
  );

  const accountType = useSelector(
    (state: { account: { accountType: 0 | 1 } }) => state.account.accountType
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [shouldDownload, setShouldDownload] = useState(false);

  const { useGetReports } = queries;
  const { isLoading, data } = useGetReports(
    {
      pageSize,
      currentPage,
      startIndex: 1,
      download: shouldDownload,
    },
    accountType === 0 ? null : (userDetails?.FACILITY_ID as string)
  );

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

  return (
    <section className="ce-px ce-py">
      <h4 className="text-ce-green font-bold text-2xl">
        <span className="font-normal">Hello</span> ,{' '}
        {userDetails?.USER_FULLNAME}
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

          <button
            onClick={() => {
              setShouldDownload(true);
            }}
            className="export-btn"
          >
            <img src={Assets.Icons.ExportIcon} alt="" />
            <span>Export</span>
          </button>
        </div>

        <Table
          loading={isLoading}
          data={data || []}
          columns={columns}
          tableHeading="All Reports"
        />
      </div>
    </section>
  );
};

export default ReportsList;

const TransformObject = (data: { [key: string]: any }): Promise<any> => {
  return new Promise((resolve) => {
    resolve(
      Object.keys(data).forEach((key) => {
        if ([null, ''].includes(data[key])) data[key] = '-';
      })
    );
  });
};

const ReportsListDropdown = ({
  cb,
  procedureEntryId,
  data,
}: {
  cb: (e: React.MouseEvent<HTMLButtonElement>) => void;
  procedureEntryId: string;
  data: any;
}) => {
  const navigate = useNavigate();
  const { jsonToCSV } = usePapaParse();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { useConfirmTest } = queries;
  const { mutateFn } = useConfirmTest();

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    cb(event);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onClose = () => setShowUploadModal(false);
  const onClose2 = () => setShowEditModal(false);

  const handleActionsClick = async (view: ActionType) => {
    if (view === 'shareResult') {
      // console.log('data', TransformObject(data));
      await TransformObject(data);
      console.log(jsonToCSV([data]));
    } else if (view === 'confirmTest') {
      mutateFn(
        {
          procedureEntrId: data?.procedureEntryId,
          procedureNewStatus: 1,
        },
        () => {}
      );
    } else if (view === 'uploadResult') {
      setShowUploadModal(true);
    } else if (view === 'edit') {
      setShowEditModal(true);
    }
  };

  const handleMenuAction = () => {
    navigate(`/reports/view/${procedureEntryId}`);
  };

  return (
    <>
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
          <MenuItem onClick={() => handleActionsClick('edit')}>
            <ListItemIcon>
              <img src={Assets.Icons.ReportEditIcon} alt="" />
            </ListItemIcon>
            <ListItemText>Edit Test</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuAction}>
            <ListItemIcon>
              <img src={Assets.Icons.ReportViewProfileIcon} alt="" />
            </ListItemIcon>
            <ListItemText>View Profile</ListItemText>
          </MenuItem>

          <MenuItem onClick={() => handleActionsClick('confirmTest')}>
            <ListItemIcon>
              <img src={Assets.Icons.ReportConfirmIcon} alt="" />
            </ListItemIcon>
            <ListItemText>Confirm Test</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleActionsClick('uploadResult')}>
            <ListItemIcon>
              <img src={Assets.Icons.ReportUploadIcon} alt="" />
            </ListItemIcon>
            <ListItemText>Upload Result</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleActionsClick('shareResult')}>
            <ListItemIcon>
              <img src={Assets.Icons.ReportShareIcon} alt="" />
            </ListItemIcon>
            <ListItemText>Share Result</ListItemText>
          </MenuItem>
        </Menu>
      </div>
      <Modal open={showUploadModal} onClose={onClose}>
        <UploadReportModal onClose={onClose} />
      </Modal>
      <Modal
        open={showEditModal}
        onClose={onClose2}
        style={{ overflow: 'auto' }}
      >
        <EditReportModal onClose={onClose2} />
      </Modal>
    </>
  );
};
